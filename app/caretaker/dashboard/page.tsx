// ============================================
// FILE: app/caretaker/dashboard/page.tsx
// ============================================
'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { DollarSign, Clock, Wrench, Users } from 'lucide-react';

export default function CaretakerDashboard() {
  const stats = [
    {
      title: 'Rent Collected',
      label: 'For reference',
      value: 'KES 580K',
      change: '+15%',
      icon: DollarSign,
      trend: "up"
    },
    {
      title: 'Pending Payments',
      label: 'For reference',
      value: '8',
      change: '-2',
      icon: Clock,
      trend: "up" 
    },
    {
      title: 'Maintenance Requests',
      label: 'For reference',
      value: '5',
      change: '+1',
      icon: Wrench,
      trend: "up" 
    },
    {
      title: 'Total Tenants',
      label: 'For reference',
      value: '45',
      change: '0',
      icon: Users,
      trend: "up" 
    },
  ];

  return (
    <DashboardLayout role="caretaker">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Caretaker Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage daily property operations</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} label={stat.label} value={stat.value} change={stat.change} icon={stat.icon} trend={stat.trend} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Today's Tasks</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <input type="checkbox" className="h-5 w-5" />
                <span>Collect rent from Unit 204</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <input type="checkbox" className="h-5 w-5" />
                <span>Fix leaking tap in Unit 305</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <input type="checkbox" className="h-5 w-5" />
                <span>Record meter readings</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Urgent Issues</h2>
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                <p className="font-medium text-red-900">Water leak - Unit 102</p>
                <p className="text-sm text-red-700">Reported 2 hours ago</p>
              </div>
              <div className="p-3 border-l-4 border-orange-500 bg-orange-50 rounded">
                <p className="font-medium text-orange-900">Power outage - Floor 3</p>
                <p className="text-sm text-orange-700">Reported 4 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}



