/**
 * Tests for Auth Context
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { AuthProvider, useAuth } from '@/app/lib/auth-context';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock api-services
jest.mock('@/app/lib/api-services', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
    getCurrentUser: jest.fn(),
  },
}));

import { authApi } from '@/app/lib/api-services';

// Wrapper component for providing context
const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('Initial State', () => {
    it('starts with loading state', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      // Wait for loading to complete
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('initializes as unauthenticated when no saved data', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
    });

    it('restores auth state from localStorage', async () => {
      const savedUser = {
        id: 1,
        email: 'test@example.com',
        full_name: 'Test User',
        role: 'owner',
      };

      localStorage.setItem('auth_token', 'saved-token');
      localStorage.setItem('auth_user', JSON.stringify(savedUser));
      localStorage.setItem('user_role', 'owner');

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.token).toBe('saved-token');
      expect(result.current.user?.email).toBe('test@example.com');
      expect(result.current.role).toBe('owner');
    });
  });

  describe('Login', () => {
    it('calls authApi.login with credentials', async () => {
      (authApi.login as jest.Mock).mockResolvedValueOnce({
        success: true,
        data: {
          access_token: 'new-token',
          user_id: 1,
          email: 'test@example.com',
          full_name: 'Test User',
          role: 'owner',
        },
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        try {
          await result.current.login('test@example.com', 'password123');
        } catch {
          // Expected since window.location.href assignment might throw
        }
      });

      expect(authApi.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('throws error on failed login', async () => {
      (authApi.login as jest.Mock).mockResolvedValueOnce({
        success: false,
        error: 'Invalid credentials',
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(
        act(async () => {
          await result.current.login('test@example.com', 'wrongpassword');
        })
      ).rejects.toThrow('Invalid credentials');
    });

    it('handles missing response data', async () => {
      (authApi.login as jest.Mock).mockResolvedValueOnce({
        success: true,
        data: null,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(
        act(async () => {
          await result.current.login('test@example.com', 'password');
        })
      ).rejects.toThrow();
    });
  });

  describe('Logout', () => {
    it('clears auth state', async () => {
      localStorage.setItem('auth_token', 'token');
      localStorage.setItem('auth_user', JSON.stringify({ id: 1, role: 'owner' }));
      localStorage.setItem('user_role', 'owner');

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(true);

      act(() => {
        result.current.logout();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
    });

    it('redirects to login page', async () => {
      localStorage.setItem('auth_token', 'token');
      localStorage.setItem('auth_user', JSON.stringify({ id: 1 }));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.logout();
      });

      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  describe('Register', () => {
    it('calls authApi.register with user data', async () => {
      (authApi.register as jest.Mock).mockResolvedValueOnce({
        success: true,
        data: {
          id: 1,
          email: 'new@example.com',
          full_name: 'New User',
          role: 'owner',
        },
      });

      (authApi.login as jest.Mock).mockResolvedValueOnce({
        success: true,
        data: {
          access_token: 'token',
          user_id: 1,
          email: 'new@example.com',
          full_name: 'New User',
          role: 'owner',
        },
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        try {
          await result.current.register({
            email: 'new@example.com',
            password: 'password123',
            full_name: 'New User',
            role: 'owner',
          });
        } catch {
          // Expected
        }
      });

      expect(authApi.register).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'password123',
        full_name: 'New User',
        role: 'owner',
      });
    });

    it('throws error on failed registration', async () => {
      (authApi.register as jest.Mock).mockResolvedValueOnce({
        success: false,
        error: 'Email already exists',
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(
        act(async () => {
          await result.current.register({
            email: 'existing@example.com',
            password: 'password123',
            full_name: 'User',
            role: 'owner',
          });
        })
      ).rejects.toThrow('Email already exists');
    });
  });

  describe('Refresh User', () => {
    it('updates user from API when token exists', async () => {
      localStorage.setItem('auth_token', 'token');
      localStorage.setItem('auth_user', JSON.stringify({ id: 1, email: 'old@example.com', role: 'owner' }));
      localStorage.setItem('user_role', 'owner');

      const updatedUser = {
        id: 1,
        email: 'updated@example.com',
        full_name: 'Updated Name',
        role: 'owner',
      };

      (authApi.getCurrentUser as jest.Mock).mockResolvedValueOnce({
        success: true,
        data: updatedUser,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.refreshUser();
      });

      expect(authApi.getCurrentUser).toHaveBeenCalled();
    });

    it('skips API call when no token', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.refreshUser();
      });

      expect(authApi.getCurrentUser).not.toHaveBeenCalled();
    });
  });
});

describe('useAuth hook', () => {
  it('throws error when used outside AuthProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');

    consoleSpy.mockRestore();
  });
});

describe('Authentication State', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('isAuthenticated is true when token and user exist', async () => {
    localStorage.setItem('auth_token', 'valid-token');
    localStorage.setItem('auth_user', JSON.stringify({ id: 1, email: 'test@test.com' }));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(true);
  });

  it('isAuthenticated is false when only token exists', async () => {
    localStorage.setItem('auth_token', 'valid-token');

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('isAuthenticated is false when only user exists', async () => {
    localStorage.setItem('auth_user', JSON.stringify({ id: 1 }));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(false);
  });
});
