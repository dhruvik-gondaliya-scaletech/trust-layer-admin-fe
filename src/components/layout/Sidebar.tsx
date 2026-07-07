import { Link, useLocation } from "react-router-dom"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import {
  SquaresFour,
  Users,
  Briefcase,
  ChartLineUp,
  WarningCircle,
  CaretLeft,
  CaretRight,
  SignOut,
  IdentificationCard,
} from "@phosphor-icons/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navGroups = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/", icon: SquaresFour },
      { name: "Deals", href: "/deals", icon: Briefcase },
      { name: "Transactions", href: "/transactions", icon: ChartLineUp },
    ]
  },
  {
    title: "Operations",
    items: [
      { name: "Users", href: "/users", icon: Users },
      { name: "Disputes", href: "/disputes", icon: WarningCircle },
      { name: "Admin Users", href: "/admin-users", icon: IdentificationCard },
    ]
  }
]

interface SidebarProps {
  onLogoutClick?: () => void
}

export function Sidebar({ onLogoutClick }: SidebarProps) {
  const { isSidebarCollapsed, toggleSidebar } = useAppStore()
  const location = useLocation()

  return (
    <div
      className={cn(
        "relative z-[100] flex h-screen flex-col border-r border-border/50 bg-card transition-all duration-300",
        isSidebarCollapsed ? "w-[88px]" : "w-[280px]"
      )}
    >
      <div className="flex h-[72px] shrink-0 items-center justify-center border-b border-border/50 px-6">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <span className="font-bold text-lg">TL</span>
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground">
                TrustLayer
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Operations
              </span>
            </div>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-[20px] z-[100] h-8 w-8 rounded-full border border-border/50 bg-white shadow-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300 hover:scale-110"
        onClick={toggleSidebar}
      >
        {isSidebarCollapsed ? (
          <CaretRight weight="bold" className="h-4 w-4" />
        ) : (
          <CaretLeft weight="bold" className="h-4 w-4" />
        )}
      </Button>

      <div className="flex-1 flex flex-col pt-6 pb-8 overflow-y-auto overflow-x-hidden no-scrollbar">
        <nav className="space-y-8 px-4">
          <TooltipProvider delayDuration={0}>
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-1">
                {!isSidebarCollapsed && (
                  <h4 className="px-4 mb-3 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#94A3B8]">
                    {group.title}
                  </h4>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    // Check if current route matches this item or is a sub-route of this item
                    const isActive = location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))
                    const NavLink = (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "group relative flex items-center gap-4 rounded-2xl px-4 py-3 text-[14px] font-medium transition-all duration-200 outline-none",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "text-[#64748B] hover:bg-muted/50 hover:text-[#334155]"
                        )}
                      >
                        <item.icon 
                          weight={isActive ? "fill" : "regular"} 
                          className={cn(
                            "h-[22px] w-[22px] shrink-0 transition-colors", 
                            isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                          )} 
                        />
                        {!isSidebarCollapsed && <span>{item.name}</span>}
                      </Link>
                    )

                    if (isSidebarCollapsed) {
                      return (
                        <Tooltip key={item.name}>
                          <TooltipTrigger asChild>{NavLink}</TooltipTrigger>
                          <TooltipContent side="right" className="rounded-xl px-4 py-2 font-semibold shadow-lg border-0">
                            {item.name}
                          </TooltipContent>
                        </Tooltip>
                      )
                    }
                    return NavLink
                  })}
                </div>
              </div>
            ))}
          </TooltipProvider>
        </nav>
      </div>

      <div className="border-t border-border/50 p-6 space-y-6 bg-muted/20 shrink-0">
        {!isSidebarCollapsed && (
          <div className="flex items-center gap-2 px-2 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-success/10 text-success rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              v2.4.0 Production
            </div>
          </div>
        )}
        
        <div className={cn("flex items-center gap-3", isSidebarCollapsed && "justify-center")}>
          <Avatar className="h-11 w-11 border-2 border-background shadow-sm">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">EM</AvatarFallback>
          </Avatar>
          {!isSidebarCollapsed && (
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-[14px] font-bold text-foreground">Eric Mills</span>
              <span className="truncate text-[12px] font-medium text-muted-foreground">Super Admin</span>
            </div>
          )}
          {!isSidebarCollapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-full shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={onLogoutClick}
            >
              <SignOut weight="bold" className="h-[18px] w-[18px]" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
