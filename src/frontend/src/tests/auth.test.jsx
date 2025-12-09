import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginService, registerService, logoutService } from '../services/authService';
import api from '../services/api';

// Mock the API module
vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('Auth Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should login successfully', async () => {
    const mockResponse = {
      status: 200,
      data: {
        access: 'access-token',
        refresh: 'refresh-token',
        user: { id: 1, email: 'test@example.com' },
      },
    };
    api.post.mockResolvedValue(mockResponse);

    const result = await loginService('test@example.com', 'password');

    expect(api.post).toHaveBeenCalledWith('/auth/login/', {
      email: 'test@example.com',
      password: 'password',
    });
    expect(result.ok).toBe(true);
    expect(result.access).toBe('access-token');
    expect(result.user.email).toBe('test@example.com');
  });

  it('should handle login failure', async () => {
    const mockError = {
      response: {
        status: 401,
        data: { detail: 'Invalid credentials' },
      },
    };
    api.post.mockRejectedValue(mockError);

    const result = await loginService('test@example.com', 'wrongpassword');

    expect(result.ok).toBe(false);
    expect(result.error).toEqual({ detail: 'Invalid credentials' });
  });

  it('should register successfully', async () => {
    const mockResponse = {
      status: 201,
      data: { message: 'User created' },
    };
    api.post.mockResolvedValue(mockResponse);

    const data = { email: 'new@example.com', password: 'pw' };
    const result = await registerService(data);

    expect(api.post).toHaveBeenCalledWith('/auth/register/', data);
    expect(result.ok).toBe(true);
  });

  it('should logout correctly', async () => {
    const result = await logoutService();
    expect(result.ok).toBe(true);
    // Verify localStorage interaction if possible, or just trust the function logic
  });
});
