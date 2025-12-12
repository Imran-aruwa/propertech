// ============================================
// FILE: types/database.ts
// ============================================
export interface DatabaseProperty {
  id: string;
  name: string;
  address: string;
  city: string;
  units_count: number;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseUnit {
  id: string;
  property_id: string;
  unit_number: string;
  rent_amount: number;
  bedrooms: number;
  bathrooms: number;
  status: 'vacant' | 'occupied' | 'maintenance';
}

export interface DatabasePayment {
  id: string;
  tenant_id: string;
  amount: number;
  payment_date: string;
  due_date: string;
  payment_method: string;
  status: string;
  reference_number?: string;
  created_at: string;
}

// In types/database.ts - add these interfaces
export interface GardenerAssignment {
  id: string
  property: string
  area: string
  schedule: string
  status: 'Pending' | 'In Progress' | 'Completed'
  createdAt: Date
}

export interface SecurityIncident {
  id: string
  title: string
  property: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Open' | 'Under Review' | 'Closed'
  reportedAt: string
}

// Add this interface to your existing database.ts
export interface SecurityAttendance {
  id: string
  guardName: string
  post: string
  shift: 'Day' | 'Night'
  date: string
  status: 'Present' | 'Absent' | 'Late'
}
