import { useQuery } from "@tanstack/react-query"
import { SettingsApi } from "../apis/settingsApi"

// Query keys
export const settingsQueryKeys = {
  all: ["settings"] as const,
  byKey: (key: string) => [...settingsQueryKeys.all, "by-key", key] as const,
}

// Hook to get settings by key/slug
export const useSettingsByKey = (slug: string) => {
  return useQuery({
    queryKey: settingsQueryKeys.byKey(slug),
    queryFn: () => SettingsApi.getByKey(slug),
    enabled: !!slug, // Only run query if slug exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
