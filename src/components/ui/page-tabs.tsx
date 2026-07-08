import { cn } from "@/lib/utils"

export interface PageTab {
  id: string
  label: string
  count?: number
}

interface PageTabsProps {
  tabs: PageTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function PageTabs({ tabs, activeTab, onTabChange, className }: PageTabsProps) {
  return (
    <div className={cn("w-full border-b border-[#EEF2F7] pb-3 lg:pb-4", className)}>
      <div className="flex w-full overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 w-max min-w-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center justify-center h-[40px] lg:h-[42px] px-[16px] lg:px-[18px] text-[14px] font-semibold rounded-[12px] transition-all duration-200 outline-none whitespace-nowrap",
                  isActive
                    ? "bg-[#2553FF] text-white shadow-sm"
                    : "bg-transparent text-[#475569] hover:bg-[#EEF4FF]"
                )}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      "ml-2 flex items-center justify-center px-2 py-0.5 rounded-full text-[12px] font-bold transition-colors",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#EEF2F7] text-[#64748B]"
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
