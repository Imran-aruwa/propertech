'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Mail,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Shield,
  Zap,
  ArrowRight,
} from 'lucide-react'

const featuresData = [
  {
    key: 'portfolio',
    title: 'Property Portfolio',
    description:
      'Centralized dashboard for all your properties. Track occupancy, manage units, and visualize your entire portfolio at a glance.',
  },
  {
    key: 'tenant',
    title: 'Tenant Hub',
    description:
      'Digital tenant profiles, lease tracking, and automated renewals. Keep all tenant communication and documents in one place.',
  },
  {
    key: 'finance',
    title: 'Financial Intelligence',
    description:
      'Real-time income tracking, expense management, and profitability analytics. Export reports for tax season in seconds.',
  },
  {
    key: 'maintenance',
    title: 'Smart Maintenance',
    description:
      'AI-powered request categorization, vendor management, and automated workflows. Reduce response time by 60%.',
  },
  {
    key: 'insights',
    title: 'Data Insights',
    description:
      'Predictive analytics for rent optimization, occupancy forecasting, and portfolio performance benchmarking.',
  },
  {
    key: 'ai',
    title: 'AI Assistant',
    description:
      'Natural language queries, automated document parsing, and intelligent suggestions that learn from your workflow.',
  },
]

const testimonials = [
  {
    quote:
      'PROPERTECH Software reduced my admin time from 15 hours to 3 hours per week. Game changer.',
    author: 'Kibera Landlord',
    role: 'Property Owner, 12 units',
    avatar: 'KL',
  },
  {
    quote:
      'The AI maintenance categorization alone is worth the subscription. It just works.',
    author: 'Nairobi PM',
    role: 'Property Manager, 45 units',
    avatar: 'NP',
  },
  {
    quote:
      "Finally, software that doesn't feel like it was built in 2005. Clean, fast, intuitive.",
    author: 'Mombasa Investor',
    role: 'Real Estate Investor',
    avatar: 'MI',
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    usd: 49,
    label: 'Up to 10 units',
    description: 'Perfect for independent landlords',
    popular: false,
  },
  {
    name: 'Professional',
    usd: 99,
    label: 'Up to 50 units',
    description: 'For growing property portfolios',
    popular: true,
  },
  {
    name: 'Enterprise',
    usd: 0,
    label: 'Unlimited units',
    description: 'Custom for management firms',
    popular: false,
    custom: true,
  },
]

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [waitSuccess, setWaitSuccess] = useState<string | null>(null)
  const [waitError, setWaitError] = useState<string | null>(null)
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES')

  const USD_TO_KES = 132

  async function handleWaitlist() {
    if (!email) return setWaitError('Please enter your email')
    setWaiting(true)
    setWaitError(null)
    setWaitSuccess(null)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setWaitSuccess("Thanks — check your inbox. You're on the waitlist.")
        setEmail('')
      } else {
        const json = await res.json()
        setWaitError(json?.error || 'Unable to join waitlist')
      }
    } catch (err: any) {
      setWaitError(err?.message || 'Network error')
    } finally {
      setWaiting(false)
      setTimeout(() => {
        setWaitSuccess(null)
        setWaitError(null)
      }, 5000)
    }
  }

  const formatPrice = (usd: number) => {
    if (usd === 0) return 'Custom'
    return currency === 'USD'
      ? `$${usd}`
      : `KES ${Math.round(usd * USD_TO_KES).toLocaleString()}`
  }

  return (
    <>
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 opacity-90" />
        <div className="absolute inset-0 gradient-overlay-animated" />
        <div className="absolute inset-0 particle-field" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/50 backdrop-blur border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" className="w-10 h-10" />
            <span className="text-2xl font-bold text-gradient">
              PROPERTECH Software
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/auth/login')}
              className="text-blue-300 hover:text-blue-200"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/auth/signup')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="pt-28 relative z-10">

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-extrabold mb-6 text-gradient">
            Smarter Property Management for Africa
          </h1>
          <p className="text-xl text-blue-200/80 max-w-3xl mx-auto mb-10">
            PROPERTECH Software brings AI-powered insights, automation, and
            financial clarity to landlords and property managers.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push('/auth/signup')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex gap-2 items-center"
            >
              Get Started <ArrowRight />
            </button>
            <button
              onClick={() => router.push('/#pricing')}
              className="px-8 py-4 border border-blue-500/40 rounded-xl text-blue-200"
            >
              View Pricing
            </button>
          </div>
        </section>

        {/* FEATURES */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
          {featuresData.map((f) => (
            <div
              key={f.key}
              className="p-8 rounded-2xl bg-slate-900/60 border border-blue-500/20"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {f.title}
              </h3>
              <p className="text-blue-200/70">{f.description}</p>
            </div>
          ))}
        </section>

        {/* PRICING */}
        <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gradient">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-2xl border ${
                  plan.popular
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-blue-500/20 bg-slate-900/60'
                }`}
              >
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-4">
                  {formatPrice(plan.usd)}
                </p>
                <p className="text-blue-200/70 mb-6">{plan.description}</p>
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* WAITLIST */}
        <section className="max-w-xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gradient">
            Join Early Access
          </h2>
          <p className="text-blue-200/70 mb-6">
            Be the first to access PROPERTECH Software.
          </p>
          <div className="flex gap-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 text-white"
            />
            <button
              disabled={waiting}
              onClick={handleWaitlist}
              className="px-6 py-3 bg-blue-600 rounded-lg text-white"
            >
              Join
            </button>
          </div>
          {waitSuccess && (
            <p className="mt-4 text-green-400">{waitSuccess}</p>
          )}
          {waitError && <p className="mt-4 text-red-400">{waitError}</p>}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900/80 border-t border-blue-500/20 py-12 text-center text-blue-200/60">
        <p>© 2025 PROPERTECH Software. Built for Africa, by Africans.</p>
      </footer>
    </>
  )
}
