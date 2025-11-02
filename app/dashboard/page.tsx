'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Building2, Plus, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [properties] = useState<any[]>([]);

  const handleLogout = () => {
    authAPI.logout();
    router.push('/logout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
        
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Properties</h2>
            <Link href="/dashboard/properties/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Plus className="w-5 h-5 inline mr-2" />
              Add Property
            </Link>
          </div>
          
          {properties.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No properties yet</p>
              <Link href="/dashboard/properties/new" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Add Your First Property
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((p: any) => (
                <div key={p.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-sm text-gray-600">{p.address}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}