// ============================================
// FILE: app/staff/security/dashboard/page.tsx
// ============================================
'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Shield, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

export default function SecurityDashboard() {
  const stats: Array<{ title: string; label: string; value: string; change: string; icon: typeof AlertTriangle; trend: "up"  | 'down' | 'neutral' }> = [
    { title: 'Incidents', label: 'Incidents Today', value: '2', change: '-1', icon: AlertTriangle, trend: "up"  },
    { title: 'Staff', label: 'On Duty Staff', value: '4', change: '100%', icon: Shield, trend: "up"  },
    { title: 'Hours', label: 'Hours Logged', value: '32', change: '+4', icon: Clock, trend: "up"  },
    { title: 'Response', label: 'Response Time', value: '3 min', change: '-0.5', icon: TrendingUp, trend: "up"  },
  ];

  return (
    <DashboardLayout role="security">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage security operations</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} label={stat.label} value={stat.value} change={stat.change} icon={stat.icon} trend={stat.trend} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Incidents</h2>
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                <p className="font-medium text-red-900">Suspicious activity - Gate B</p>
                <p className="text-sm text-red-700">2 hours ago • High Priority</p>
              </div>
              <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                <p className="font-medium text-yellow-900">Noise complaint - Floor 4</p>
                <p className="text-sm text-yellow-700">5 hours ago • Medium Priority</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Staff on Duty</h2>
            <div className="space-y-3">
              {['John Doe - Main Gate', 'Jane Smith - Patrol', 'Mike Johnson - Monitoring', 'Sarah Williams - Backup'].map((staff, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{staff}</span>
                  <span className="text-xs text-green-600 font-medium">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


