import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "@phosphor-icons/react"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  trend?: number
  trendLabel?: string
  icon?: React.ReactNode
  iconContainerClassName?: string
}

export function StatCard({
  title,
  value,
  trend,
  trendLabel,
  icon,
  className,
  iconContainerClassName,
  ...props
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden border-border/50 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 min-h-[114px] flex flex-col justify-center", className)} {...props}>
      <CardContent className="p-6 flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground mb-2">{title}</p>
          <h3 className="text-[24px] font-bold tracking-tight text-[#111827] leading-none">{value}</h3>
          {(trend !== undefined || trendLabel) && (
            <div className="mt-2 flex items-center gap-1.5 text-[13px] font-normal">
              {trend !== undefined && (
                <span
                  className={cn(
                    "flex items-center gap-0.5 font-bold",
                    trend > 0 ? "text-success" : trend < 0 ? "text-destructive" : "text-muted-foreground"
                  )}
                >
                  {trend > 0 ? <ArrowUpRight weight="bold" /> : trend < 0 ? <ArrowDownRight weight="bold" /> : null}
                  {Math.abs(trend)}%
                </span>
              )}
              {trendLabel && <span className="text-muted-foreground">{trendLabel}</span>}
            </div>
          )}
        </div>
        
        {icon && (
          <div className={cn("flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] bg-muted/50 text-muted-foreground", iconContainerClassName)}>
            {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: cn("h-5 w-5", (icon as React.ReactElement<any>).props.className) }) : icon}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


