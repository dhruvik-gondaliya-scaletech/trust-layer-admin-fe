import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
}

export function SectionHeader({ title, description, action, className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6", className)} {...props}>
      <div className="space-y-1">
        <h2 className="text-lg font-bold tracking-tight text-foreground">{title}</h2>
        {description && <p className="text-sm font-medium text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
