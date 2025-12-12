// ============================================
// FILE: app/caretaker/outstanding-payments/page.tsx
// ============================================
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/ui/DataTable';
import { Clock, AlertCircle, Send, DollarSign } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';

export default function OutstandingPaymentsPage() {
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [sendingReminders, setSendingReminders] = useState(false);

  // FIXED: Broken quote corruption
  const stats = [
    { title: "Total Outstanding", label: "For reference", value: "KES 185K", change: "+8K", icon: DollarSign, trend: "up" },
    { title: "Overdue Tenants", label: "For reference", value: "8", change: "-2", icon: AlertCircle, trend: "up" },
    { title: "Average Days Late", label: "For reference", value: "12", change: "+2", icon: Clock, trend: "up" },
  ];

  const outstandingPayments = [
    {
      id: '1',
      tenant: 'John Kamau',
      unit: '204',
      amount: 25000,
      dueDate: '2024-11-30',
      daysOverdue: 10,
      phone: '+254712345678',
      status: 'overdue',
    },
    {
      id: '2',
      tenant: 'Mary Wanjiku',
      unit: '305',
      amount: 22000,
      dueDate: '2024-11-28',
      daysOverdue: 12,
      phone: '+254723456789',
      status: 'overdue',
    },
    {
      id: '3',
      tenant: 'Peter Omondi',
      unit: '108',
      amount: 28000,
      dueDate: '2024-12-05',
      daysOverdue: 5,
      phone: '+254734567890',
      status: 'overdue',
    },
  ];

  const handleSendReminders = async () => {
    if (selectedPayments.length === 0) {
      alert('Please select payments to send reminders');
      return;
    }

    setSendingReminders(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Reminders sent to ${selectedPayments.length} tenant(s) via SMS`);
      setSelectedPayments([]);
    } catch (error) {
      alert('Failed to send reminders');
    } finally {
      setSendingReminders(false);
    }
  };

  const columns = [
    {
      header: 'Tenant',
      accessor: (row: typeof outstandingPayments[0]) => row.tenant,
    },
    {
      header: 'Unit',
      accessor: (row: typeof outstandingPayments[0]) => row.unit,
    },
    {
      header: 'Amount',
      accessor: (row: typeof outstandingPayments[0]) =>
        `KES ${row.amount.toLocaleString()}`,
    },
    {
      header: 'Due Date',
      accessor: (row: typeof outstandingPayments[0]) => row.dueDate,
    },
    {
      header: 'Days Overdue',
      accessor: (row: typeof outstandingPayments[0]) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.daysOverdue > 10
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {row.daysOverdue} days
        </span>
      ),
    },
    {
      header: 'Phone',
      accessor: (row: typeof outstandingPayments[0]) => row.phone,
    },
  ];

  return (
    <DashboardLayout role="caretaker">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Outstanding Payments
            </h1>
            <p className="text-gray-600 mt-1">
              Track and follow up on overdue payments
            </p>
          </div>

          <button
            onClick={handleSendReminders}
            disabled={selectedPayments.length === 0 || sendingReminders}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sendingReminders ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Reminders ({selectedPayments.length})
              </>
            )}
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <DataTable
            data={outstandingPayments}
            columns={columns}
            onSelectionChange={setSelectedPayments}
            selectable
          />
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Reminder Guidelines
              </h3>
              <p className="mt-2 text-sm text-yellow-700">
                • Send first reminder after 3 days overdue<br />
                • Send second reminder after 7 days overdue<br />
                • Contact property manager after 14 days overdue
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
