import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/lib/constants";
import type { Permission } from "@/types";

export const adminPermissionsService = {
  list: async (): Promise<Permission[]> => {
    const res = await httpService.get<Permission[]>(
      API_CONFIG.ADMIN_PERMISSIONS.LIST
    );
    return res.data;
  },
};
