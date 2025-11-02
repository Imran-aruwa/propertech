'use client'
import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

export default function FinancialsPage() {
  const incomeData = [
    { month: 'Jan', income: 150000, expenses: 45000 },
    { month: 'Feb', income: 165000, expenses: 52000 },
    { month: 'Mar', income: 172000, expenses: 48000 },
    { month: 'Apr', income: 180000, expenses: 55000 },
    { month: 'May', income: 195000, expenses: 50000 },
    { month: 'Jun', income: 210000, expenses: 58000 },
  ];

  const totalIncome = 1092000;
  const totalExpenses = 308000;
  const netProfit = totalIncome - totalExpenses;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);

  const expenseBreakdown = [
    { category: 'Maintenance', amount: 120000, percentage: 39 },
    { category: 'Utilities', amount: 85000, percentage: 28 },
    { category: 'Insurance', amount: 65000, percentage: 21 },
    { category: 'Management', amount: 38000, percentage: 12 },
  ];

  const stats = [
    {
      label: 'Total Income (6mo)',
      value: `KES ${(totalIncome / 1000000).toFixed(2)}M`,
      subtext: '↑ 12% from last period',
      trendUp: true,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      label: 'Total Expenses (6mo)',
      value: `KES ${(totalExpenses / 1000).toFixed(0)}K`,
      subtext: '↑ 8% from last period',
      trendUp: false,
      icon: TrendingDown,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      label: 'Net Profit (6mo)',
      value: `KES ${(netProfit / 1000000).toFixed(2)}M`,
      subtext: `${profitMargin}% profit margin`,
      trendUp: true,
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Financials</h1>
          <p className="text-gray-600 mt-2 font-medium">Track your income, expenses, and profitability</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.bgColor} p-3 rounded-xl shadow-sm`}>
                      <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  <p className={`text-xs font-semibold mt-2 ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Income vs Expenses Chart */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Income vs Expenses (6 Months)</h3>
            <div className="space-y-4">
              {incomeData.map((data, idx) => {
                const incomePercent = (data.income / 210000) * 100;
                const expensePercent = (data.expenses / 58000) * 100;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-gray-700">{data.month}</span>
                      <div className="flex gap-4 text-xs">
                        <span className="text-green-600">Income: KES {data.income.toLocaleString()}</span>
                        <span className="text-red-600">Expenses: KES {data.expenses.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 h-2 rounded-full overflow-hidden bg-gray-200">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                        style={{ width: `${incomePercent / 2}%` }}
                      ></div>
                      <div
                        className="bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                        style={{ width: `${expensePercent / 2}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Expense Breakdown</h3>
            <div className="space-y-4">
              {expenseBreakdown.map((expense, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{expense.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">KES {expense.amount.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">{expense.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${expense.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Net Profit Trend */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Net Profit Trend</h3>
          <div className="space-y-3">
            {incomeData.map((data, idx) => {
              const monthNetProfit = data.income - data.expenses;
              const maxProfit = 155000;
              const profitPercent = (monthNetProfit / maxProfit) * 100;
              return (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{data.month}</span>
                    <span className="text-sm font-bold text-blue-600">KES {monthNetProfit.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${profitPercent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-8 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Financial Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">KES {(totalIncome / 1000000).toFixed(2)}M</p>
              <p className="text-sm text-gray-600 mt-2">Total Income</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">KES {(totalExpenses / 1000).toFixed(0)}K</p>
              <p className="text-sm text-gray-600 mt-2">Total Expenses</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">KES {(netProfit / 1000000).toFixed(2)}M</p>
              <p className="text-sm text-gray-600 mt-2">Net Profit</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{profitMargin}%</p>
              <p className="text-sm text-gray-600 mt-2">Profit Margin</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}