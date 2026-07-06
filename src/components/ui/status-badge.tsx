import * as React from "react"
import { cn } from "@/lib/utils"
import {
  File,
  Clock,
  User,
  CreditCard,
  Wallet,
  Shield,
  Truck,
  Package,
  CheckCircle,
  Bank,
  Star,
  WarningCircle,
  ArrowUUpLeft,
  SealCheck,
  ArrowsClockwise,
  XCircle,
  Prohibit,
  Warning,
  ShieldSlash,
} from "@phosphor-icons/react"

export type StatusType = 
  | "Draft"
  | "Pending"
  | "Waiting Buyer"
  | "Waiting Seller"
  | "Payment Pending"
  | "Funded"
  | "Protected"
  | "Tracking Added"
  | "Shipped"
  | "In Transit"
  | "Delivered"
  | "Buyer Confirmed"
  | "Funds Released"
  | "Completed"
  | "Review Pending"
  | "Disputed"
  | "Return Requested"
  | "Return Approved"
  | "Return In Transit"
  | "Refund Pending"
  | "Refunded"
  | "Cancelled"
  | "Rejected"
  | "Failed"
  | "Blocked"
  | "Verified"
  | "Unverified"
  | "completed" // for backward compatibility
  | "pending" // for backward compatibility
  | "failed" // for backward compatibility

const statusConfig: Record<string, { bg: string, text: string, icon: React.ElementType }> = {
  "Draft": { bg: "bg-[#F3F4F6]", text: "text-[#6B7280]", icon: File },
  "Pending": { bg: "bg-[#FFF7E6]", text: "text-[#D97706]", icon: Clock },
  "pending": { bg: "bg-[#FFF7E6]", text: "text-[#D97706]", icon: Clock },
  "Waiting Buyer": { bg: "bg-[#EFF6FF]", text: "text-[#2563EB]", icon: User },
  "Waiting Seller": { bg: "bg-[#EEF2FF]", text: "text-[#4F46E5]", icon: User },
  "Payment Pending": { bg: "bg-[#FFF7E6]", text: "text-[#D97706]", icon: CreditCard },
  "Funded": { bg: "bg-[#EEF6FF]", text: "text-[#2563EB]", icon: Wallet },
  "Protected": { bg: "bg-[#EEF4FF]", text: "text-[#1D4ED8]", icon: Shield },
  "Tracking Added": { bg: "bg-[#ECFDF5]", text: "text-[#059669]", icon: Truck },
  "Shipped": { bg: "bg-[#E0F2FE]", text: "text-[#0284C7]", icon: Package },
  "In Transit": { bg: "bg-[#E0F2FE]", text: "text-[#0369A1]", icon: Truck },
  "Delivered": { bg: "bg-[#ECFDF5]", text: "text-[#16A34A]", icon: CheckCircle }, // PackageCheck equivalent
  "Buyer Confirmed": { bg: "bg-[#DCFCE7]", text: "text-[#15803D]", icon: CheckCircle },
  "Funds Released": { bg: "bg-[#DCFCE7]", text: "text-[#15803D]", icon: Bank }, // Banknote equivalent
  "Completed": { bg: "bg-[#DCFCE7]", text: "text-[#15803D]", icon: CheckCircle },
  "completed": { bg: "bg-[#DCFCE7]", text: "text-[#15803D]", icon: CheckCircle },
  "Review Pending": { bg: "bg-[#FEF3C7]", text: "text-[#B45309]", icon: Star },
  "Disputed": { bg: "bg-[#FEE2E2]", text: "text-[#DC2626]", icon: WarningCircle }, // Alert Triangle equivalent
  "Return Requested": { bg: "bg-[#FCE7F3]", text: "text-[#BE185D]", icon: ArrowUUpLeft }, // Rotate CCW equivalent
  "Return Approved": { bg: "bg-[#FDF2F8]", text: "text-[#BE185D]", icon: SealCheck }, // Badge Check equivalent
  "Return In Transit": { bg: "bg-[#F5F3FF]", text: "text-[#7C3AED]", icon: Truck },
  "Refund Pending": { bg: "bg-[#FFF7E6]", text: "text-[#D97706]", icon: ArrowsClockwise }, // Refresh equivalent
  "Refunded": { bg: "bg-[#ECFDF5]", text: "text-[#059669]", icon: Wallet },
  "Cancelled": { bg: "bg-[#F3F4F6]", text: "text-[#6B7280]", icon: XCircle },
  "Rejected": { bg: "bg-[#FEE2E2]", text: "text-[#DC2626]", icon: Prohibit }, // Ban equivalent
  "Failed": { bg: "bg-[#FEE2E2]", text: "text-[#DC2626]", icon: Warning }, // Alert Circle equivalent
  "failed": { bg: "bg-[#FEE2E2]", text: "text-[#DC2626]", icon: Warning },
  "Blocked": { bg: "bg-[#FEE2E2]", text: "text-[#991B1B]", icon: ShieldSlash }, // Shield Off equivalent
  "Verified": { bg: "bg-[#DCFCE7]", text: "text-[#15803D]", icon: SealCheck }, // Badge Check equivalent
  "Unverified": { bg: "bg-[#F3F4F6]", text: "text-[#6B7280]", icon: Shield },
}

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: StatusType | string
  showIcon?: boolean
}

export function StatusBadge({ className, status, showIcon = true, ...props }: StatusBadgeProps) {
  // Normalize string but fallback to a default if missing
  const normalizedStatus = status ? status : "Draft"
  
  // Use exact match or fallback to Draft
  const config = statusConfig[normalizedStatus as string] || statusConfig["Draft"]
  const Icon = config.icon

  // Format display text (capitalize first letter if it's purely lowercase like 'completed')
  const displayText = status === "completed" ? "Completed" 
    : status === "pending" ? "Pending" 
    : status === "failed" ? "Failed" 
    : status || "Unknown"

  return (
    <div 
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full px-[12px] h-[26px] text-[12px] font-medium transition-colors border-0",
        config.bg,
        config.text,
        className
      )} 
      {...props}
    >
      {showIcon && <Icon weight="bold" className="h-3 w-3 sm:h-[14px] sm:w-[14px]" />}
      <span>{props.children || displayText}</span>
    </div>
  )
}
