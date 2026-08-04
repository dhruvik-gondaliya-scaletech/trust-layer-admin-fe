import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/lib/constants";
import type { GetStatsResponse, GetRecentActivityResponse } from "@/types";

export const adminDashboardService = {
  getStats: async (): Promise<GetStatsResponse> => {
    const res = await httpService.get<GetStatsResponse>(
      API_CONFIG.DASHBOARD.STATS
    );
    return res.data;
  },

  getRecentActivity: async (): Promise<GetRecentActivityResponse> => {
    const res = await httpService.get<GetRecentActivityResponse>(
      API_CONFIG.DASHBOARD.RECENT_ACTIVITY
    );
    return res.data;
  },
};
