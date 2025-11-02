'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Wrench, Plus, AlertCircle, Clock, CheckCircle, Filter, Search } from 'lucide-react';

interface MaintenanceRequest {
  id: string;
  title: string;
  property: string;
  unit: string;
  description: string;
  status: 'open' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'emergency';
  createdDate: string;
  dueDate: string;
  assignedTo?: string;
  estimatedCost?: number;
}

export default function MaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([
    {
      id: '1',
      title: 'Leaky Faucet',
      property: 'Kuscco homes',
      unit: '101',
      description: 'Kitchen sink faucet is dripping constantly, needs replacement',
      status: 'open',
      priority: 'medium',
      createdDate: '2024-06-01',
      dueDate: '2024-06-05',
      assignedTo: 'Unassigned',
      estimatedCost: 3500,
    },
    {
      id: '2',
      title: 'AC Maintenance',
      property: 'Kuscco homes',
      unit: '102',
      description: 'Air conditioner needs servicing and filter replacement',
      status: 'in_progress',
      priority: 'high',
      createdDate: '2024-05-28',
      dueDate: '2024-06-03',
      assignedTo: 'John Plumber',
      estimatedCost: 8500,
    },
    {
      id: '3',
      title: 'Door Handle Repair',
      property: 'Kuscco homes',
      unit: '101',
      description: 'Main door handle is broken, needs urgent replacement',
      status: 'completed',
      priority: 'low',
      createdDate: '2024-05-20',
      dueDate: '2024-05-25',
      assignedTo: 'Mike Carpenter',
      estimatedCost: 2000,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in_progress' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high' | 'emergency'>('all');

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'open':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bg: 'from-red-100 to-red-200',
          bgLight: 'bg-red-50',
          label: 'Open',
        };
      case 'in_progress':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bg: 'from-yellow-100 to-yellow-200',
          bgLight: 'bg-yellow-50',
          label: 'In Progress',
        };
      case 'completed':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'from-green-100 to-green-200',
          bgLight: 'bg-green-50',
          label: 'Completed',
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bg: 'from-gray-100 to-gray-200',
          bgLight: 'bg-gray-50',
          label: 'Unknown',
        };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'low':
        return { color: 'text-blue-600', bg: 'from-blue-100 to-blue-200', bgLight: 'bg-blue-50', label: 'Low' };
      case 'medium':
        return { color: 'text-yellow-600', bg: 'from-yellow-100 to-yellow-200', bgLight: 'bg-yellow-50', label: 'Medium' };
      case 'high':
        return { color: 'text-orange-600', bg: 'from-orange-100 to-orange-200', bgLight: 'bg-orange-50', label: 'High' };
      case 'emergency':
        return { color: 'text-red-600', bg: 'from-red-100 to-red-200', bgLight: 'bg-red-50', label: 'Emergency' };
      default:
        return { color: 'text-gray-600', bg: 'from-gray-100 to-gray-200', bgLight: 'bg-gray-50', label: 'Unknown' };
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = [
    {
      label: 'Open Requests',
      value: requests.filter(r => r.status === 'open').length,
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
    {
      label: 'In Progress',
      value: requests.filter(r => r.status === 'in_progress').length,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      label: 'Completed',
      value: requests.filter(r => r.status === 'completed').length,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Maintenance</h1>
                <p className="text-gray-600 mt-1 font-medium">Track and manage all maintenance requests</p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 font-semibold whitespace-nowrap">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New Request</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                      <Icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, property, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 transition"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <Filter className="w-5 h-5 text-gray-400 mt-3" />
              {(['all', 'open', 'in_progress', 'completed'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/50 border border-gray-200 text-gray-700 hover:bg-white'
                  }`}
                >
                  {status === 'all' ? 'All' : status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div className="flex gap-2 mt-4 flex-wrap">
            <span className="text-sm text-gray-600 font-medium self-center">Priority:</span>
            {(['all', 'low', 'medium', 'high', 'emergency'] as const).map(priority => (
              <button
                key={priority}
                onClick={() => setFilterPriority(priority)}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                  filterPriority === priority
                    ? priority === 'all'
                      ? 'bg-gray-600 text-white'
                      : priority === 'emergency'
                      ? 'bg-red-600 text-white'
                      : priority === 'high'
                      ? 'bg-orange-600 text-white'
                      : priority === 'medium'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-blue-600 text-white'
                    : 'bg-white/50 border border-gray-200 text-gray-700 hover:bg-white'
                }`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-bold text-gray-900">Maintenance Requests ({filteredRequests.length})</h2>
          </div>

          <div className="p-6">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Wrench className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No maintenance requests found</h3>
                <p className="text-gray-600 max-w-md mx-auto">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request, idx) => {
                  const statusConfig = getStatusConfig(request.status);
                  const priorityConfig = getPriorityConfig(request.priority);
                  const StatusIcon = statusConfig.icon;
                  const PriorityIcon = AlertCircle;

                  return (
                    <div
                      key={request.id}
                      className="group border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 hover:scale-102 transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        {/* Left Section */}
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <StatusIcon className={`w-5 h-5 ${statusConfig.color} flex-shrink-0 mt-1`} />
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {request.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1 font-medium">
                                {request.property} • Unit {request.unit}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{request.description}</p>

                          <div className="flex flex-wrap gap-3 text-xs">
                            <div className="flex items-center gap-1 text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                              📅 Created: {new Date(request.createdDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                              🎯 Due: {new Date(request.dueDate).toLocaleDateString()}
                            </div>
                            {request.assignedTo && (
                              <div className="flex items-center gap-1 text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                                👤 {request.assignedTo}
                              </div>
                            )}
                            {request.estimatedCost && (
                              <div className="flex items-center gap-1 text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                                💰 KES {request.estimatedCost.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Section - Status & Priority */}
                        <div className="flex flex-col items-end gap-3 lg:flex-nowrap">
                          <div className={`px-4 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r ${priorityConfig.bg} ${priorityConfig.color} whitespace-nowrap`}>
                            {priorityConfig.label} Priority
                          </div>
                          <div className={`px-4 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r ${statusConfig.bg} ${statusConfig.color} whitespace-nowrap`}>
                            {statusConfig.label}
                          </div>
                          <button className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        {filteredRequests.length > 0 && (
          <div className="mt-8 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{requests.length}</p>
                <p className="text-sm text-gray-600">Total Requests</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{requests.filter(r => r.priority === 'emergency').length}</p>
                <p className="text-sm text-gray-600">Emergency</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">
                  KES {requests.reduce((sum, r) => sum + (r.estimatedCost || 0), 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Est. Cost</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {requests.filter(r => r.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </div>
        )}
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