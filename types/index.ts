// ============================================
// FILE: types/index.ts
// ============================================
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'agent' | 'caretaker' | 'tenant' | 'security' | 'gardener';
  phone?: string;
  createdAt: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  units: number;
  ownerId: string;
  createdAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  unitId: string;
  rentAmount: number;
  leaseStart: string;
  leaseEnd: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Payment {
  id: string;
  tenantId: string;
  amount: number;
  date: string;
  method: 'mpesa' | 'bank' | 'cash';
  status: 'paid' | 'pending' | 'overdue';
  reference?: string;
}

export interface MaintenanceRequest {
  id: string;
  unitId: string;
  tenantId: string;
  issue: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
}

export * from './database'
export * from './api'
