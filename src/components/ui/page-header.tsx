import * as React from "react"
import { cn } from "@/lib/utils"

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  breadcrumbs?: React.ReactNode
  actions?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", className)} {...props}>
      <div className="space-y-1.5">
        {breadcrumbs && <div className="mb-2 text-[13px] font-medium text-muted-foreground/80">{breadcrumbs}</div>}
        <h1 className="text-[24px] font-bold tracking-tight text-[#111827]">{title}</h1>
        {description && (
          <p className="text-[14px] font-normal text-[#64748B]">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  )
}
