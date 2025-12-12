// ============================================
// FILE: app/owner/dashboard/page.tsx
// ============================================
'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { ChartWrapper } from '@/components/ui/ChartWrapper';
import { Building2, DollarSign, Users, TrendingUp } from 'lucide-react';

export default function OwnerDashboard() {
  const stats: Array<{ title: string; label: string; value: string; change: string; icon: typeof Building2; trend: "up"  | 'down' | 'neutral' }> = [
    { title: 'Total Properties', label: 'Properties', value: '24', change: '+2', icon: Building2, trend: "up"  },
    { title: 'Monthly Revenue', label: 'Revenue', value: 'KES 2.4M', change: '+12%', icon: DollarSign, trend: "up"  },
    { title: 'Total Tenants', label: 'Tenants', value: '156', change: '+8', icon: Users, trend: "up"  },
    { title: 'Occupancy Rate', label: 'Occupancy', value: '94%', change: '+3%', icon: TrendingUp, trend: "up"  },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 1800000 },
    { month: 'Feb', revenue: 2000000 },
    { month: 'Mar', revenue: 2200000 },
    { month: 'Apr', revenue: 2100000 },
    { month: 'May', revenue: 2300000 },
    { month: 'Jun', revenue: 2400000 },
  ];

  return (
    <DashboardLayout role="owner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your property portfolio</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} label={stat.label} value={stat.value} change={stat.change} icon={stat.icon} trend={stat.trend} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartWrapper
            title="Revenue Trend"
            data={revenueData}
            dataKey="revenue"
            xAxisKey="month"
            type="line"
          />
          <ChartWrapper
            title="Property Performance"
            data={revenueData}
            dataKey="revenue"
            xAxisKey="month"
            type="bar"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}


