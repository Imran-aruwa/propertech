// ============================================
// FILE: app/caretaker/meter-readings/page.tsx
// ============================================
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/ui/DataTable';
import { Zap, Droplet, Plus, Save } from 'lucide-react';

export default function MeterReadingsPage() {
  const [activeTab, setActiveTab] = useState<'electricity' | 'water'>('electricity');
  const [readings, setReadings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const units = [
    { id: '1', unit: '101', tenant: 'John Kamau', previousReading: 1250, currentReading: 0 },
    { id: '2', unit: '102', tenant: 'Mary Wanjiku', previousReading: 980, currentReading: 0 },
    { id: '3', unit: '103', tenant: 'Peter Omondi', previousReading: 1400, currentReading: 0 },
    { id: '4', unit: '104', tenant: 'Jane Mwangi', previousReading: 750, currentReading: 0 },
  ];

  const handleReadingChange = (unitId: string, value: string) => {
    setReadings(prev => ({ ...prev, [unitId]: value }));
  };

  const handleSaveReadings = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Meter readings saved successfully!');
      setReadings({});
    } catch (error) {
      alert('Failed to save readings');
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      header: 'Unit',
      accessor: (row: typeof units[0]) => row.unit,
    },
    {
      header: 'Tenant',
      accessor: (row: typeof units[0]) => row.tenant,
    },
    {
      header: 'Previous Reading',
      accessor: (row: typeof units[0]) => row.previousReading.toLocaleString(),
    },
    {
      header: 'New Reading',
      accessor: (row: typeof units[0]) => (
        <input
          type="number"
          min={row.previousReading}
          value={readings[row.id] || ''}
          onChange={(e) => handleReadingChange(row.id, e.target.value)}
          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter reading"
        />
      ),
    },
    {
      header: 'Consumption',
      accessor: (row: typeof units[0]) => {
        const current = parseInt(readings[row.id] || '0');
        const consumption = current > row.previousReading ? current - row.previousReading : 0;
        return consumption > 0 ? `${consumption} units` : '-';
      },
    },
  ];

  return (
    <DashboardLayout role="caretaker">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meter Readings</h1>
            <p className="text-gray-600 mt-1">Record monthly utility consumption</p>
          </div>
          <button
            onClick={handleSaveReadings}
            disabled={Object.keys(readings).length === 0 || saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Readings
              </>
            )}
          </button>
        </div>

        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab('electricity')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'electricity'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Zap className="w-4 h-4" />
            Electricity
          </button>
          <button
            onClick={() => setActiveTab('water')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'water'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Droplet className="w-4 h-4" />
            Water
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <DataTable data={units} columns={columns} />
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Recording Tips</h3>
              <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
                <li>Take readings at the same time each month for consistency</li>
                <li>Double-check readings before saving</li>
                <li>Report any unusual consumption patterns immediately</li>
                <li>Ensure meters are accessible and clearly visible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


