import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { NotificationDrawer } from "./NotificationDrawer"
import { Toaster } from "@/components/ui/toaster"

export function AppLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>

      <NotificationDrawer />
      <Toaster />
    </div>
  )
}
