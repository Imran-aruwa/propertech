// ============================================
// FILE: app/agent/dashboard/page.tsx (FIXED)
// ============================================
'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Building2, DollarSign, Users, TrendingUp } from 'lucide-react';

export default function AgentDashboard() {
  const stats = [
    { 
      title: 'Properties Managed', 
      label: 'Total units', 
      value: '12', 
      change: '+1', 
      icon: Building2, 
      trend: "up"   
    },
    { 
      title: 'Performance Earnings', 
      label: 'Commission Earned', 
      value: 'KES 145K', 
      change: '+18%', 
      icon: DollarSign, 
      trend: "up"   
    },
    { 
      title: 'Active Tenants', 
      label: 'Current tenants', 
      value: '68', 
      change: '+5', 
      icon: Users, 
      trend: "up"   
    },
    { 
      title: 'Rent Collection', 
      label: 'Collection Rate', 
      value: '96%', 
      change: '+2%', 
      icon: TrendingUp, 
      trend: "up"   
    },
  ];

  return (
    <DashboardLayout role="agent">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your performance and commissions</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} label={stat.label} value={stat.value} change={stat.change} icon={stat.icon} trend={stat.trend} />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Payment received - Unit {i}04</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
                <span className="text-green-600 font-semibold">+KES 12,000</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}



