// ============================================
// FILE: app/caretaker/tenants/page.tsx
// ============================================
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/ui/DataTable';
import { Users, Phone, Mail, Home } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';

export default function CaretakerTenantsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { title: 'Total Tenants', label: 'For reference', value: '45', change: '+2', icon: Users, trend: "up" },
    { title: 'Active Leases', label: 'For reference', value: '43', change: '0', icon: Home, trend: "up" },
    { title: 'Move-ins This Month', label: 'For reference', value: '3', change: '+1', icon: Users, trend: "up" },
  ];

  const tenants = [
    {
      id: '1',
      name: 'John Kamau',
      unit: '204',
      phone: '+254712345678',
      email: 'john@example.com',
      rentAmount: 25000,
      leaseStart: '2024-01-15',
      leaseEnd: '2025-01-14',
      status: 'active',
    },
    {
      id: '2',
      name: 'Mary Wanjiku',
      unit: '305',
      phone: '+254723456789',
      email: 'mary@example.com',
      rentAmount: 22000,
      leaseStart: '2024-03-01',
      leaseEnd: '2025-02-28',
      status: 'active',
    },
    {
      id: '3',
      name: 'Peter Omondi',
      unit: '108',
      phone: '+254734567890',
      email: 'peter@example.com',
      rentAmount: 28000,
      leaseStart: '2024-02-10',
      leaseEnd: '2025-02-09',
      status: 'active',
    },
  ];

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.unit.includes(searchQuery)
  );

  const columns = [
    {
      header: 'Tenant',
      accessor: (row: typeof tenants[0]) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-sm text-gray-500">Unit {row.unit}</p>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessor: (row: typeof tenants[0]) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-3 h-3 text-gray-400" />
            {row.phone}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-3 h-3 text-gray-400" />
            {row.email}
          </div>
        </div>
      ),
    },
    {
      header: 'Rent Amount',
      accessor: (row: typeof tenants[0]) => `KES ${row.rentAmount.toLocaleString()}`,
    },
    {
      header: 'Lease Period',
      accessor: (row: typeof tenants[0]) => (
        <div className="text-sm">
          <p>{row.leaseStart}</p>
          <p className="text-gray-500">to {row.leaseEnd}</p>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (row: typeof tenants[0]) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {row.status.toUpperCase()}
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout role="caretaker">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenants Directory</h1>
          <p className="text-gray-600 mt-1">View and manage tenant information</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} label={stat.label} value={stat.value} change={stat.change} icon={stat.icon} trend={stat.trend} />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <input
            type="text"
            placeholder="Search by name or unit number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <DataTable data={filteredTenants} columns={columns} />
        </div>
      </div>
    </DashboardLayout>
  );
}