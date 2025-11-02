'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Building2, Plus } from 'lucide-react';

export default function DashboardPage() {
  const [properties] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Properties</h2>
          <Link href="/dashboard/properties/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            <Plus className="w-5 h-5 inline mr-2" />
            Add Property
          </Link>
        </div>
        
        {properties.length === 0 ? (
          <p className="text-gray-600">No properties yet. Add your first property to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((p: any) => (
              <div key={p.id} className="border rounded-lg p-4">
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.address}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}