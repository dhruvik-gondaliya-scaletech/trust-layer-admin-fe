import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/lib/constants";
import type { AdminLoginDto, AdminLoginResponse } from "@/types";

export const authService = {
  login: async (dto: AdminLoginDto): Promise<AdminLoginResponse> => {
    const res = await httpService.post<AdminLoginResponse>(API_CONFIG.AUTH.LOGIN, dto);
    return res.data;
  },
};
