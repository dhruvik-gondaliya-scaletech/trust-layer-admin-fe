import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/lib/constants";
import type {
  AdminRole,
  CreateAdminRoleDto,
  UpdateAdminRoleDto,
  PaginatedResponse,
} from "@/types";

export const adminRolesService = {
  create: async (dto: CreateAdminRoleDto): Promise<AdminRole> => {
    const res = await httpService.post<AdminRole>(
      API_CONFIG.ADMIN_ROLES.CREATE,
      dto
    );
    return res.data;
  },

  list: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<AdminRole>> => {
    const res = await httpService.get<PaginatedResponse<AdminRole>>(
      API_CONFIG.ADMIN_ROLES.LIST,
      {
        params: { page, limit },
      }
    );
    return res.data;
  },

  getById: async (id: string): Promise<AdminRole> => {
    const res = await httpService.get<AdminRole>(
      API_CONFIG.ADMIN_ROLES.BY_ID(id)
    );
    return res.data;
  },

  update: async (id: string, dto: UpdateAdminRoleDto): Promise<AdminRole> => {
    const res = await httpService.patch<AdminRole>(
      API_CONFIG.ADMIN_ROLES.UPDATE(id),
      dto
    );
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await httpService.delete<void>(API_CONFIG.ADMIN_ROLES.DELETE(id));
  },
};
