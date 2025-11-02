'use client'
import React, { useState } from 'react';
import { BarChart3, Download, FileText, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { name: 'June 2024 Financial Report', date: '2024-07-01', size: '2.4 MB', type: 'Financial' },
    { name: 'Q2 2024 Summary Report', date: '2024-06-30', size: '1.8 MB', type: 'Summary' },
    { name: 'May 2024 Occupancy Report', date: '2024-06-01', size: '1.2 MB', type: 'Occupancy' },
    { name: 'April 2024 Tax Report', date: '2024-05-01', size: '3.1 MB', type: 'Tax' },
  ];

  const occupancyData = [
    { month: 'Jan', rate: 85 },
    { month: 'Feb', rate: 88 },
    { month: 'Mar', rate: 92 },
    { month: 'Apr', rate: 90 },
    { month: 'May', rate: 95 },
    { month: 'Jun', rate: 98 },
  ];

  const rentCollectionData = [
    { month: 'Jan', collected: 85 },
    { month: 'Feb', collected: 90 },
    { month: 'Mar', collected: 100 },
    { month: 'Apr', collected: 97 },
    { month: 'May', collected: 98 },
    { month: 'Jun', collected: 100 },
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Reports</h1>
          <p className="text-gray-600 mt-2 font-medium">View and download comprehensive property reports</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/30 font-semibold text-sm">
            <Download className="w-4 h-4" />
            Generate Monthly Report
          </button>
          <button className="flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-white/20 text-gray-900 px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold text-sm">
            <Download className="w-4 h-4" />
            Download Tax Report
          </button>
          <button className="flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-white/20 text-gray-900 px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold text-sm">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Avg Occupancy Rate</h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">92%</p>
            <p className="text-sm text-green-600 font-medium mt-2">↑ 7% from Q1</p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Avg Rent Collection</h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">96%</p>
            <p className="text-sm text-green-600 font-medium mt-2">↑ 8% from Q1</p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Avg Revenue/Unit</h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">KES 45K</p>
            <p className="text-sm text-green-600 font-medium mt-2">↑ 5% from Q1</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Occupancy Rate */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Occupancy Rate Trend</h3>
            <div className="space-y-4">
              {occupancyData.map((data, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-gray-700">{data.month}</span>
                    <span className="text-gray-900 font-bold">{data.rate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${data.rate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rent Collection Rate */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Rent Collection Rate</h3>
            <div className="space-y-4">
              {rentCollectionData.map((data, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-gray-700">{data.month}</span>
                    <span className="text-gray-900 font-bold">{data.collected}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${data.collected}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-bold text-gray-900">Recent Reports</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {reports.map((report, idx) => (
                <div
                  key={idx}
                  className="group border border-gray-200 rounded-2xl p-4 flex justify-between items-center hover:shadow-lg hover:border-blue-300 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{report.name}</p>
                      <p className="text-sm text-gray-500">{report.date} • {report.size}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))}
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