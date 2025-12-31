/**
 * Tests for API Services
 */
import {
  getAuthToken,
  saveAuthToken,
  removeAuthToken,
  apiClient,
  authApi,
  propertiesApi,
  tenantsApi,
  analyticsApi,
} from '@/app/lib/api-services';

// Mock fetch globally
global.fetch = jest.fn();

describe('Auth Token Management', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('getAuthToken', () => {
    it('returns null when no token exists', () => {
      expect(getAuthToken()).toBeNull();
    });

    it('returns token from auth_token key', () => {
      localStorage.setItem('auth_token', 'test-token-123');
      expect(getAuthToken()).toBe('test-token-123');
    });

    it('returns token from token key as fallback', () => {
      localStorage.setItem('token', 'fallback-token');
      expect(getAuthToken()).toBe('fallback-token');
    });

    it('returns token from access_token key as fallback', () => {
      localStorage.setItem('access_token', 'access-token');
      expect(getAuthToken()).toBe('access-token');
    });

    it('prioritizes auth_token over other keys', () => {
      localStorage.setItem('auth_token', 'primary-token');
      localStorage.setItem('token', 'secondary-token');
      localStorage.setItem('access_token', 'tertiary-token');
      expect(getAuthToken()).toBe('primary-token');
    });
  });

  describe('saveAuthToken', () => {
    it('saves token to all storage keys', () => {
      saveAuthToken('new-token');
      expect(localStorage.getItem('auth_token')).toBe('new-token');
      expect(localStorage.getItem('token')).toBe('new-token');
      expect(localStorage.getItem('access_token')).toBe('new-token');
    });
  });

  describe('removeAuthToken', () => {
    it('removes all auth-related keys from localStorage', () => {
      localStorage.setItem('auth_token', 'token');
      localStorage.setItem('token', 'token');
      localStorage.setItem('access_token', 'token');
      localStorage.setItem('user_id', '123');
      localStorage.setItem('role', 'owner');

      removeAuthToken();

      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('access_token')).toBeNull();
      expect(localStorage.getItem('user_id')).toBeNull();
      expect(localStorage.getItem('role')).toBeNull();
    });
  });
});

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('GET requests', () => {
    it('makes successful GET request', async () => {
      const mockData = { id: 1, name: 'Test Property' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await apiClient.get('/properties/1/');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/properties/1/',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('includes auth token in headers when available', async () => {
      localStorage.setItem('auth_token', 'bearer-token');
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await apiClient.get('/properties/');

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/properties/',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer bearer-token',
          }),
        })
      );
    });

    it('handles API error responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ detail: 'Not found' }),
      });

      const result = await apiClient.get('/properties/999/');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Not found');
    });

    it('handles network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await apiClient.get('/properties/');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error');
    });
  });

  describe('POST requests', () => {
    it('makes successful POST request with body', async () => {
      const requestBody = { name: 'New Property', address: '123 Main St' };
      const mockResponse = { id: 1, ...requestBody };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await apiClient.post('/properties/', requestBody);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/properties/',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestBody),
        })
      );
    });

    it('handles POST without body', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const result = await apiClient.post('/logout/');

      expect(result.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/logout/',
        expect.objectContaining({
          method: 'POST',
          body: undefined,
        })
      );
    });
  });

  describe('PUT requests', () => {
    it('makes successful PUT request', async () => {
      const updateData = { name: 'Updated Property' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 1, ...updateData }),
      });

      const result = await apiClient.put('/properties/1/', updateData);

      expect(result.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/properties/1/',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updateData),
        })
      );
    });
  });

  describe('PATCH requests', () => {
    it('makes successful PATCH request', async () => {
      const patchData = { status: 'active' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 1, ...patchData }),
      });

      const result = await apiClient.patch('/properties/1/', patchData);

      expect(result.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/properties/1/',
        expect.objectContaining({
          method: 'PATCH',
        })
      );
    });
  });

  describe('DELETE requests', () => {
    it('makes successful DELETE request', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const result = await apiClient.delete('/properties/1/');

      expect(result.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/properties/1/',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });
});

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('login', () => {
    it('calls login endpoint with credentials', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'token', user: {} }),
      });

      await authApi.login({ email: 'test@example.com', password: 'password123' });

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/auth/login/',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
        })
      );
    });
  });

  describe('register', () => {
    it('calls signup endpoint with user data', async () => {
      const registerData = {
        email: 'new@example.com',
        password: 'password123',
        full_name: 'Test User',
        phone: '1234567890',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 1, ...registerData }),
      });

      await authApi.register(registerData);

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/auth/signup/',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(registerData),
        })
      );
    });
  });

  describe('getCurrentUser', () => {
    it('calls me endpoint', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 1, email: 'test@example.com' }),
      });

      await authApi.getCurrentUser();

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/auth/me/',
        expect.objectContaining({ method: 'GET' })
      );
    });
  });

  describe('logout', () => {
    it('removes auth tokens and returns success', async () => {
      localStorage.setItem('auth_token', 'token');

      const result = await authApi.logout();

      expect(result.success).toBe(true);
      expect(localStorage.getItem('auth_token')).toBeNull();
    });
  });
});

describe('Properties API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('list calls correct endpoint', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await propertiesApi.list();

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/properties/',
      expect.any(Object)
    );
  });

  it('get calls correct endpoint with id', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: '123' }),
    });

    await propertiesApi.get('123');

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/properties/123/',
      expect.any(Object)
    );
  });

  it('create sends POST request', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1 }),
    });

    await propertiesApi.create({ name: 'New Property' });

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/properties/',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('delete sends DELETE request', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    await propertiesApi.delete('123');

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/properties/123/',
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

describe('Analytics API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getDashboardStats returns owner dashboard for owner role', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ stats: {} }),
    });

    await analyticsApi.getDashboardStats('owner');

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/owner/dashboard/',
      expect.any(Object)
    );
  });

  it('getDashboardStats returns agent dashboard for agent role', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ stats: {} }),
    });

    await analyticsApi.getDashboardStats('agent');

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/agent/dashboard/',
      expect.any(Object)
    );
  });

  it('getDashboardStats returns caretaker dashboard for caretaker role', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ stats: {} }),
    });

    await analyticsApi.getDashboardStats('caretaker');

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/caretaker/dashboard/',
      expect.any(Object)
    );
  });

  it('getDashboardStats handles case-insensitive role', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ stats: {} }),
    });

    await analyticsApi.getDashboardStats('OWNER');

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/owner/dashboard/',
      expect.any(Object)
    );
  });
});
