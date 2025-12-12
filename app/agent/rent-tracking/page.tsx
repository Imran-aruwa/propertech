
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/ui/DataTable';
import { StatCard } from '@/components/ui/StatCard';
import { DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export default function AgentRentTrackingPage() {
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  const stats = [
    { title: 'Total Collected', label: 'This month', value: 'KES 1.2M', change: '+15%', icon: DollarSign, trend: "up"   },
    { title: 'Commission Earned', label: 'Your earnings', value: 'KES 120K', change: '+15%', icon: TrendingUp, trend: "up"   },
    { title: 'Pending Payments', label: 'Awaiting collection', value: '12', change: '-3', icon: Clock, trend: "up"   },
    { title: 'Collection Rate', label: 'Performance', value: '88%', change: '+5%', icon: CheckCircle, trend: "up"   },
  ];

  const rentPayments = [
    {
      id: '1',
      tenant: 'John Kamau',
      unit: '204',
      property: 'Riverside Apartments',
      amount: 25000,
      commission: 2500,
      dueDate: '2024-12-01',
      paidDate: '2024-12-01',
      status: 'paid',
    },
    {
      id: '2',
      tenant: 'Mary Wanjiku',
      unit: '305',
      property: 'Parklands Suites',
      amount: 22000,
      commission: 2200,
      dueDate: '2024-12-01',
      paidDate: null,
      status: 'pending',
    },
    {
      id: '3',
      tenant: 'Peter Omondi',
      unit: '108',
      property: 'Westlands Plaza',
      amount: 28000,
      commission: 2800,
      dueDate: '2024-11-25',
      paidDate: null,
      status: 'overdue',
    },
    {
      id: '4',
      tenant: 'Jane Mwangi',
      unit: '402',
      property: 'Riverside Apartments',
      amount: 30000,
      commission: 3000,
      dueDate: '2024-12-01',
      paidDate: '2024-11-30',
      status: 'paid',
    },
  ];

  const filteredPayments = filter === 'all'
    ? rentPayments
    : rentPayments.filter(p => p.status === filter);

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
      accessor: (row: typeof rentPayments[0]) => (
        <div>
          <p className="font-medium text-gray-900">{row.tenant}</p>
          <p className="text-sm text-gray-500">{row.property} - Unit {row.unit}</p>
        </div>
      ),
    },
    {
      header: 'Rent Amount',
      accessor: (row: typeof rentPayments[0]) => `KES ${row.amount.toLocaleString()}`,
    },
    {
      header: 'Your Commission',
      accessor: (row: typeof rentPayments[0]) => (
        <span className="font-semibold text-blue-600">
          KES {row.commission.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Due Date',
      accessor: (row: typeof rentPayments[0]) => row.dueDate,
    },
    {
      header: 'Paid Date',
      accessor: (row: typeof rentPayments[0]) => row.paidDate || '-',
    },
    {
      header: 'Status',
      accessor: (row: typeof rentPayments[0]) => getStatusBadge(row.status),
    },
  ];

  return (
    <DashboardLayout role="agent">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rent Tracking</h1>
            <p className="text-gray-600 mt-1">Monitor rent collection and your commissions</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Export Report
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} label={stat.label} value={stat.value} change={stat.change} icon={stat.icon} trend={stat.trend} />
          ))}
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
          <DataTable data={filteredPayments} columns={columns} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Commission Structure</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Standard rate: 10% of monthly rent</li>
              <li>• Paid upon successful collection</li>
              <li>• Monthly payout on the 5th of each month</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <h3 className="text-sm font-medium text-green-800 mb-2">This Month's Summary</h3>
            <div className="text-sm text-green-700 space-y-1">
              <p>• Total collected: KES 1,200,000</p>
              <p>• Your commission: KES 120,000</p>
              <p>• Payout date: January 5, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


