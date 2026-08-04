import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/lib/constants";
import type { User, PaginatedResponse } from "@/types";

export const adminCustomersService = {
  list: async (
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<PaginatedResponse<User>> => {
    const res = await httpService.get<PaginatedResponse<User>>(
      API_CONFIG.CUSTOMERS.LIST,
      {
        params: { page, limit, search },
      }
    );
    return res.data;
  },

  getById: async (id: string): Promise<User> => {
    const res = await httpService.get<User>(
      API_CONFIG.CUSTOMERS.BY_ID(id)
    );
    return res.data;
  },

  deactivate: async (id: string): Promise<User> => {
    const res = await httpService.patch<User>(
      API_CONFIG.CUSTOMERS.DEACTIVATE(id)
    );
    return res.data;
  },

  activate: async (id: string): Promise<User> => {
    const res = await httpService.patch<User>(
      API_CONFIG.CUSTOMERS.ACTIVATE(id)
    );
    return res.data;
  },
};
