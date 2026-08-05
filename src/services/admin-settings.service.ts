import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/lib/constants";
import type { PlatformSetting, UpsertPlatformSettingDto } from "@/types";

export const adminSettingsService = {
  list: async (): Promise<PlatformSetting[]> => {
    const res = await httpService.get<PlatformSetting[]>(
      API_CONFIG.ADMIN_SETTINGS.LIST
    );
    return res.data;
  },

  upsert: async (
    key: string,
    dto: UpsertPlatformSettingDto
  ): Promise<PlatformSetting> => {
    const res = await httpService.patch<PlatformSetting>(
      API_CONFIG.ADMIN_SETTINGS.UPSERT(key),
      dto
    );
    return res.data;
  },
};
