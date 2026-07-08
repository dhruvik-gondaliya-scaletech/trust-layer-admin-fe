import React from "react"
import { cn } from "@/lib/utils"

interface ContentGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ContentGrid({ children, className, ...props }: ContentGridProps) {
  return (
    <div className={cn("space-y-8", className)} {...props}>
      {children}
    </div>
  )
}
