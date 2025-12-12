// ============================================
// FILE: app/agent/tenants/page.tsx
// ============================================
'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/ui/DataTable';
import { Users, Phone, Mail } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';

export default function AgentTenantsPage() {
  const stats = [
    {
      title: 'Total Tenants',
      label: 'For reference',
      value: '68',
      change: '+5',
      icon: Users,
      trend: "up"  ,
    },
  ];

  const tenants = [
    {
      id: '1',
      name: 'John Kamau',
      unit: '204',
      property: 'Riverside Apartments',
      phone: '+254712345678',
      email: 'john@example.com',
      rentAmount: 25000,
      status: 'active',
    },
    {
      id: '2',
      name: 'Mary Wanjiku',
      unit: '305',
      property: 'Parklands Suites',
      phone: '+254723456789',
      email: 'mary@example.com',
      rentAmount: 22000,
      status: 'active',
    },
  ];

  const columns = [
    {
      header: 'Tenant',
      accessor: (row: typeof tenants[0]) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-sm text-gray-500">
            {row.property} - Unit {row.unit}
          </p>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessor: (row: typeof tenants[0]) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-3 h-3" />
            {row.phone}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-3 h-3" />
            {row.email}
          </div>
        </div>
      ),
    },
    {
      header: 'Rent',
      accessor: (row: typeof tenants[0]) =>
        `KES ${row.rentAmount.toLocaleString()}`,
    },
    {
      header: 'Status',
      accessor: (row: typeof tenants[0]) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ACTIVE
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout role="agent">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenants</h1>
          <p className="text-gray-600 mt-1">Manage your tenant portfolio</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} label={stat.label} value={stat.value} change={stat.change} icon={stat.icon} trend={stat.trend} />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <DataTable data={tenants} columns={columns} />
        </div>
      </div>
    </DashboardLayout>
  );
}



