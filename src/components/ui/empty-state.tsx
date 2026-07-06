import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[160px] flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/10 p-6 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-muted/30 text-muted-foreground mb-3">
          {icon}
        </div>
      )}
      <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1.5 text-[13px] text-muted-foreground max-w-sm mx-auto">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

