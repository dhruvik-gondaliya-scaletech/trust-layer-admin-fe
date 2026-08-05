import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/lib/constants";
import type {
  DealTier,
  CreateDealTierDto,
  UpdateDealTierDto,
} from "@/types";

export const adminDealTiersService = {
  list: async (): Promise<DealTier[]> => {
    const res = await httpService.get<DealTier[]>(
      API_CONFIG.ADMIN_DEAL_TIERS.LIST
    );
    return res.data;
  },

  getById: async (id: string): Promise<DealTier> => {
    const res = await httpService.get<DealTier>(
      API_CONFIG.ADMIN_DEAL_TIERS.BY_ID(id)
    );
    return res.data;
  },

  create: async (dto: CreateDealTierDto): Promise<DealTier> => {
    const res = await httpService.post<DealTier>(
      API_CONFIG.ADMIN_DEAL_TIERS.CREATE,
      dto
    );
    return res.data;
  },

  update: async (id: string, dto: UpdateDealTierDto): Promise<DealTier> => {
    const res = await httpService.patch<DealTier>(
      API_CONFIG.ADMIN_DEAL_TIERS.UPDATE(id),
      dto
    );
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await httpService.delete<void>(API_CONFIG.ADMIN_DEAL_TIERS.DELETE(id));
  },
};
