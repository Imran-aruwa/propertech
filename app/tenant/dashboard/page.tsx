// ============================================
// FILE: app/tenant/dashboard/page.tsx
// ============================================
'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { CreditCard, Home, Wrench, FileText } from 'lucide-react';

export default function TenantDashboard() {
  const stats = [
    { title: 'Next Payment Due', label: 'For reference', value: 'Dec 31', change: '15 days', icon: CreditCard, trend: "up" as const },
    { title: 'Rent Amount', label: 'For reference', value: 'KES 25,000', change: 'Monthly', icon: Home, trend: "up" as const },
    { title: 'Open Requests', label: 'For reference', value: '1', change: 'Pending', icon: Wrench, trend: "up" as const },
    { title: 'Lease Ends', label: 'For reference', value: 'Jun 2025', change: '6 months', icon: FileText, trend: "up" as const },
  ];

  return (
    <DashboardLayout role="tenant">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenant Dashboard</h1>
          <p className="text-gray-600 mt-1">Unit 304, Riverside Apartments</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} label={stat.label} value={stat.value} change={stat.change} icon={stat.icon} trend={stat.trend} />
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Pay Your Rent</h2>
          <p className="mb-4 opacity-90">Next payment due: December 31, 2024</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
            Pay Now - KES 25,000
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Payments</h2>
            <div className="space-y-3">
              {['Nov 2024', 'Oct 2024', 'Sep 2024'].map((month) => (
                <div key={month} className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-700">{month}</span>
                  <span className="font-semibold text-green-600">KES 25,000</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Maintenance Requests</h2>
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                <p className="font-medium text-yellow-900">Leaking faucet</p>
                <p className="text-sm text-yellow-700">Status: In Progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}