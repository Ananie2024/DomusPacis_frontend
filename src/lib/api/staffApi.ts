import apiClient from './client';
import { ApiResponse, PaginatedResponse, Employee, EmployeeRole, WorkSchedule, PayrollRecord } from '../types';

export const staffApi = {
  getEmployees: async (params?: { search?: string; department?: string; page?: number; size?: number }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Employee>>>('/admin/staff', { params });
    return data.data;
  },

  getEmployeeById: async (id: string): Promise<Employee> => {
    const { data } = await apiClient.get<ApiResponse<Employee>>(`/admin/staff/${id}`);
    return data.data;
  },

  createEmployee: async (employee: Partial<Employee>): Promise<Employee> => {
    const { data } = await apiClient.post<ApiResponse<Employee>>('/admin/staff', employee);
    return data.data;
  },

  updateEmployee: async (id: string, employee: Partial<Employee>): Promise<Employee> => {
    const { data } = await apiClient.put<ApiResponse<Employee>>(`/admin/staff/${id}`, employee);
    return data.data;
  },

  deactivateEmployee: async (id: string): Promise<void> => {
    await apiClient.patch(`/admin/staff/${id}/deactivate`);
  },

  // Roles
  getRoles: async (): Promise<EmployeeRole[]> => {
    const { data } = await apiClient.get<ApiResponse<EmployeeRole[]>>('/admin/staff/roles');
    return data.data;
  },

  createRole: async (role: Partial<EmployeeRole>): Promise<EmployeeRole> => {
    const { data } = await apiClient.post<ApiResponse<EmployeeRole>>('/admin/staff/roles', role);
    return data.data;
  },

  // Schedules
  getSchedules: async (params?: { employeeId?: string; startDate?: string; endDate?: string }) => {
    const { data } = await apiClient.get<ApiResponse<WorkSchedule[]>>('/admin/staff/schedules', { params });
    return data.data;
  },

  createSchedule: async (schedule: Partial<WorkSchedule>): Promise<WorkSchedule> => {
    const { data } = await apiClient.post<ApiResponse<WorkSchedule>>('/admin/staff/schedules', schedule);
    return data.data;
  },

  updateSchedule: async (id: string, schedule: Partial<WorkSchedule>): Promise<WorkSchedule> => {
    const { data } = await apiClient.put<ApiResponse<WorkSchedule>>(`/admin/staff/schedules/${id}`, schedule);
    return data.data;
  },

  deleteSchedule: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/staff/schedules/${id}`);
  },

  // Payroll
  getPayrollRecords: async (params?: { period?: string; employeeId?: string; page?: number; size?: number }) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<PayrollRecord>>>('/admin/staff/payroll', { params });
    return data.data;
  },

  processPayroll: async (period: string): Promise<PayrollRecord[]> => {
    const { data } = await apiClient.post<ApiResponse<PayrollRecord[]>>('/admin/staff/payroll/process', { period });
    return data.data;
  },
};
