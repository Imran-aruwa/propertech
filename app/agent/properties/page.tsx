'use client';

import { useState } from 'react';
import { Building2, Plus } from 'lucide-react';
import { PropertyCard } from '@/components/properties/PropertyCard';

export default function AgentPropertiesPage() {
  const [properties] = useState([
    {
      id: 1,
      name: 'Sunrise Apartments',
      location: 'Kilimani, Nairobi',
      totalUnits: 12,
      occupiedUnits: 11,
      monthlyRevenue: 96000,
      collectionRate: 95,
      outstanding: 4800,
      status: 'active',
    },
    {
      id: 2,
      name: 'Garden View Estate',
      location: 'Westlands, Nairobi',
      totalUnits: 15,
      occupiedUnits: 14,
      monthlyRevenue: 112000,
      collectionRate: 97,
      outstanding: 3360,
      status: 'active',
    },
    {
      id: 3,
      name: 'City Heights',
      location: 'Parklands, Nairobi',
      totalUnits: 10,
      occupiedUnits: 8,
      monthlyRevenue: 64000,
      collectionRate: 90,
      outstanding: 6400,
      status: 'active',
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
          <p className="text-gray-600 mt-1">Manage properties under your care</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" />
          Browse Marketplace
        </button>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            name={property.name}
            location={property.location}
            totalUnits={property.totalUnits}
            occupiedUnits={property.occupiedUnits}
            monthlyRevenue={property.monthlyRevenue}
            collectionRate={property.collectionRate}
            outstanding={property.outstanding}
            status={property.status === 'active' ? 'active' : 'inactive'}
          />
        ))}
      </div>
    </div>
  );
}
