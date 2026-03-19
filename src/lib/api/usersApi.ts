import apiClient from './client';
import { ApiResponse, PaginatedResponse, UserProfile, UserRole } from '../types';

export interface AdminUser extends UserProfile {
  phone?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export interface CreateUserRequest {
  firstName:   string;
  lastName:    string;
  email:       string;
  phone?:      string;
  role:        UserRole;
  password:    string;
  sendWelcomeEmail?: boolean;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?:  string;
  email?:     string;
  phone?:     string;
  role?:      UserRole;
}

export interface UserFilters {
  search?:   string;
  role?:     UserRole | '';
  isActive?: boolean;
  page?:     number;
  size?:     number;
}

const BASE = '/auth/admin/users';

export const usersApi = {

  // GET /api/v1/auth/admin/users?search=&role=&isActive=&page=&size=
  getUsers: async (filters?: UserFilters): Promise<PaginatedResponse<AdminUser>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<AdminUser>>>(BASE, {
      params: {
        search:   filters?.search   || undefined,
        role:     filters?.role     || undefined,
        isActive: filters?.isActive ?? undefined,
        page:     filters?.page     ?? 0,
        size:     filters?.size     ?? 12,
      },
    });
    return data.data;
  },

  // POST /api/v1/auth/admin/users
  createUser: async (payload: CreateUserRequest): Promise<AdminUser> => {
    const { data } = await apiClient.post<ApiResponse<AdminUser>>(BASE, {
      email:     payload.email,
      password:  payload.password,
      firstName: payload.firstName,
      lastName:  payload.lastName,
      role:      payload.role,
    });
    return data.data;
  },

  // PUT /api/v1/auth/admin/users/{userId}
  updateUser: async (id: string, payload: UpdateUserRequest): Promise<AdminUser> => {
    const { data } = await apiClient.put<ApiResponse<AdminUser>>(`${BASE}/${id}`, payload);
    return data.data;
  },

  // PATCH /api/v1/auth/admin/users/{userId}/role?role=MANAGER
  assignRole: async (id: string, role: UserRole): Promise<AdminUser> => {
    const { data } = await apiClient.patch<ApiResponse<AdminUser>>(
      `${BASE}/${id}/role`, null, { params: { role } }
    );
    return data.data;
  },

  // DELETE /api/v1/auth/admin/users/{userId}  →  sets isActive = false
  deactivateUser: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE}/${id}`);
  },

  // PATCH /api/v1/auth/admin/users/{userId}/activate
  activateUser: async (id: string): Promise<void> => {
    await apiClient.patch(`${BASE}/${id}/activate`);
  },

  // POST /api/v1/auth/password-reset/initiate?email=...
  resetPassword: async (_id: string, email: string): Promise<{ temporaryPassword: string }> => {
    await apiClient.post('/auth/password-reset/initiate', null, { params: { email } });
    // Backend sends the reset link by email — no temp password returned
    return { temporaryPassword: '(sent to user email)' };
  },
};

