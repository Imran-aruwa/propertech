// ============================================
// FILE: types/api.ts
// ============================================
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaymentRequest {
  tenantId: string;
  amount: number;
  method: 'mpesa' | 'bank' | 'cash';
  reference?: string;
}

export interface MaintenanceRequestPayload {
  unitId: string;
  issue: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
}
// In types/api.ts - add these for your API endpoints
export interface GetSecurityAttendanceResponse {
  data: SecurityAttendance[]
  total: number
  filters: {
    shifts: string[]
    statuses: string[]
  }
}
