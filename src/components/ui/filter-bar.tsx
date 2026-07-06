import * as React from "react"
import { cn } from "@/lib/utils"
import { FunnelSimple } from "@phosphor-icons/react"
import { Button } from "./button"

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  onReset?: () => void
}

export function FilterBar({ children, onReset, className, ...props }: FilterBarProps) {
  return (
    <div 
      className={cn("flex flex-wrap items-center gap-3 p-1 rounded-xl bg-card border border-border/50 shadow-sm", className)} 
      {...props}
    >
      <div className="flex items-center justify-center pl-3 pr-2 text-muted-foreground">
        <FunnelSimple weight="bold" className="h-4 w-4" />
      </div>
      
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {children}
      </div>

      {onReset && (
        <div className="pr-1 pl-2 border-l border-border/50">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onReset}
            className="h-8 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}
