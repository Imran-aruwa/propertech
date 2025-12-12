/**
 * API Client for PROPERTECH Backend
 * Handles all communication with FastAPI backend
 * Uses JWT tokens stored in localStorage
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiError {
  detail?: string;
  message?: string;
  error?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Get JWT token from localStorage
 */
export function getAuthToken(): string | null {
  try {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem('token') || localStorage.getItem('access_token');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

/**
 * Save JWT token to localStorage
 */
export function saveAuthToken(token: string): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('access_token', token);
    }
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
}

/**
 * Remove JWT token from localStorage
 */
export function removeAuthToken(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('role');
    }
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
}

/**
 * Generic API client with authentication
 */
export const apiClient = {
  /**
   * GET request
   */
  async get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error:
            (data as ApiError).detail ||
            (data as ApiError).message ||
            (data as ApiError).error ||
            'Request failed',
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('API GET error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  },

  /**
   * POST request
   */
  async post<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error:
            (data as ApiError).detail ||
            (data as ApiError).message ||
            (data as ApiError).error ||
            'Request failed',
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('API POST error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  },

  /**
   * PATCH request
   */
  async patch<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error:
            (data as ApiError).detail ||
            (data as ApiError).message ||
            (data as ApiError).error ||
            'Request failed',
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('API PATCH error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  },

  /**
   * PUT request
   */
  async put<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error:
            (data as ApiError).detail ||
            (data as ApiError).message ||
            (data as ApiError).error ||
            'Request failed',
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('API PUT error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  },

  /**
   * DELETE request
   */
  async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error:
            (data as ApiError).detail ||
            (data as ApiError).message ||
            (data as ApiError).error ||
            'Request failed',
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('API DELETE error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  },
};

/**
 * Auth API
 */
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  role?: string;
}

export const authApi = {
  async login(data: LoginData) {
    return apiClient.post('/api/v1/auth/login', data);
  },

  async register(data: RegisterData) {
    return apiClient.post('/api/v1/auth/register', data);
  },

  async getCurrentUser() {
    return apiClient.get('/api/v1/auth/me');
  },

  async logout() {
    removeAuthToken();
    return { success: true } as ApiResponse;
  },
};

export const propertiesApi = {
  async list() { return apiClient.get('/api/v1/properties'); },
  async getAll() { return apiClient.get('/api/v1/properties'); },
  async get(id: string) { return apiClient.get(`/api/v1/properties/${id}`); },
  async create(data: any) { return apiClient.post('/api/v1/properties', data); },
  async update(id: string, data: any) { return apiClient.patch(`/api/v1/properties/${id}`, data); },
  async delete(id: string) { return apiClient.delete(`/api/v1/properties/${id}`); },
  async remove(id: string) { return apiClient.delete(`/api/v1/properties/${id}`); },
};

/**
 * Units API
 */
export const unitsApi = {
  async list(propertyId?: string) {
    if (propertyId) return apiClient.get(`/api/v1/properties/${propertyId}/units`);
    return apiClient.get('/api/v1/units');
  },
  async getAll() { return apiClient.get('/api/v1/units'); },
  async create(propertyId: string, data: any) { 
    return apiClient.post(`/api/v1/properties/${propertyId}/units`, data); 
  },
  async delete(id: string) { return apiClient.delete(`/api/v1/units/${id}`); },
};


/**
 * Tenants API
 */
export const tenantsApi = {
  async list() { return apiClient.get('/api/v1/tenants'); },
  async getAll() { return apiClient.get('/api/v1/tenants'); },
  async create(data: any) { return apiClient.post('/api/v1/tenants', data); },
  async delete(id: string) { return apiClient.delete(`/api/v1/tenants/${id}`); },
};


/**
 * Maintenance API
 */
export const maintenanceApi = {
  async list() { return apiClient.get('/api/v1/maintenance'); },
  async getAll() { return apiClient.get('/api/v1/maintenance'); },
  async create(data: any) { return apiClient.post('/api/v1/maintenance', data); },
  async update(id: string, data: any) { return apiClient.patch(`/api/v1/maintenance/${id}`, data); },
  async delete(id: string) { return apiClient.delete(`/api/v1/maintenance/${id}`); },
};


/**
 * Staff API
 */
export const staffApi = {
  async list() {
    return apiClient.get('/api/v1/staff');
  },
  async getAll() {
    // alias for list()
    return apiClient.get('/api/v1/staff');
  },
  async get(id: string) {
    return apiClient.get(`/api/v1/staff/${id}`);
  },
  async create(data: any) {
    return apiClient.post('/api/v1/staff', data);
  },
  async update(id: string, data: any) {
    return apiClient.patch(`/api/v1/staff/${id}`, data);
  },
  async delete(id: string) {
    return apiClient.delete(`/api/v1/staff/${id}`);
  },
  async remove(id: string) {
    // keep remove as an alias if you already use it
    return apiClient.delete(`/api/v1/staff/${id}`);
  },
};

/**
 * Analytics API
 */
export const analyticsApi = {
  async dashboard() {
    return apiClient.get('/api/v1/analytics/dashboard');
  },
  async getAll() {
    // if you have a general analytics list endpoint, adjust this URL
    return apiClient.get('/api/v1/analytics/dashboard');
  },
  // New method to match the usage in owner dashboard
  async getDashboardStats(role: string) {
    return apiClient.get(`/api/v1/analytics/dashboard?role=${role}`);
  },
  // add more granular helpers only if your backend has matching routes:
  async forOwner(ownerId: string) {
    return apiClient.get(`/api/v1/analytics/owners/${ownerId}`);
  },
  async forAgent(agentId: string) {
    return apiClient.get(`/api/v1/analytics/agents/${agentId}`);
  },
};

/**
 * Payments API (Paystack)
 */
export const paymentsApi = {
  async initializePayment(amount: number, email: string, reference: string) {
    return apiClient.post('/api/v1/payments/initialize', {
      amount,
      email,
      reference,
    });
  },

  async verifyPayment(reference: string, extra?: { plan_id?: string; billing_cycle?: string }) {
    return apiClient.post('/api/v1/payments/verify', {
      reference,
      ...(extra || {}),
    });
  },

  async getAll() {
    return apiClient.get('/api/v1/payments');
  },

  async update(id: number | string, data: any) {
    return apiClient.patch(`/api/v1/payments/${id}`, data);
  },

  async get(id: number | string) {
    return apiClient.get(`/api/v1/payments/${id}`);
  },
};

// Default export for backward compatibility
export default apiClient;