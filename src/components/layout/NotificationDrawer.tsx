import { CreditCard, WarningCircle, CheckCircle, Truck, ShieldCheck, Check } from "@phosphor-icons/react"
import { useAppStore } from "@/lib/store"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export function NotificationDrawer() {
  const { isNotificationDrawerOpen, toggleNotificationDrawer } = useAppStore()

  const groupedNotifications = [
    {
      date: "Today",
      items: [
        { id: 1, title: "New Dispute Opened", description: "A dispute was opened for Deal #8902.", time: "10m ago", icon: <WarningCircle weight="fill" className="h-[18px] w-[18px] text-destructive" />, unread: true },
        { id: 2, title: "Buyer Escalated Dispute", description: "Buyer has escalated dispute DSP-2040 to admins.", time: "2h ago", icon: <WarningCircle weight="fill" className="h-[18px] w-[18px] text-destructive" />, unread: true },
        { id: 3, title: "Refund Completed", description: "Refund for Deal #9012 processed successfully.", time: "4h ago", icon: <CreditCard weight="fill" className="h-[18px] w-[18px] text-success" />, unread: false },
      ]
    },
    {
      date: "Yesterday",
      items: [
        { id: 4, title: "Deal Completed", description: "Deal DL-9041 has been completed successfully.", time: "1d ago", icon: <CheckCircle weight="fill" className="h-[18px] w-[18px] text-success" />, unread: false },
        { id: 5, title: "Seller Uploaded Tracking", description: "Seller added tracking for Deal DL-9045.", time: "1d ago", icon: <Truck weight="fill" className="h-[18px] w-[18px] text-primary" />, unread: false },
      ]
    },
    {
      date: "Earlier",
      items: [
        { id: 6, title: "Admin Resolved Dispute", description: "Dispute DSP-2035 was resolved in favor of the buyer.", time: "3d ago", icon: <ShieldCheck weight="fill" className="h-[18px] w-[18px] text-muted-foreground" />, unread: false },
      ]
    }
  ]

  return (
    <Sheet open={isNotificationDrawerOpen} onOpenChange={toggleNotificationDrawer}>
      <SheetContent className="w-[400px] sm:w-[460px] p-0 border-l border-border/50 shadow-xl bg-background flex flex-col">
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <SheetTitle className="text-[20px] font-bold text-[#0F172A]">Notifications</SheetTitle>
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-[11px]">
              2
            </span>
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          {groupedNotifications.map((group, groupIdx) => (
            <div key={group.date} className="mb-4">
              <div className="px-6 pb-3 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold text-gray-700">{group.date}</h3>
                  {groupIdx === 0 && (
                    <button className="flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline outline-none">
                      <Check weight="bold" className="h-3.5 w-3.5" />
                      Mark all as read
                    </button>
                  )}
                </div>
              </div>
              
              <div className="px-6 flex flex-col gap-3">
                {group.items.map((notif) => (
                  <div
                    key={notif.id}
                    className="flex gap-4 p-4 bg-white border border-[#EEF2F7] rounded-[14px] shadow-[0_2px_10px_rgba(15,23,42,0.04)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.08)] hover:-translate-y-[1px] transition-all duration-[180ms] ease-in-out cursor-pointer group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F8FAFC] border border-[#EEF2F7]">
                      {notif.icon}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-[14px] font-medium leading-tight ${notif.unread ? "text-[#0F172A]" : "text-[#475569]"}`}>
                          {notif.title}
                        </p>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="text-[12px] font-medium text-muted-foreground/80">{notif.time}</span>
                          {notif.unread && (
                            <div className="h-2 w-2 rounded-full bg-[#2553FF] shadow-[0_0_8px_rgba(37,83,255,0.4)]" />
                          )}
                        </div>
                      </div>
                      <p className="text-[13px] font-normal text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed pr-6">{notif.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
