import React from "react"
import { cn } from "@/lib/utils"

interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function PageContainer({ children, className, ...props }: PageContainerProps) {
  return (
    <main className={cn("flex-1 overflow-y-auto p-6", className)} {...props}>
      <div className="w-full mx-auto max-w-[1440px]">
        {children}
      </div>
    </main>
  )
}
