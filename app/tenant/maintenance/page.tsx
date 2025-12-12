// ============================================
// FILE: app/tenant/maintenance/page.tsx
// ============================================
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/ui/DataTable';
import { Plus, Wrench } from 'lucide-react';

export default function TenantMaintenancePage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    issue: '',
    description: '',
    priority: 'medium',
  });

  const requests = [
    {
      id: '1',
      issue: 'Leaking faucet',
      priority: 'high',
      status: 'in_progress',
      date: '2024-12-05',
      description: 'Kitchen sink faucet leaking',
    },
    {
      id: '2',
      issue: 'Broken window',
      priority: 'medium',
      status: 'completed',
      date: '2024-11-20',
      description: 'Living room window crack',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Maintenance request submitted successfully!');
      setShowForm(false);
      setFormData({ issue: '', description: '', priority: 'medium' });
    } catch (error) {
      alert('Failed to submit request');
    }
  };

  const columns = [
    { header: 'Issue', accessor: (row: typeof requests[0]) => row.issue },
    {
      header: 'Priority',
      accessor: (row: typeof requests[0]) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.priority.toUpperCase()}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: typeof requests[0]) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {row.status.replace('_', ' ').toUpperCase()}
        </span>
      ),
    },
    { header: 'Date', accessor: (row: typeof requests[0]) => row.date },
  ];

  return (
    <DashboardLayout role="tenant">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Maintenance Requests</h1>
            <p className="text-gray-600 mt-1">Submit and track your maintenance requests</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            New Request
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Submit Maintenance Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issue</label>
                <input
                  type="text"
                  value={formData.issue}
                  onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <DataTable data={requests} columns={columns} />
        </div>
      </div>
    </DashboardLayout>
  );
}


