import { create } from 'zustand'

interface AppState {
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void

  isNotificationDrawerOpen: boolean
  toggleNotificationDrawer: () => void
  setNotificationDrawerOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),

  isNotificationDrawerOpen: false,
  toggleNotificationDrawer: () => set((state) => ({ isNotificationDrawerOpen: !state.isNotificationDrawerOpen })),
  setNotificationDrawerOpen: (open) => set({ isNotificationDrawerOpen: open }),
}))
