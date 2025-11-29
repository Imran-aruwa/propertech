'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Check, Loader, Smartphone, CreditCard } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import {
  detectPaymentGateway,
  initiatePayment,
  loadPaystackScript,
  formatCurrency,
  getPaymentMethodName,
} from '@/lib/payments';

/* ----------------------------
   Pricing source of truth
   MUST match landing page
-----------------------------*/

const USD_TO_KES = 132;

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyUSD: number | null; // null = Custom
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for independent landlords',
    monthlyUSD: 49,
    features: [
      'Up to 10 units',
      'Basic analytics',
      'Email support',
      'Essential tools',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing property portfolios',
    monthlyUSD: 99,
    features: [
      'Up to 50 units',
      'Advanced analytics',
      'Priority support',
      'Automation tools',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom for management firms',
    monthlyUSD: null, // Custom pricing
    features: [
      'Unlimited units',
      'Custom integrations',
      'Dedicated support',
      'Custom contracts',
    ],
  },
];

export default function CheckoutPage() {
  const router = useRouter();

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [gateway, setGateway] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /* ----------------------------
     Init: auth + gateway
  -----------------------------*/
  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(data.session.user);

        const detectedGateway = await detectPaymentGateway();
        setGateway(detectedGateway);

        if (detectedGateway.gateway === 'paystack') {
          await loadPaystackScript();
        }
      } catch {
        setError('Failed to initialize checkout');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  /* ----------------------------
     Helpers
  -----------------------------*/
  const getAmount = (plan: Plan) => {
    if (!plan.monthlyUSD) return null;

    const monthlyKES = plan.monthlyUSD * USD_TO_KES;
    const yearlyKES = Math.round(monthlyKES * 12 * 0.8); // 20% discount

    return billingCycle === 'monthly' ? monthlyKES : yearlyKES;
  };

  /* ----------------------------
     Payment
  -----------------------------*/
  const handlePayment = async (plan: Plan) => {
    if (!gateway || !user || !plan.monthlyUSD) return;

    try {
      setIsProcessing(true);
      setError(null);

      const amount = getAmount(plan)!;

      const payment = await initiatePayment({
        gateway: 'paystack',
        currency: gateway.currency,
        method: gateway.method,
        amount,
        email: user.email,
        planId: plan.id,
      });

      const handler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: user.email,
        amount: amount * 100,
        currency: gateway.currency,
        ref: payment.reference,
        onClose: () => {
          setIsProcessing(false);
          setError('Payment cancelled');
        },
        onSuccess: () => {
          setPaymentComplete(true);
          setTimeout(() => router.push('/dashboard'), 2000);
        },
      });

      handler.openIframe();
    } catch (err: any) {
      setError(err.message || 'Payment failed');
      setIsProcessing(false);
    }
  };

  /* ----------------------------
     UI STATES
  -----------------------------*/
  if (!isAuthenticated && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => router.push('/auth/login')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Sign in to continue
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-8 rounded-lg text-center">
          <Check className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Payment Successful</h2>
          <p>Redirecting to dashboard…</p>
        </div>
      </div>
    );
  }

  /* ----------------------------
     SELECT PLAN
  -----------------------------*/
  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10">
            Choose Your Plan
          </h1>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => {
              const amount = getAmount(plan);
              return (
                <div
                  key={plan.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer border"
                  onClick={() => setSelectedPlan(plan)}
                >
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <p className="text-gray-600 mb-4">{plan.description}</p>

                  <div className="text-3xl font-bold mb-4">
                    {plan.monthlyUSD
                      ? formatCurrency(amount!, gateway?.currency || 'KES')
                      : 'Custom'}
                    {plan.monthlyUSD && (
                      <span className="text-sm font-normal text-gray-500">
                        /{billingCycle}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check className="w-4 h-4 text-green-600" /> {f}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                    Select Plan
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------------------
     PAYMENT PAGE
  -----------------------------*/
  const amount = getAmount(selectedPlan);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <button
          onClick={() => setSelectedPlan(null)}
          className="text-blue-600 mb-4"
        >
          ← Change plan
        </button>

        <h2 className="text-2xl font-bold mb-2">{selectedPlan.name}</h2>
        <p className="text-gray-600 mb-6">
          {billingCycle} billing
        </p>

        {amount ? (
          <>
            <div className="text-3xl font-bold mb-6">
              {formatCurrency(amount, gateway.currency)}
            </div>

            <button
              onClick={() => handlePayment(selectedPlan)}
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              {isProcessing ? 'Processing…' : 'Pay Now'}
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push('/contact')}
            className="w-full bg-gray-800 text-white py-3 rounded-lg"
          >
            Contact Sales
          </button>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
