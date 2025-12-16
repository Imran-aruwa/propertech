'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Building2, Users, TrendingUp, AlertCircle, Download } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { DataTable } from '@/components/ui/DataTable';
import { ChartWrapper } from '@/components/ui/ChartWrapper';
import { apiClient } from '@/app/lib/api-services';

interface Unit {
  id: number;
  unit_number: string;
  tenant_name: string;
  rent_status: 'paid' | 'pending' | 'overdue';
  water_status: 'paid' | 'pending' | 'overdue';
  electricity_status: 'paid' | 'pending' | 'overdue';
  days_overdue: number;
}

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params.id;
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState({
    name: 'Sunrise Apartments',
    location: 'Kilimani, Nairobi',
    caretaker: 'John Kamau',
    expectedRent: 280000,
    collectedRent: 268500,
    pending: 8200,
    overdue: 3300,
    waterCollected: 18900,
    electricityCollected: 34200,
    totalRevenue: 321600,
    previousRevenue: 315200,
  });
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    fetchPropertyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/owner/property/${propertyId}`);
      if (response.data) {
        setProperty(response.data.property);
        setUnits(response.data.units);
      } else {
        // Mock data
        setUnits([
          {
            id: 1,
            unit_number: 'A101',
            tenant_name: 'John Doe',
            rent_status: 'paid',
            water_status: 'paid',
            electricity_status: 'paid',
            days_overdue: 0,
          },
          {
            id: 2,
            unit_number: 'A102',
            tenant_name: 'Jane Smith',
            rent_status: 'pending',
            water_status: 'paid',
            electricity_status: 'pending',
            days_overdue: 2,
          },
          {
            id: 3,
            unit_number: 'A103',
            tenant_name: 'Bob Wilson',
            rent_status: 'overdue',
            water_status: 'overdue',
            electricity_status: 'overdue',
            days_overdue: 7,
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching property data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return `KES ${value.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: 'Paid', className: 'bg-green-100 text-green-800' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      overdue: { label: 'Overdue', className: 'bg-red-100 text-red-800' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const collectionRate = ((property.collectedRent / property.expectedRent) * 100).toFixed(1);
  const revenueGrowth = (((property.totalRevenue - property.previousRevenue) / property.previousRevenue) * 100).toFixed(1);

  const revenueTrend = [
    { name: 'Jun', revenue: 305000 },
    { name: 'Jul', revenue: 310000 },
    { name: 'Aug', revenue: 312000 },
    { name: 'Sep', revenue: 315200 },
    { name: 'Oct', revenue: 321600 },
  ];

  const columns = [
    {
      header: 'Unit',
      accessor: 'unit_number' as keyof Unit,
    },
    {
      header: 'Tenant',
      accessor: 'tenant_name' as keyof Unit,
    },
    {
      header: 'Rent Status',
      accessor: ((row: Unit) => getStatusBadge(row.rent_status)) as any,
    },
    {
      header: 'Water',
      accessor: ((row: Unit) => getStatusBadge(row.water_status)) as any,
    },
    {
      header: 'Electricity',
      accessor: ((row: Unit) => getStatusBadge(row.electricity_status)) as any,
    },
    {
      header: 'Days Overdue',
      accessor: ((row: Unit) => (
        <span className={row.days_overdue > 0 ? 'text-red-600 font-semibold' : 'text-gray-400'}>
          {row.days_overdue > 0 ? `${row.days_overdue} days` : '-'}
        </span>
      )) as any,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">{property.name}</h1>
          </div>
          <p className="text-gray-600">{property.location}</p>
          <p className="text-sm text-gray-500 mt-1">Managed by: {property.caretaker}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Expected Rent"
          value={formatCurrency(property.expectedRent)}
          icon={Building2}
        />
        <StatCard
          title="Collected Rent"
          value={formatCurrency(property.collectedRent)}
          icon={TrendingUp}
          subtitle={`${collectionRate}% collection rate`}
        />
        <StatCard
          title="Pending"
          value={formatCurrency(property.pending)}
          icon={Users}
          label="Pending Payments"
          change="0"
          trend="neutral"
        />
        <StatCard
          title="Overdue"
          value={formatCurrency(property.overdue)}
          icon={AlertCircle}
          label="Overdue Payments"
          change="0"
          trend="down"
        />
      </div>

      {/* Bills Collection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Bills</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Collected:</span>
              <span className="font-semibold text-gray-900">{formatCurrency(property.waterCollected)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Collection Rate:</span>
              <span className="font-semibold text-green-600">94.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Electricity Bills</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Collected:</span>
              <span className="font-semibold text-gray-900">{formatCurrency(property.electricityCollected)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Collection Rate:</span>
              <span className="font-semibold text-green-600">90%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <ChartWrapper
        type="line"
        data={revenueTrend}
        dataKey="revenue"
        xAxisKey="name"
        title={`Revenue Trend (${revenueGrowth > '0' ? '+' : ''}${revenueGrowth}% vs last month)`}
        height={250}
      />

      {/* Unit-by-Unit Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Unit-by-Unit Breakdown</h2>
        <DataTable data={units} columns={columns} isLoading={loading} />
      </div>
    </div>
  );
}