// ============================================
// FILE: app/tenant/documents/page.tsx
// ============================================
'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FileText, Download } from 'lucide-react';

export default function TenantDocumentsPage() {
  const documents = [
    { name: 'Lease Agreement', type: 'PDF', size: '2.4 MB', date: '2024-01-15' },
    { name: 'House Rules', type: 'PDF', size: '856 KB', date: '2024-01-15' },
    { name: 'Utility Guidelines', type: 'PDF', size: '1.2 MB', date: '2024-01-15' },
    { name: 'Move-in Checklist', type: 'PDF', size: '645 KB', date: '2024-01-15' },
  ];

  return (
    <DashboardLayout role="tenant">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600 mt-1">Access your lease and property documents</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {documents.map((doc, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                    <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                    <p className="text-xs text-gray-500 mt-1">Uploaded: {doc.date}</p>
                  </div>
                </div>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}



