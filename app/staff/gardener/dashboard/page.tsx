// ============================================
// FILE: app/staff/gardener/dashboard/page.tsx
// ============================================
'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Leaf, CheckSquare, Package, Clock } from 'lucide-react';

export default function GardenerDashboard() {
  const stats = [
    { title: 'Tasks Today', label: 'Tasks Today', value: '6', change: '+2', icon: CheckSquare, trend: "up"  },
    { title: 'Completed', label: 'Completed', value: '4', change: '67%', icon: Leaf, trend: "up"  },
    { title: 'Equipment', label: 'Equipment', value: '12', change: 'Available', icon: Package, trend: "up"  },
    { title: 'Hours Logged', label: 'Hours Logged', value: '6.5', change: '+0.5', icon: Clock, trend: "up"  },
  ] ;

  return (
    <DashboardLayout role="gardener">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gardener Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage landscaping tasks and equipment</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} label={stat.label} value={stat.value} change={stat.change} icon={stat.icon} trend={stat.trend} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
            <div className="space-y-3">
              {[
                { task: 'Lawn mowing - Front area', time: '08:00 AM', done: true },
                { task: 'Watering plants - Garden', time: '10:00 AM', done: true },
                { task: 'Tree pruning - Block A', time: '01:00 PM', done: false },
                { task: 'Fertilizer application', time: '03:00 PM', done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input type="checkbox" checked={item.done} className="h-5 w-5" readOnly />
                  <div className="flex-1">
                    <p className={item.done ? 'line-through text-gray-500' : 'text-gray-900'}>{item.task}</p>
                    <p className="text-sm text-gray-600">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Equipment Status</h2>
            <div className="space-y-3">
              {[
                { name: 'Lawn Mower', status: 'Available', color: 'green' },
                { name: 'Hedge Trimmer', status: 'In Use', color: 'blue' },
                { name: 'Leaf Blower', status: 'Available', color: 'green' },
                { name: 'Sprinkler System', status: 'Maintenance', color: 'yellow' },
              ].map((eq, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{eq.name}</span>
                  <span className={`text-xs font-medium text-${eq.color}-600`}>{eq.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


