// ============================================
// FILE: app/agent/rent-collection/page.tsx (FIXED)
// ============================================
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/ui/DataTable';
import { StatCard } from '@/components/ui/StatCard';
import { DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export default function AgentRentCollectionPage() {
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  const formatCurrency = (amount: number) => `KES ${amount.toLocaleString()}`;

  const summary = {
    totalExpected: 1500000,
    collected: 1320000,
    pending: 120000,
    overdue: 60000,
    collectionRate: 88,
  };

  const collections = [
    {
      id: '1',
      tenant: 'John Kamau',
      unit: '204',
      property: 'Riverside Apartments',
      amount: 25000,
      dueDate: '2024-12-01',
      paidDate: '2024-12-01',
      status: 'paid',
      commission: 2500,
    },
    {
      id: '2',
      tenant: 'Mary Wanjiku',
      unit: '305',
      property: 'Parklands Suites',
      amount: 22000,
      dueDate: '2024-12-01',
      paidDate: null,
      status: 'pending',
      commission: 2200,
    },
    {
      id: '3',
      tenant: 'Peter Omondi',
      unit: '108',
      property: 'Westlands Plaza',
      amount: 28000,
      dueDate: '2024-11-25',
      paidDate: null,
      status: 'overdue',
      commission: 2800,
    },
    {
      id: '4',
      tenant: 'Jane Mwangi',
      unit: '402',
      property: 'Riverside Apartments',
      amount: 30000,
      dueDate: '2024-12-01',
      paidDate: '2024-11-30',
      status: 'paid',
      commission: 3000,
    },
  ];

  const filteredCollections = filter === 'all'
    ? collections
    : collections.filter(c => c.status === filter);

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const columns = [
    {
      header: 'Tenant',
      accessor: (row: typeof collections[0]) => (
        <div>
          <p className="font-medium text-gray-900">{row.tenant}</p>
          <p className="text-sm text-gray-500">{row.property} - Unit {row.unit}</p>
        </div>
      ),
    },
    {
      header: 'Rent Amount',
      accessor: (row: typeof collections[0]) => formatCurrency(row.amount),
    },
    {
      header: 'Your Commission',
      accessor: (row: typeof collections[0]) => (
        <span className="font-semibold text-blue-600">
          {formatCurrency(row.commission)}
        </span>
      ),
    },
    {
      header: 'Due Date',
      accessor: (row: typeof collections[0]) => row.dueDate,
    },
    {
      header: 'Paid Date',
      accessor: (row: typeof collections[0]) => row.paidDate || '-',
    },
    {
      header: 'Status',
      accessor: (row: typeof collections[0]) => getStatusBadge(row.status),
    },
  ];

  return (
    <DashboardLayout role="agent">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rent Collection</h1>
            <p className="text-gray-600 mt-1">Track rent collection and your commission</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Export Report
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Expected"
            label="This month"
            value={formatCurrency(summary.totalExpected)}
            icon={DollarSign}
          />
          <StatCard
            title="Collected"
            label={`${summary.collectionRate}% collection rate`}
            value={formatCurrency(summary.collected)}
            change={`${summary.collectionRate}%`}
            icon={TrendingUp}
            trend="up"
            valueClassName="text-green-600"
          />
          <StatCard
            title="Pending"
            label="Awaiting payment"
            value={formatCurrency(summary.pending)}
            icon={Clock}
            valueClassName="text-yellow-600"
          />
          <StatCard
            title="Overdue"
            label="Action required"
            value={formatCurrency(summary.overdue)}
            icon={CheckCircle}
            valueClassName="text-red-600"
          />
        </div>

        <div className="flex gap-2">
          {['all', 'paid', 'pending', 'overdue'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as typeof filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <DataTable data={filteredCollections} columns={columns} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Commission Details</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Standard rate: 10% of collected rent</li>
              <li>• Bonus: 2% for 95%+ collection rate</li>
              <li>• Early payment bonus: Additional 1%</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <h3 className="text-sm font-medium text-green-800 mb-2">This Month Summary</h3>
            <div className="text-sm text-green-700 space-y-1">
              <p>• Collected: {formatCurrency(summary.collected)}</p>
              <p>• Your commission: {formatCurrency(summary.collected * 0.1)}</p>
              <p>• Collection rate: {summary.collectionRate}%</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


