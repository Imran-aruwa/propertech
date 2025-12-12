'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, Award, Download } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { DataTable } from '@/components/ui/DataTable';
import { ChartWrapper } from '@/components/ui/ChartWrapper';

export default function AgentEarningsPage() {
  const [earnings] = useState({
    thisMonth: 16750,
    lastMonth: 15500,
    ytd: 185400,
    nextPayout: '2025-12-31',
  });

  const earningsTrend = [
    { name: 'Jun', amount: 13500 },
    { name: 'Jul', amount: 14200 },
    { name: 'Aug', amount: 14800 },
    { name: 'Sep', amount: 15200 },
    { name: 'Oct', amount: 15500 },
    { name: 'Nov', amount: 16750 },
  ];

  const commissionBreakdown = [
    { name: 'Rent Commission', amount: 10500 },
    { name: 'Water Bills', amount: 1800 },
    { name: 'Electricity', amount: 2850 },
    { name: 'Performance Bonus', amount: 1600 },
  ];

  const propertyCommissions = [
    { property: 'Property 1', rent: 2500, bills: 850, bonus: 400, total: 3750 },
    { property: 'Property 2', rent: 3200, bills: 1100, bonus: 500, total: 4800 },
    { property: 'Property 3', rent: 2400, bills: 900, bonus: 350, total: 3650 },
    { property: 'Property 4', rent: 1800, bills: 700, bonus: 250, total: 2750 },
    { property: 'Property 5', rent: 600, bills: 250, bonus: 100, total: 950 },
  ];

  const formatCurrency = (value: number) => `KES ${value.toLocaleString()}`;

  const columns = [
    { header: 'Property', accessor: 'property'  },
    {
      header: 'Rent Commission',
      accessor: ((row: any) => formatCurrency(row.rent)) as any,
    },
    {
      header: 'Bill Commission',
      accessor: ((row: any) => formatCurrency(row.bills)) as any,
    },
    {
      header: 'Bonus',
      accessor: ((row: any) => formatCurrency(row.bonus)) as any,
    },
    {
      header: 'Total',
      accessor: ((row: any) => (
        <span className="font-bold text-green-600">
          {formatCurrency(row.total)}
        </span>
      )) as any,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Commission Earnings
          </h1>
          <p className="text-gray-600 mt-1">
            Track your performance and earnings
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Download className="w-4 h-4" />
          Download Statement
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="This Month"
          value={formatCurrency(earnings.thisMonth)}
          icon={DollarSign}
          trend="up"  // ✅ Correct        />
        />
        <StatCard
          title="Year to Date"
          value={formatCurrency(earnings.ytd)}
          icon={Award}
          valueClassName="text-green-600"
        />
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Next Payout</p>
          <p className="text-2xl font-bold text-blue-600">
            {earnings.nextPayout}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Pending: {formatCurrency(earnings.thisMonth)}
          </p>
        </div>
      </div>

      {/* Earnings Trend */}
      <ChartWrapper
        type="line"
        data={earningsTrend}
        dataKey="amount"
        xAxisKey="name"
        title="Earnings Trend (Last 6 Months)"
        height={300}
      />

      {/* Commission Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper
          type="pie"
          data={commissionBreakdown}
          dataKey="amount"
          title="Commission Breakdown"
          height={300}
        />
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Bonuses
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">On-time Readings</p>
                <p className="text-sm text-gray-600">
                  All meter readings submitted on time
                </p>
              </div>
              <span className="text-green-600 font-bold">+KES 1,500</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg opacity-50">
              <div>
                <p className="font-medium text-gray-900">90% Occupancy</p>
                <p className="text-sm text-gray-600">Target not met (89%)</p>
              </div>
              <span className="text-gray-400">KES 0</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg opacity-50">
              <div>
                <p className="font-medium text-gray-900">
                  Zero Late Payments
                </p>
                <p className="text-sm text-gray-600">
                  2 late payments this month
                </p>
              </div>
              <span className="text-gray-400">KES 0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Commission by Property */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Commission by Property
        </h2>
        <DataTable data={propertyCommissions} columns={columns} />
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Payout History
        </h2>
        <div className="space-y-3">
          {[
            { date: '2025-10-31', amount: 15500, status: 'Completed' },
            { date: '2025-09-30', amount: 15200, status: 'Completed' },
            { date: '2025-08-31', amount: 14800, status: 'Completed' },
          ].map((payout, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{payout.date}</p>
                <p className="text-sm text-gray-600">{payout.status}</p>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(payout.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



