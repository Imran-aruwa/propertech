'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Building2, Plus, Search, MapPin, Home, DollarSign, Users } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  address: string;
  property_type: string;
  purchase_date: string;
  purchase_price: number;
  units: any[];
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with real API when ready
      const mockProperties: Property[] = [
        {
          id: '1',
          name: 'Kuscco homes',
          address: 'old mananga road, Kitengela, Kenya',
          property_type: 'Residential',
          purchase_date: '2024-01-15',
          purchase_price: 15000000,
          units: [
            { id: '1', unit_number: '101', bedrooms: 2, bathrooms: 2, monthly_rent: 45000, status: 'occupied' },
            { id: '2', unit_number: '102', bedrooms: 2, bathrooms: 2, monthly_rent: 45000, status: 'occupied' },
          ],
        },
      ];
      setProperties(mockProperties);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnits = properties.reduce((sum, p) => sum + (p.units?.length || 0), 0);
  const occupiedUnits = properties.reduce((sum, p) =>
    sum + (p.units?.filter((u: any) => u.status === 'occupied').length || 0), 0
  );
  const totalRevenue = properties.reduce((sum, p) =>
    sum + (p.units?.reduce((unitSum: number, u: any) =>
      u.status === 'occupied' && u.monthly_rent ? unitSum + u.monthly_rent : unitSum, 0) || 0), 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Properties</h1>
            <p className="text-gray-600 mt-2 font-medium">Manage all your properties and units</p>
          </div>
          <Link
            href="/dashboard/properties/new"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/30 font-semibold text-sm"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Property</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-50 p-3 rounded-xl shadow-sm">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{properties.length}</div>
              <div className="text-sm text-gray-600 font-medium">Total Properties</div>
            </div>
          </div>

          <div className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-50 p-3 rounded-xl shadow-sm">
                  <Home className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalUnits}</div>
              <div className="text-sm text-gray-600 font-medium">Total Units</div>
            </div>
          </div>

          <div className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-50 p-3 rounded-xl shadow-sm">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{occupiedUnits}/{totalUnits}</div>
              <div className="text-sm text-gray-600 font-medium">Occupied Units</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by property name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
            />
          </div>
        </div>

        {/* Properties Grid */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-bold text-gray-900">Your Properties ({filteredProperties.length})</h2>
          </div>

          <div className="p-6">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-16">
                <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-6">No properties found</p>
                <Link
                  href="/dashboard/properties/new"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/30 font-semibold"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Property
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property, idx) => (
                  <Link
                    key={property.id}
                    href={`/dashboard/properties/${property.id}`}
                    className="group relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Building2 className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-xs bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-3 py-1.5 rounded-full font-semibold shadow-sm">
                          {property.units?.length || 0} units
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">
                        {property.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 flex items-center gap-2 mb-4">
                        <MapPin className="w-4 h-4" />
                        {property.address}
                      </p>

                      <div className="pt-4 border-t border-gray-100 space-y-2">
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                          {property.property_type}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold">Purchase Price:</span> KES {property.purchase_price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
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