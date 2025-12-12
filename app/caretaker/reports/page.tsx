// ============================================
// FILE: app/caretaker/reports/page.tsx
// ============================================
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FileText, Download, Calendar } from 'lucide-react';

export default function CaretakerReportsPage() {
  const [reportType, setReportType] = useState('monthly');
  const [month, setMonth] = useState('2024-12');
  const [generating, setGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`${reportType} report for ${month} generated successfully!`);
    } catch (error) {
      alert('Failed to generate report');
    } finally {
      setGenerating(false);
    }
  };

  const reportTypes = [
    { value: 'monthly', label: 'Monthly Summary', description: 'Complete overview of monthly operations' },
    { value: 'rent', label: 'Rent Collection', description: 'Detailed rent collection report' },
    { value: 'maintenance', label: 'Maintenance', description: 'All maintenance activities' },
    { value: 'utilities', label: 'Utilities', description: 'Water and electricity consumption' },
  ];

  const recentReports = [
    { name: 'November 2024 Summary', date: '2024-12-01', type: 'Monthly', size: '2.4 MB' },
    { name: 'Rent Collection - October', date: '2024-11-01', type: 'Rent', size: '1.8 MB' },
    { name: 'Maintenance Report Q3', date: '2024-10-01', type: 'Maintenance', size: '3.2 MB' },
  ];

  return (
    <DashboardLayout role="caretaker">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Generate and download property reports</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Generate New Report</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Type
                </label>
                <div className="space-y-2">
                  {reportTypes.map((type) => (
                    <label
                      key={type.value}
                      className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="reportType"
                        value={type.value}
                        checked={reportType === type.value}
                        onChange={(e) => setReportType(e.target.value)}
                        className="mt-1"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{type.label}</p>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Period
                </label>
                <input
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleGenerateReport}
                disabled={generating}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                      <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>
                      <div className="space-y-3">
                        {recentReports.map((report, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{report.name}</p>
                                <p className="text-sm text-gray-600">
                                  {report.type} • {report.date} • {report.size}
                                </p>
                              </div>
                            </div>
                            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </DashboardLayout>
            );
          }


