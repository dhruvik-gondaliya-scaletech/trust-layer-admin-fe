import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/lib/constants";
import type { Transaction, PaginatedResponse, TransactionType } from "@/types";

export const adminTransactionsService = {
  list: async (
    page: number = 1,
    limit: number = 10,
    type?: TransactionType,
    userId?: string,
    dealId?: string
  ): Promise<PaginatedResponse<Transaction>> => {
    const res = await httpService.get<PaginatedResponse<Transaction>>(
      API_CONFIG.TRANSACTIONS.LIST,
      {
        params: { page, limit, type, userId, dealId },
      }
    );
    return res.data;
  },

  getById: async (id: string): Promise<Transaction> => {
    const res = await httpService.get<Transaction>(
      API_CONFIG.TRANSACTIONS.BY_ID(id)
    );
    return res.data;
  },
};
