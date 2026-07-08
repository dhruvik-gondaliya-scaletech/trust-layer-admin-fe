import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { PageContainer } from "./PageContainer"
import { ContentGrid } from "./ContentGrid"
import { NotificationDrawer } from "./NotificationDrawer"
import { Toaster } from "@/components/ui/toaster"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { logout } from "@/lib/auth"

export function AppLayout() {
  const [showLogoutModal, setShowLogoutModal] = React.useState(false)
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogout = () => {
    setIsLoggingOut(true)
    setTimeout(() => {
      logout()
      setIsLoggingOut(false)
      setShowLogoutModal(false)
      navigate("/login", { replace: true })
      toast({
        title: "✓ Logged out successfully.",
        variant: "default",
      })
    }, 1000)
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar onLogoutClick={() => setShowLogoutModal(true)} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onLogoutClick={() => setShowLogoutModal(true)} />
        
        <PageContainer>
          <ContentGrid>
            <Outlet />
          </ContentGrid>
        </PageContainer>
      </div>

      <NotificationDrawer />
      <Toaster />

      {/* Logout Modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Log out?</DialogTitle>
            <DialogDescription className="text-muted-foreground pt-2 text-[14px]">
              Are you sure you want to sign out of your TrustLayer administrator account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(false)}
              disabled={isLoggingOut}
              className="flex-1 sm:flex-none border-[#E8EDF7] font-semibold h-[42px]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex-1 sm:flex-none font-semibold h-[42px] bg-[#DC2626] hover:bg-[#B91C1C]"
            >
              {isLoggingOut ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging out...
                </div>
              ) : (
                "Log Out"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
