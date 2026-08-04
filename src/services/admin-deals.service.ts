import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/lib/constants";
import type { Deal, PaginatedResponse, DealStatus } from "@/types";

export const adminDealsService = {
  list: async (
    page: number = 1,
    limit: number = 10,
    status?: DealStatus,
    search?: string
  ): Promise<PaginatedResponse<Deal>> => {
    const res = await httpService.get<PaginatedResponse<Deal>>(
      API_CONFIG.DEALS.LIST,
      {
        params: { page, limit, status, search },
      }
    );
    return res.data;
  },

  getById: async (id: string): Promise<Deal> => {
    const res = await httpService.get<Deal>(
      API_CONFIG.DEALS.BY_ID(id)
    );
    return res.data;
  },
};
