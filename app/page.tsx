'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Sparkles, BarChart3, CheckCircle2, Shield, Zap, ArrowRight } from 'lucide-react'

const featuresData = [
  { key: 'portfolio', title: "Property Portfolio", description: "Centralized dashboard for all your properties. Track occupancy, manage units, and visualize your entire portfolio at a glance." },
  { key: 'tenant', title: "Tenant Hub", description: "Digital tenant profiles, lease tracking, and automated renewals. Keep all tenant communication and documents in one place." },
  { key: 'finance', title: "Financial Intelligence", description: "Real-time income tracking, expense management, and profitability analytics. Export reports for tax season in seconds." },
  { key: 'maintenance', title: "Smart Maintenance", description: "AI-powered request categorization, vendor management, and automated workflows. Reduce response time by 60%." },
  { key: 'insights', title: "Data Insights", description: "Predictive analytics for rent optimization, occupancy forecasting, and portfolio performance benchmarking." },
  { key: 'ai', title: "AI Assistant", description: "Natural language queries, automated document parsing, and intelligent suggestions that learn from your workflow." },
]

const testimonials = [
  { quote: "PROPERTECH Software reduced my admin time from 15 hours to 3 hours per week. Game changer.", author: "Kibera Landlord", role: "Property Owner, 12 units", avatar: "KL" },
  { quote: "The AI maintenance categorization alone is worth the subscription. It just works.", author: "Nairobi PM", role: "Property Manager, 45 units", avatar: "NP" },
  { quote: "Finally, software that doesn't feel like it was built in 2005. Clean, fast, intuitive.", author: "Mombasa Investor", role: "Real Estate Investor", avatar: "MI" },
]

const pricingPlans = [
  { name: "Starter", usd: 49, label: "Up to 10 units", description: "Perfect for independent landlords", popular: false },
  { name: "Professional", usd: 99, label: "Up to 50 units", description: "For growing property portfolios", popular: true },
  { name: "Enterprise", usd: 0, label: "Unlimited units", description: "Custom for management firms", popular: false, custom: true },
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
    return currency === 'USD' ? `$${usd}` : `KES ${Math.round(usd * USD_TO_KES).toLocaleString()}`
  }

  return (
    <>
      {/* Fixed Background Layers */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 opacity-90"></div>
        <div className="absolute inset-0 gradient-overlay-animated"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30 skyline-parallax"></div>
        <div className="absolute inset-0 particle-field"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl orb-blue"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500 rounded-full opacity-5 blur-3xl orb-purple"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 header-backdrop bg-slate-900/50 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="PROPERTECH Software" className="w-10 h-10" />
            <div className="text-2xl font-bold text-gradient">
              PROPERTECH Software
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => router.push('/auth/login')} className="px-4 py-2 text-blue-300 hover:text-blue-200 transition">Login</button>
            <button onClick={() => router.push('/auth/signup')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">Sign Up</button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT — unchanged */}
      {/* ... everything else remains EXACTLY the same ... */}

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-blue-500/20 card-backdrop py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.svg" alt="PROPERTECH Software" className="w-8 h-8" />
                <span className="text-xl font-bold text-gradient">PROPERTECH Software</span>
              </div>
              <p className="text-blue-200/70 text-sm">Smarter property management for landlords across Africa.</p>
            </div>
            {/* rest unchanged */}
          </div>
          <div className="border-t border-blue-500/20 pt-8 text-center text-blue-200/50 text-sm">
            <p>&copy; 2025 PROPERTECH Software. All rights reserved. Built for Africa, by Africans.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
