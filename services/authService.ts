import { api } from '@/lib/axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    profile_photo?: string | null;
    is_active: boolean;
  };
  token: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },

  getProfile: async (): Promise<AuthResponse['user']> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (userData: Partial<AuthResponse['user']>): Promise<AuthResponse['user']> => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },
};
