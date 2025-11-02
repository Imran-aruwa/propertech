'use client'
import React, { useState } from 'react';
import { Users, Phone, Mail, Calendar, AlertCircle, CheckCircle, Clock, Plus, Search, Filter } from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  moveInDate: string;
  moveOutDate: string;
  rentAmount: number;
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'John Kipchoge',
      email: 'john@example.com',
      phone: '+254722123456',
      property: 'Kuscco homes',
      unit: '101',
      moveInDate: '2024-01-15',
      moveOutDate: '2025-01-14',
      rentAmount: 45000,
      paymentStatus: 'paid',
    },
    {
      id: '2',
      name: 'Faith Kiplagat',
      email: 'faith@example.com',
      phone: '+254733456789',
      property: 'Kuscco homes',
      unit: '102',
      moveInDate: '2024-02-01',
      moveOutDate: '2025-01-31',
      rentAmount: 45000,
      paymentStatus: 'pending',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return { bg: 'from-green-100 to-green-200', text: 'text-green-700', icon: CheckCircle, color: 'text-green-600' };
      case 'pending':
        return { bg: 'from-yellow-100 to-yellow-200', text: 'text-yellow-700', icon: Clock, color: 'text-yellow-600' };
      case 'overdue':
        return { bg: 'from-red-100 to-red-200', text: 'text-red-700', icon: AlertCircle, color: 'text-red-600' };
      default:
        return { bg: 'from-gray-100 to-gray-200', text: 'text-gray-700', icon: Clock, color: 'text-gray-600' };
    }
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tenant.paymentStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: 'Total Tenants',
      value: tenants.length,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Paid This Month',
      value: tenants.filter(t => t.paymentStatus === 'paid').length,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      label: 'Pending Payment',
      value: tenants.filter(t => t.paymentStatus === 'pending').length,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
    },
    {
      label: 'Overdue',
      value: tenants.filter(t => t.paymentStatus === 'overdue').length,
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
  ];

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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Tenants</h1>
            <p className="text-gray-600 mt-2 font-medium">Manage all your tenants and their payment status</p>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/30 font-semibold text-sm">
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Tenant</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.bgColor} p-3 rounded-xl shadow-sm`}>
                      <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'paid', 'pending', 'overdue'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/50 border border-gray-200 text-gray-700 hover:bg-white'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tenants List */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-bold text-gray-900">Tenant Details ({filteredTenants.length})</h2>
          </div>
          <div className="p-6">
            {filteredTenants.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No tenants found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTenants.map((tenant, idx) => {
                  const statusConfig = getStatusConfig(tenant.paymentStatus);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <div
                      key={tenant.id}
                      className="group border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:scale-102"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {tenant.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 font-medium">
                            {tenant.property} • Unit {tenant.unit}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-4 h-4" />
                              {tenant.email}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="w-4 h-4" />
                              {tenant.phone}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              {new Date(tenant.moveInDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">KES {tenant.rentAmount.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Monthly rent</p>
                          </div>
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r ${statusConfig.bg} ${statusConfig.text}`}>
                            <StatusIcon className="w-4 h-4" />
                            {tenant.paymentStatus.charAt(0).toUpperCase() + tenant.paymentStatus.slice(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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