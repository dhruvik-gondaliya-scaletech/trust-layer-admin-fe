import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/lib/constants";
import type { Dispute, PaginatedResponse, DisputeStatus, ResolveDisputeDto } from "@/types";

export const adminDisputesService = {
  list: async (
    page: number = 1,
    limit: number = 10,
    status?: DisputeStatus
  ): Promise<PaginatedResponse<Dispute>> => {
    const res = await httpService.get<PaginatedResponse<Dispute>>(
      API_CONFIG.DISPUTES.LIST,
      {
        params: { page, limit, status },
      }
    );
    return res.data;
  },

  getById: async (id: string): Promise<Dispute> => {
    const res = await httpService.get<Dispute>(
      API_CONFIG.DISPUTES.BY_ID(id)
    );
    return res.data;
  },

  resolve: async (id: string, dto: ResolveDisputeDto): Promise<Dispute> => {
    const res = await httpService.post<Dispute>(
      API_CONFIG.DISPUTES.RESOLVE(id),
      dto
    );
    return res.data;
  },
};
