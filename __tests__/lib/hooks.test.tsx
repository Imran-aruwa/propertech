/**
 * Tests for Custom Hooks
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { usePagination, useToast, useForm, useDebounce } from '@/app/lib/hooks';

describe('usePagination', () => {
  it('initializes with correct values', () => {
    const { result } = renderHook(() => usePagination(100, 10));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(10);
    expect(result.current.startIndex).toBe(0);
    expect(result.current.endIndex).toBe(10);
    expect(result.current.hasNext).toBe(true);
    expect(result.current.hasPrev).toBe(false);
  });

  it('calculates total pages correctly', () => {
    const { result: result1 } = renderHook(() => usePagination(25, 10));
    expect(result1.current.totalPages).toBe(3);

    const { result: result2 } = renderHook(() => usePagination(20, 10));
    expect(result2.current.totalPages).toBe(2);

    const { result: result3 } = renderHook(() => usePagination(5, 10));
    expect(result3.current.totalPages).toBe(1);
  });

  it('navigates to next page', () => {
    const { result } = renderHook(() => usePagination(30, 10));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.startIndex).toBe(10);
    expect(result.current.endIndex).toBe(20);
    expect(result.current.hasPrev).toBe(true);
  });

  it('navigates to previous page', () => {
    const { result } = renderHook(() => usePagination(30, 10));

    act(() => {
      result.current.goToPage(3);
    });

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(2);
  });

  it('does not go beyond total pages', () => {
    const { result } = renderHook(() => usePagination(20, 10));

    act(() => {
      result.current.goToPage(2);
    });

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.hasNext).toBe(false);
  });

  it('does not go below page 1', () => {
    const { result } = renderHook(() => usePagination(20, 10));

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('goToPage works correctly', () => {
    const { result } = renderHook(() => usePagination(50, 10));

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.startIndex).toBe(20);
    expect(result.current.endIndex).toBe(30);
  });

  it('ignores invalid page numbers', () => {
    const { result } = renderHook(() => usePagination(50, 10));

    act(() => {
      result.current.goToPage(0);
    });
    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.goToPage(10);
    });
    expect(result.current.currentPage).toBe(1);
  });
});

describe('useToast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initializes with empty toasts array', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);
  });

  it('adds success toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.success('Operation successful');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toBe('Operation successful');
    expect(result.current.toasts[0].type).toBe('success');
  });

  it('adds error toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.error('Something went wrong');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].type).toBe('error');
  });

  it('adds info toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.info('Information message');
    });

    expect(result.current.toasts[0].type).toBe('info');
  });

  it('adds warning toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.warning('Warning message');
    });

    expect(result.current.toasts[0].type).toBe('warning');
  });

  it('removes toast manually', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.success('Test message');
    });

    const toastId = result.current.toasts[0].id;

    act(() => {
      result.current.removeToast(toastId);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('auto-removes toast after 5 seconds', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.success('Auto-remove test');
    });

    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('handles multiple toasts', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.success('First');
      result.current.error('Second');
      result.current.info('Third');
    });

    expect(result.current.toasts).toHaveLength(3);
  });
});

describe('useForm', () => {
  const initialValues = {
    email: '',
    password: '',
    name: '',
  };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<typeof initialValues> = {};
    if (!values.email) errors.email = 'Email is required';
    if (!values.password) errors.password = 'Password is required';
    if (values.password && values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  it('initializes with initial values', () => {
    const { result } = renderHook(() => useForm(initialValues));

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });

  it('updates values on handleChange', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleChange('email', 'test@example.com');
    });

    expect(result.current.values.email).toBe('test@example.com');
  });

  it('marks field as touched on handleBlur', () => {
    const { result } = renderHook(() => useForm(initialValues, validate));

    act(() => {
      result.current.handleBlur('email');
    });

    expect(result.current.touched.email).toBe(true);
  });

  it('validates on blur when field is touched', () => {
    const { result } = renderHook(() => useForm(initialValues, validate));

    act(() => {
      result.current.handleBlur('email');
    });

    expect(result.current.errors.email).toBe('Email is required');
  });

  it('validates on change after field is touched', () => {
    const { result } = renderHook(() => useForm(initialValues, validate));

    // Touch the field first
    act(() => {
      result.current.handleBlur('password');
    });

    // Then change it
    act(() => {
      result.current.handleChange('password', '123');
    });

    expect(result.current.errors.password).toBe('Password must be at least 6 characters');
  });

  it('clears error when valid value is entered', () => {
    const { result } = renderHook(() => useForm(initialValues, validate));

    act(() => {
      result.current.handleBlur('email');
    });

    expect(result.current.errors.email).toBe('Email is required');

    act(() => {
      result.current.handleChange('email', 'valid@email.com');
    });

    expect(result.current.errors.email).toBeUndefined();
  });

  it('resets form to initial values', () => {
    const { result } = renderHook(() => useForm(initialValues, validate));

    act(() => {
      result.current.handleChange('email', 'test@example.com');
      result.current.handleChange('password', 'password123');
      result.current.handleBlur('email');
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });

  it('setValues updates multiple values', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.setValues({
        email: 'new@email.com',
        password: 'newpassword',
        name: 'New Name',
      });
    });

    expect(result.current.values.email).toBe('new@email.com');
    expect(result.current.values.password).toBe('newpassword');
    expect(result.current.values.name).toBe('New Name');
  });
});

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('debounces value updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });

    // Value should still be initial
    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now it should be updated
    expect(result.current).toBe('updated');
  });

  it('resets timer on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'a' } }
    );

    rerender({ value: 'b' });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 'c' });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 'd' });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Should still be 'a' because timer keeps resetting
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now should be 'd' (final value)
    expect(result.current).toBe('d');
  });

  it('uses custom delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('works with objects', () => {
    const initial = { name: 'John' };
    const updated = { name: 'Jane' };

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: initial } }
    );

    rerender({ value: updated });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toEqual(updated);
  });
});
