import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, Info, Warning, WarningCircle, Circle } from "@phosphor-icons/react"

export interface TimelineItem {
  id: string | number
  title: string
  description?: string
  date: string
  type?: "default" | "success" | "info" | "warning" | "error"
}

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[]
}

export function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <div className={cn("flex flex-col space-y-0", className)} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        
        let Icon = Circle
        let iconColorClass = "text-muted-foreground bg-muted/20"
        let iconWeight: "bold" | "fill" = "bold"

        switch (item.type) {
          case "success":
            Icon = CheckCircle
            iconColorClass = "text-success bg-success/10"
            iconWeight = "fill"
            break
          case "info":
            Icon = Info
            iconColorClass = "text-info bg-info/10"
            iconWeight = "fill"
            break
          case "warning":
            Icon = Warning
            iconColorClass = "text-warning bg-warning/10"
            iconWeight = "fill"
            break
          case "error":
            Icon = WarningCircle
            iconColorClass = "text-destructive bg-destructive/10"
            iconWeight = "fill"
            break
          default:
            Icon = Circle
            iconColorClass = "text-muted-foreground bg-muted/20"
            iconWeight = "fill"
        }

        return (
          <div key={item.id} className="relative flex gap-4 pb-8">
            {!isLast && (
              <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border/60" />
            )}
            
            <div className={cn("relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/50", iconColorClass)}>
              <Icon weight={iconWeight} className="h-4 w-4" />
            </div>
            
            <div className="flex flex-col pt-1.5 gap-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-sm font-bold text-foreground">{item.title}</span>
                <span className="text-xs font-medium text-muted-foreground hidden sm:block">•</span>
                <span className="text-xs font-medium text-muted-foreground">{item.date}</span>
              </div>
              {item.description && (
                <p className="text-sm font-medium text-muted-foreground/80 mt-1">{item.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
