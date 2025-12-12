'use client';

import { useState } from 'react';
import { FileText, Download, Calendar, Filter, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('monthly');
  const [dateRange, setDateRange] = useState({ start: '2025-11-01', end: '2025-11-30' });
  const [selectedProperties, setSelectedProperties] = useState<string[]>(['all']);

  const reportTypes = [
    { id: 'monthly', name: 'Monthly Financial Report', description: 'Comprehensive monthly overview' },
    { id: 'quarterly', name: 'Quarterly Summary', description: 'Q4 2025 report' },
    { id: 'annual', name: 'Annual Tax Report', description: 'Year 2025 summary' },
    { id: 'property', name: 'Property Comparison', description: 'Compare all properties' },
    { id: 'tenant', name: 'Tenant Payment History', description: 'All tenant payments' },
    { id: 'agent', name: 'Agent Performance', description: 'Agent commissions & performance' },
  ];

  const generateReport = () => {
    alert(`Generating ${reportType} report...`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Generate comprehensive financial and operational reports</p>
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Configure Report</h2>
        
        {/* Date Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Property Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Properties</label>
          <select
            multiple
            value={selectedProperties}
            onChange={(e) => setSelectedProperties(Array.from(e.target.selectedOptions, option => option.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Properties</option>
            <option value="1">Property 1</option>
            <option value="2">Property 2</option>
            <option value="3">Property 3</option>
          </select>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <div
            key={report.id}
            onClick={() => setReportType(report.id)}
            className={`bg-white rounded-lg shadow-sm border-2 p-6 cursor-pointer transition ${
              reportType === report.id ? 'border-blue-500' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <FileText className={`w-6 h-6 ${reportType === report.id ? 'text-blue-600' : 'text-gray-400'}`} />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{report.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{report.description}</p>
              </div>
            </div>
            {reportType === report.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={generateReport}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Download className="w-4 h-4" />
                  Generate Report
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reports</h2>
        <div className="space-y-3">
          {[
            { name: 'November 2025 Financial Report', date: '2025-12-01', size: '2.4 MB' },
            { name: 'Q3 2025 Summary', date: '2025-10-01', size: '1.8 MB' },
            { name: 'October 2025 Financial Report', date: '2025-11-01', size: '2.2 MB' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{report.name}</p>
                  <p className="text-sm text-gray-600">{report.date} • {report.size}</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


