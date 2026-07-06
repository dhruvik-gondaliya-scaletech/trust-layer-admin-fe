import { useState, useEffect } from "react"
import { Bell } from "@phosphor-icons/react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { toggleNotificationDrawer } = useAppStore()

  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const hour = now.getHours()
  
  let greeting = "Good Night"
  if (hour >= 5 && hour < 12) greeting = "Good Morning"
  else if (hour >= 12 && hour < 17) greeting = "Good Afternoon"
  else if (hour >= 17 && hour < 21) greeting = "Good Evening"

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })

  return (
    <header className="sticky top-0 z-30 flex h-[72px] w-full items-center justify-between bg-card px-8 border-b border-border shadow-sm">
      <div className="flex flex-1 items-center gap-4">
        <div className="hidden md:flex flex-col">
          <span className="text-[24px] font-bold tracking-tight text-[#111827] leading-none mb-1">
            {greeting}, Eric Mills
          </span>
          <span className="text-[13px] font-medium text-[#64748B]">
            {formattedDate}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-all hover:scale-105"
          onClick={toggleNotificationDrawer}
        >
          <Bell weight="bold" className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-sm ring-2 ring-card">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 overflow-hidden border shadow-sm ml-1 ring-offset-background transition-all hover:ring-2 hover:ring-ring/20 focus-visible:ring-2 focus-visible:ring-ring">
              <Avatar className="h-full w-full">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">EM</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-xl p-2" align="end" forceMount>
            <DropdownMenuLabel className="font-normal px-2 py-1.5">
              <div className="flex flex-col space-y-1">
                <p className="text-[14px] font-bold leading-none text-foreground">Eric Mills</p>
                <p className="text-[12px] font-medium leading-none text-muted-foreground">
                  admin@trustlayer.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1.5" />
            <DropdownMenuItem className="rounded-lg cursor-pointer font-medium px-3 py-2 text-[14px]">Profile</DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg cursor-pointer font-medium px-3 py-2 text-[14px]">Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="my-1.5" />
            <DropdownMenuItem className="rounded-lg cursor-pointer font-medium px-3 py-2 text-[14px] text-destructive focus:bg-destructive/10 focus:text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
