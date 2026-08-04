import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/lib/constants";
import type {
  AdminUser,
  CreateAdminUserDto,
  UpdateAdminUserDto,
  PaginatedResponse,
} from "@/types";

export const adminUsersService = {
  create: async (dto: CreateAdminUserDto): Promise<AdminUser> => {
    const res = await httpService.post<AdminUser>(
      API_CONFIG.ADMIN_USERS.CREATE,
      dto
    );
    return res.data;
  },

  list: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<AdminUser>> => {
    const res = await httpService.get<PaginatedResponse<AdminUser>>(
      API_CONFIG.ADMIN_USERS.LIST,
      {
        params: { page, limit },
      }
    );
    return res.data;
  },

  getById: async (id: string): Promise<AdminUser> => {
    const res = await httpService.get<AdminUser>(
      API_CONFIG.ADMIN_USERS.BY_ID(id)
    );
    return res.data;
  },

  update: async (id: string, dto: UpdateAdminUserDto): Promise<AdminUser> => {
    const res = await httpService.patch<AdminUser>(
      API_CONFIG.ADMIN_USERS.UPDATE(id),
      dto
    );
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await httpService.delete<void>(API_CONFIG.ADMIN_USERS.DELETE(id));
  },
};
