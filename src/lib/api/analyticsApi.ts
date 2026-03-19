import apiClient from './client';
import { ApiResponse } from '../types';

// ── Types matching StatisticsService inner classes exactly ────────────────────

export interface OverviewKpi {
  todayCheckIns:      number;
  todayCheckOuts:     number;
  pendingBookings:    number;
  confirmedBookings:  number;
  monthlyRevenue:     number;
  monthlyExpenses:    number;
  lowStockItems:      number;
  totalCustomers:     number;
  occupancyRate:      number;
  revenueGrowth:      number;
}

export interface OccupancyStats {
  from:           string;
  to:             string;
  overallRate:    number;
  byAssetType:    { assetType: string; rate: number }[];
}

export interface MonthlyRevenueStat {
  month:    string;   // e.g. "2025-01"
  revenue:  number;
  expenses: number;
  profit:   number;
}

export interface RevenueBySource {
  source:  string;   // "BOOKING" | "FOOD_SERVICE" | "OTHER"
  amount:  number;
  percentage: number;
}

export interface ServicePopularityStat {
  assetType:   string;
  assetName:   string;
  bookings:    number;
  revenue:     number;
  percentage:  number;
}

export interface CustomerActivitySummary {
  totalCustomers:    number;
  newCustomers:      number;
  returningCustomers: number;
  loyalCustomers:    number;
}

export const analyticsApi = {

  // GET /api/v1/analytics/overview
  getOverviewKpis: async (): Promise<OverviewKpi> => {
    const { data } = await apiClient.get<ApiResponse<OverviewKpi>>('/analytics/overview');
    return data.data;
  },

  // GET /api/v1/analytics/occupancy?from=&to=
  getOccupancy: async (from: string, to: string): Promise<OccupancyStats> => {
    const { data } = await apiClient.get<ApiResponse<OccupancyStats>>('/analytics/occupancy', {
      params: { from, to },
    });
    return data.data;
  },

  // GET /api/v1/analytics/revenue/monthly?year=
  getMonthlyRevenue: async (year?: number): Promise<MonthlyRevenueStat[]> => {
    const { data } = await apiClient.get<ApiResponse<MonthlyRevenueStat[]>>('/analytics/revenue/monthly', {
      params: year ? { year } : {},
    });
    return data.data;
  },

  // GET /api/v1/analytics/revenue/by-source?from=&to=
  getRevenueBySource: async (from: string, to: string): Promise<RevenueBySource[]> => {
    const { data } = await apiClient.get<ApiResponse<RevenueBySource[]>>('/analytics/revenue/by-source', {
      params: { from, to },
    });
    return data.data;
  },

  // GET /api/v1/analytics/services/popularity?from=&to=
  getServicePopularity: async (from: string, to: string): Promise<ServicePopularityStat[]> => {
    const { data } = await apiClient.get<ApiResponse<ServicePopularityStat[]>>('/analytics/services/popularity', {
      params: { from, to },
    });
    return data.data;
  },

  // GET /api/v1/analytics/customers?from=&to=
  getCustomerActivity: async (from: string, to: string): Promise<CustomerActivitySummary> => {
    const { data } = await apiClient.get<ApiResponse<CustomerActivitySummary>>('/analytics/customers', {
      params: { from, to },
    });
    return data.data;
  },
};