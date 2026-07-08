import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  CaretLeft, Export, User, Image as ImageIcon, Scales, NotePencil,
  Question, ShieldWarning, CheckCircle, WarningCircle, Handshake,
  ShieldCheck, ArrowUUpLeft, ArrowSquareOut, Bell, UploadSimple, Check
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { PageTabs } from "@/components/ui/page-tabs"
import { Timeline } from "@/components/ui/timeline"
import { mockDisputes, mockUsers } from "@/lib/mock-data"
import type { DisputeData } from "@/lib/mock-data"
import { UserInformationCard } from "@/components/UserInformationCard"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

function DisputeStatusBadge({ status }: { status: DisputeData["status"] | string }) {
  const getBadgeStyle = () => {
    switch (status.toLowerCase()) {
      case "open": return "bg-[#EFF6FF] text-[#2563EB]" // Blue
      case "waiting for seller": return "bg-[#FFF7ED] text-[#EA580C]" // Orange
      case "seller responded": return "bg-[#F3E8FF] text-[#9333EA]" // Purple
      case "escalated to admin": return "bg-[#FEF2F2] text-[#DC2626]" // Red
      case "under review": return "bg-[#EEF2FF] text-[#4F46E5]" // Indigo
      case "resolved": return "bg-[#ECFDF5] text-[#059669]" // Green
      case "refunded": return "bg-[#F0FDFA] text-[#0D9488]" // Teal
      case "rejected": return "bg-[#F1F5F9] text-[#64748B]" // Gray
      default: return "bg-[#F1F5F9] text-[#64748B]"
    }
  }
  return (
    <span className={cn("inline-flex items-center justify-center rounded-full px-3 py-1 text-[13px] font-semibold", getBadgeStyle())}>
      {status}
    </span>
  )
}

function PriorityBadge({ priority }: { priority: DisputeData["priority"] | string }) {
  const getBadgeStyle = () => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-[#FEF2F2] text-[#DC2626]" // Red
      case "medium": return "bg-[#FFF7ED] text-[#EA580C]" // Orange
      case "low": return "bg-[#EFF6FF] text-[#2563EB]" // Blue
      default: return "bg-[#F1F5F9] text-[#64748B]"
    }
  }
  return (
    <span className={cn("inline-flex items-center justify-center rounded-md px-2 py-0.5 text-[12px] font-bold uppercase", getBadgeStyle())}>
      {priority}
    </span>
  )
}

export function DisputeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const urlParams = new URLSearchParams(window.location.search)
  const tabFromUrl = urlParams.get('tab') || "overview"
  const [activeTab, setActiveTab] = React.useState(tabFromUrl)

  const dispute = mockDisputes.find(d => d.id === id) || mockDisputes[0]

  const updateUrlTab = (tabId: string) => {
    setActiveTab(tabId)
    navigate(`/disputes/${id}?tab=${tabId}`, { replace: true })
  }

  return (
    <div className="flex flex-col space-y-6 2xl:space-y-8">
      {/* Header Navigation */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/disputes")}
          className="h-10 w-10 rounded-full bg-background border border-border/50 shadow-sm hover:bg-muted"
        >
          <CaretLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer" onClick={() => navigate("/disputes")}>Disputes</span>
            <span>/</span>
            <span className="text-foreground">{dispute.id}</span>
          </div>
          <h1 className="text-[24px] font-bold tracking-tight text-foreground">Dispute Details</h1>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/deals/${dispute.dealId}`)}
            className="gap-2 h-10 font-semibold bg-background shadow-sm border-border/50 rounded-xl hover:bg-muted"
          >
            <ArrowSquareOut weight="bold" className="h-4 w-4" />
            Go to Deal
          </Button>
          <Button variant="outline" className="gap-2 h-10 font-semibold bg-background shadow-sm border-border/50 rounded-xl hover:bg-muted">
            <Export weight="bold" className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Summary Card Header */}
      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col md:flex-row gap-6 2xl:gap-8 items-start md:items-center">
        <div className="h-24 w-24 rounded-[14px] bg-muted border-2 border-[#EEF2F7] flex items-center justify-center overflow-hidden shrink-0">
          {dispute.productThumbnail ? (
            <img src={dispute.productThumbnail} alt={dispute.product} className="w-full h-full object-cover" />
          ) : (
            <ShieldWarning weight="fill" className="h-10 w-10 text-muted-foreground/50" />
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-[24px] font-bold text-foreground">{dispute.id}</h2>
            <DisputeStatusBadge status={dispute.status} />
            <PriorityBadge priority={dispute.priority} />
          </div>
          <div className="flex items-center gap-4 text-[13px] font-medium text-muted-foreground">
            <span className="hover:text-primary hover:underline cursor-pointer" onClick={() => navigate(`/deals/${dispute.dealId}`)}>Deal {dispute.dealId}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><User className="h-4 w-4"/> Buyer: {dispute.buyer} (Score: {dispute.buyerTrustScore})</span>
            <span>•</span>
            <span className="flex items-center gap-1"><User className="h-4 w-4"/> Seller: {dispute.seller} (Score: {dispute.sellerTrustScore})</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center rounded-md bg-destructive/10 px-2 py-1 text-[12px] font-bold text-destructive uppercase tracking-wider">
              {dispute.reason}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-[13px] font-medium text-muted-foreground">Protected Amount</span>
          <span className="text-[24px] font-bold text-foreground">
            ${dispute.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[12px] font-medium text-muted-foreground mt-1">
            Opened {dispute.created}
          </span>
        </div>
      </div>

      <PageTabs
        activeTab={activeTab}
        onTabChange={updateUrlTab}
        className="top-[72px]"
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "evidence", label: "Evidence" },
          { id: "timeline", label: "Timeline" },
          { id: "decision", label: "Decision" },
        ]}
      />

      <div className="w-full">
        {/* Main Content Area */}
        <div className="space-y-6 2xl:space-y-8">
          {activeTab === "overview" && <OverviewTab dispute={dispute} />}
          {activeTab === "evidence" && <EvidenceTab dispute={dispute} />}
          {activeTab === "timeline" && <TimelineTab dispute={dispute} />}
          {activeTab === "decision" && <DecisionTab dispute={dispute} />}
        </div>
      </div>
    </div>
  )
}



function OverviewTab({ dispute }: { dispute: DisputeData }) {
  const buyerUser = mockUsers.find(u => u.name === dispute.buyer) || { id: "USR-101", name: dispute.buyer, email: `${dispute.buyer.toLowerCase().replace(" ", ".")}@example.com`, phone: "+1 (555) 019-2834", verified: true, role: "Buyer" } as any;
  const sellerUser = mockUsers.find(u => u.name === dispute.seller) || { id: "USR-102", name: dispute.seller, email: `${dispute.seller.toLowerCase().replace(" ", ".")}@example.com`, phone: "+1 (555) 443-9982", verified: true, role: "Seller" } as any;

  return (
    <div className="grid gap-6 2xl:gap-8 md:grid-cols-2">
      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-6 2xl:space-y-8 md:col-span-2">
        <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
          <Question className="h-5 w-5 text-muted-foreground" /> Dispute Context
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <div className="text-[12px] font-medium text-muted-foreground mb-1">Reason</div>
            <div className="font-medium text-destructive">{dispute.reason}</div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-muted-foreground mb-1">Product Summary</div>
            <div className="font-medium">{dispute.product}</div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-muted-foreground mb-1">Protected Amount</div>
            <div className="font-medium">${dispute.amount.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <UserInformationCard
        title="Buyer Information"
        user={buyerUser}
        profileLabel="Buyer Profile"
      />

      <UserInformationCard
        title="Seller Information"
        user={sellerUser}
        profileLabel="Seller Profile"
      />
    </div>
  )
}

function EvidenceTab({ dispute }: { dispute: DisputeData }) {
  return (
    <div className="space-y-6 2xl:space-y-8">

      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-6 2xl:space-y-8">
        <div className="flex items-center gap-3 mb-4">
           <AvatarIcon name={dispute.buyer} isBuyer />
           <div>
             <h3 className="font-bold text-foreground text-[13px]">Buyer Description</h3>
             <p className="text-[12px] text-muted-foreground">{dispute.buyer} • Oct 22, 2026, 4:45 PM</p>
           </div>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-muted/20 text-[13px] font-medium">
          "The item arrived with significant damage to the casing that was not disclosed in the listing. The box was perfectly fine, so it must have been damaged before shipping. I have attached photos of the scratches."
        </div>
        <div className="space-y-2">
           <div className="text-[12px] font-bold text-foreground uppercase tracking-wider">Attached Evidence</div>
           <div className="flex gap-3">
             <div className="h-20 w-20 rounded-xl bg-muted border border-border flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
               <ImageIcon weight="fill" className="text-muted-foreground/50 h-8 w-8" />
             </div>
             <div className="h-20 w-20 rounded-xl bg-muted border border-border flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
               <ImageIcon weight="fill" className="text-muted-foreground/50 h-8 w-8" />
             </div>
           </div>
        </div>
      </div>

      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-6 2xl:space-y-8">
        <div className="flex items-center gap-3 mb-4">
           <AvatarIcon name={dispute.seller} />
           <div>
             <h3 className="font-bold text-foreground text-[13px]">Seller Response</h3>
             <p className="text-[12px] text-muted-foreground">{dispute.seller} • Oct 23, 2026, 9:15 AM</p>
           </div>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-muted/20 text-[13px] font-medium">
          "I packed the item securely in bubble wrap. It was in pristine condition when it left my hands. I have pre-shipment photos attached proving there were no scratches."
        </div>
        <div className="space-y-2">
           <div className="text-[12px] font-bold text-foreground uppercase tracking-wider">Attached Evidence</div>
           <div className="flex gap-3">
             <div className="h-20 w-20 rounded-xl bg-muted border border-border flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
               <ImageIcon weight="fill" className="text-muted-foreground/50 h-8 w-8" />
             </div>
           </div>
        </div>
      </div>

      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-6 2xl:space-y-8 border-l-4 border-l-destructive">
        <div className="flex items-center gap-3 mb-4">
           <AvatarIcon name={dispute.buyer} isBuyer />
           <div>
             <h3 className="font-bold text-foreground text-[13px] text-destructive">Buyer Escalation</h3>
             <p className="text-[12px] text-muted-foreground">{dispute.buyer} • Oct 24, 2026, 2:30 PM</p>
           </div>
        </div>
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-[13px] font-medium">
          "The pre-shipment photos provided by the seller don't even show the side of the casing where the scratches are. I refuse to accept this item in its current condition."
        </div>
      </div>

    </div>
  )
}

function AvatarIcon({ name, isBuyer = false }: { name: string, isBuyer?: boolean }) {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  return (
    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center font-bold text-[13px]", isBuyer ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700")}>
      {initials}
    </div>
  )
}

function TimelineTab({ dispute }: { dispute: DisputeData }) {
  const dTimeline = [
    { id: 1, title: "Buyer Reported Issue", description: `${dispute.reason}`, date: "Oct 22, 2026", type: "error" },
    { id: 2, title: "Seller Reviewing", description: "Waiting for seller response", date: "Oct 22, 2026", type: "default" },
    { id: 3, title: "Seller Responded", description: "Seller provided evidence", date: "Oct 23, 2026", type: "info" },
    { id: 4, title: "Buyer Escalated", description: "Buyer requested admin intervention", date: "Oct 24, 2026", type: "warning" },
    { id: 5, title: "Admin Reviewing", description: "Case assigned to Super Admin", date: "Today, 10:15 AM", type: "info" },
  ]

  return (
    <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
      <h3 className="font-bold text-foreground mb-8">Dispute Timeline</h3>
      <Timeline items={dTimeline as any} className="ml-2" />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Decision Tab — Final resolution workflow                                  */
/* -------------------------------------------------------------------------- */

const PLATFORM_FEE = 168

type ActionId = "release_seller" | "refund_buyer" | "partial"

function DecisionTab({ dispute }: { dispute: DisputeData }) {
  const protectedAmount = dispute.amount
  const maxRefund = protectedAmount - PLATFORM_FEE

  const [activeAction, setActiveAction] = React.useState<ActionId | null>(null)

  const selectAction = (id: ActionId) => {
    setActiveAction(prev => (prev === id ? null : id))
  }

  return (
    <div className="space-y-6 2xl:space-y-8">

      {/* Section 1 — Internal Investigation Notes */}
      <div className="rounded-[20px] border border-warning/30 bg-warning/5 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NotePencil weight="fill" className="text-warning h-5 w-5" />
            <h3 className="font-bold text-foreground text-[13px]">Admin Notes (Internal Only)</h3>
          </div>
          <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1 bg-white/70 border border-warning/20 px-2 py-0.5 rounded-full">
            <Check weight="bold" className="h-3 w-3" /> Auto-saved
          </span>
        </div>
        <textarea
          className="w-full h-32 p-4 rounded-xl border border-warning/30 bg-white shadow-inner text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning resize-y"
          placeholder="Add internal notes about the investigation here..."
          defaultValue="The buyer's photos clearly show damage not present in the seller's original listing photos. However, the seller's pre-shipment photos are inconclusive for that specific side of the casing. Recommending partial refund to cover repair costs, or full refund upon return."
        />
      </div>

      {/* Section 2 — Financial Summary (settlement style) */}
      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
        <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2 mb-5">
          <Scales weight="fill" className="h-5 w-5 text-primary" /> Financial Summary
        </h3>
        <div className="max-w-md space-y-3 text-[14px]">
          <SummaryRow label="Protected Amount" value={`$${protectedAmount.toLocaleString()}`} />
          <SummaryRow label="Platform Fee" value={`−$${PLATFORM_FEE.toLocaleString()}`} muted />
          <div className="border-t border-dashed border-border/70" />
          <SummaryRow label="Maximum Refund" value={`$${maxRefund.toLocaleString()}`} strong />
          <SummaryRow label="Seller Release" value={`$${maxRefund.toLocaleString()}`} strong />
          <div className="border-t border-dashed border-border/70" />
          <div className="flex items-center justify-between pt-1">
            <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Escrow Status</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3 py-1 text-[13px] font-bold text-[#059669]">
              <CheckCircle weight="fill" className="h-4 w-4" /> Protected
            </span>
          </div>
        </div>
      </div>

      {/* Section 3 — Final Resolution */}
      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
        <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2 mb-1">
          <ShieldCheck weight="fill" className="h-5 w-5 text-primary" /> Final Resolution
        </h3>
        <p className="text-[13px] text-muted-foreground mb-5">
          Choose how the protected funds should be resolved. Only one action can be active at a time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ActionPill
            active={activeAction === "release_seller"}
            onClick={() => selectAction("release_seller")}
            icon={<Handshake weight="fill" className="h-5 w-5" />}
            label="Release Funds to Seller"
            theme="green"
          />
          <ActionPill
            active={activeAction === "refund_buyer"}
            onClick={() => selectAction("refund_buyer")}
            icon={<ArrowUUpLeft weight="bold" className="h-5 w-5" />}
            label="Refund Buyer"
            theme="blue"
          />
          {/* Partial Settlement temporarily hidden
          <ActionPill
            active={activeAction === "partial"}
            onClick={() => selectAction("partial")}
            icon={<Scales weight="fill" className="h-5 w-5" />}
            label="Partial Settlement"
            theme="orange"
          />
          */}
        </div>

        {/* Expanded workflow */}
        {activeAction && (
          <div className="mt-6 pt-6 border-t border-border/60 animate-in fade-in slide-in-from-top-2 duration-200">
            {activeAction === "release_seller" && <ReleaseSellerPanel amount={maxRefund} />}
            {activeAction === "refund_buyer" && <RefundBuyerPanel protectedAmount={protectedAmount} />}
            {/* activeAction === "partial" && <PartialSettlementPanel protectedAmount={protectedAmount} /> */}
          </div>
        )}
      </div>

    </div>
  )
}

function SummaryRow({ label, value, muted, strong }: { label: string, value: string, muted?: boolean, strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={cn("text-[13px]", strong ? "font-bold text-foreground" : "font-medium text-muted-foreground")}>{label}</span>
      <span className={cn("font-mono tabular-nums", strong ? "text-[15px] font-bold text-foreground" : muted ? "text-[14px] font-semibold text-muted-foreground" : "text-[14px] font-semibold text-foreground")}>{value}</span>
    </div>
  )
}

/* --- Action pill --------------------------------------------------------- */

const PILL_THEMES = {
  green: { idle: "border-green-200 bg-green-50 text-green-700 hover:bg-green-100", active: "border-green-600 bg-green-600 text-white shadow-md shadow-green-600/20" },
  blue: { idle: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100", active: "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20" },
  orange: { idle: "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100", active: "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/20" },
  purple: { idle: "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100", active: "border-purple-600 bg-purple-600 text-white shadow-md shadow-purple-600/20" },
} as const

function ActionPill({ active, onClick, icon, label, theme }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, theme: keyof typeof PILL_THEMES }) {
  const t = PILL_THEMES[theme]
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 rounded-2xl border px-4 py-3.5 text-[14px] font-bold text-left transition-all duration-200",
        active ? t.active : t.idle
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="leading-tight">{label}</span>
    </button>
  )
}

/* --- Shared bits --------------------------------------------------------- */

function ReasonField({ value, onChange, label = "Resolution Reason", placeholder = "Explain the rationale for this decision..." }: { value: string, onChange: (v: string) => void, label?: string, placeholder?: string }) {
  return (
    <div>
      <Label className="text-[13px] font-bold text-foreground mb-1.5 block">{label}</Label>
      <textarea
        className="w-full h-24 p-3 rounded-[10px] border border-border/70 bg-white text-[14px] shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary resize-y"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

function MoneyInput({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
      <Input type="number" min={0} className="pl-7 font-mono" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

/* --- Action 1: Release Funds to Seller ----------------------------------- */

function ReleaseSellerPanel({ amount }: { amount: number }) {
  const [reason, setReason] = React.useState("")
  return (
    <div className="space-y-5">
      <ReasonField value={reason} onChange={setReason} />
      <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
        <WarningCircle weight="fill" className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
        <p className="text-[13px] font-medium text-green-800">
          Protected funds of <span className="font-bold">${amount.toLocaleString()}</span> will be released to the seller wallet. This closes the case and cannot be undone.
        </p>
      </div>
      <div className="flex justify-end">
        <Button disabled={!reason.trim()} className="bg-green-600 hover:bg-green-700 text-white font-bold h-10 px-8">
          Confirm Release
        </Button>
      </div>
    </div>
  )
}

/* --- Action 2: Refund Buyer ---------------------------------------------- */

function RefundBuyerPanel({ protectedAmount }: { protectedAmount: number }) {
  const [method, setMethod] = React.useState<"return" | "keep">("return")
  const [reason, setReason] = React.useState("")
  const [buyerRefund, setBuyerRefund] = React.useState(Math.round(protectedAmount / 2).toString())

  const parsed = parseFloat(buyerRefund) || 0
  const overLimit = parsed > protectedAmount || parsed < 0
  const clamped = Math.min(Math.max(parsed, 0), protectedAmount)
  const sellerRelease = protectedAmount - clamped

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-[13px] font-bold text-foreground mb-2 block">Refund Method</Label>
        <RadioGroup value={method} onValueChange={(v) => setMethod(v as "return" | "keep")} className="grid sm:grid-cols-2 gap-3">
          <MethodOption id="return" value="return" selected={method === "return"} title="Return Required" desc="Buyer must ship the item back before the refund is released." />
          <MethodOption id="keep" value="keep" selected={method === "keep"} title="Keep Item" desc="Buyer keeps the item; funds are split between both parties." />
        </RadioGroup>
      </div>

      {method === "return" && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-3 animate-in fade-in duration-200">
          <p className="text-[12px] font-bold text-blue-800 uppercase tracking-wider">Return Instructions</p>
          <ol className="space-y-2">
            <ReturnStep icon={<Bell weight="fill" className="h-4 w-4" />} text="Buyer receives a return notification" />
            <ReturnStep icon={<UploadSimple weight="bold" className="h-4 w-4" />} text="Buyer uploads return tracking" />
            <ReturnStep icon={<CheckCircle weight="fill" className="h-4 w-4" />} text="Seller confirms receipt of the item" />
            <ReturnStep icon={<Handshake weight="fill" className="h-4 w-4" />} text="Refund released automatically" />
          </ol>
        </div>
      )}

      {method === "keep" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-[13px] font-bold text-foreground mb-1.5 block">Buyer Refund</Label>
              <MoneyInput value={buyerRefund} onChange={setBuyerRefund} />
            </div>
            <div>
              <Label className="text-[13px] font-bold text-foreground mb-1.5 block">Seller Release <span className="font-normal text-muted-foreground">(auto)</span></Label>
              <div className="h-10 flex items-center rounded-md border border-border/70 bg-muted/40 px-3 font-mono font-semibold text-foreground">
                ${sellerRelease.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 flex items-center justify-between font-mono text-[13px]">
            <span className="font-medium text-blue-800">Protected Amount</span>
            <span className="font-bold text-blue-900">${protectedAmount.toLocaleString()}</span>
          </div>
          {overLimit && (
            <div className="flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/30 p-3 text-[13px] font-medium text-destructive">
              <WarningCircle weight="fill" className="h-4 w-4 shrink-0" />
              Buyer refund cannot exceed the protected amount of ${protectedAmount.toLocaleString()}.
            </div>
          )}
        </div>
      )}

      <ReasonField value={reason} onChange={setReason} />

      <div className="flex justify-end">
        <Button disabled={!reason.trim() || (method === "keep" && overLimit)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-8">
          {method === "return" ? "Confirm Refund" : "Confirm Settlement"}
        </Button>
      </div>
    </div>
  )
}

function MethodOption({ id, value, selected, title, desc }: { id: string, value: string, selected: boolean, title: string, desc: string }) {
  return (
    <Label
      htmlFor={id}
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-all",
        selected ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500" : "border-border/70 bg-white hover:bg-muted/30"
      )}
    >
      <RadioGroupItem value={value} id={id} className="mt-0.5" />
      <span className="space-y-0.5">
        <span className="block text-[13px] font-bold text-foreground">{title}</span>
        <span className="block text-[12px] font-medium text-muted-foreground">{desc}</span>
      </span>
    </Label>
  )
}

function ReturnStep({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <li className="flex items-center gap-2.5 text-[13px] font-medium text-blue-900">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shrink-0">{icon}</span>
      {text}
    </li>
  )
}

/* --- Action 3: Partial Settlement ---------------------------------------- */

/* function PartialSettlementPanel({ protectedAmount }: { protectedAmount: number }) {
  const [buyerRefund, setBuyerRefund] = React.useState(Math.round(protectedAmount / 2).toString())
  const [reason, setReason] = React.useState("")

  const parsed = parseFloat(buyerRefund) || 0
  const overLimit = parsed > protectedAmount || parsed < 0
  const clamped = Math.min(Math.max(parsed, 0), protectedAmount)
  const sellerRelease = protectedAmount - clamped

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-[13px] font-bold text-foreground mb-1.5 block">Buyer Refund</Label>
          <MoneyInput value={buyerRefund} onChange={setBuyerRefund} />
        </div>
        <div>
          <Label className="text-[13px] font-bold text-foreground mb-1.5 block">Seller Release <span className="font-normal text-muted-foreground">(auto)</span></Label>
          <div className="h-10 flex items-center rounded-md border border-border/70 bg-muted/40 px-3 font-mono font-semibold text-foreground">
            ${sellerRelease.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 flex items-center justify-between font-mono text-[13px]">
        <span className="font-medium text-orange-800">Protected Amount</span>
        <span className="font-bold text-orange-900">${protectedAmount.toLocaleString()}</span>
      </div>

      {overLimit && (
        <div className="flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/30 p-3 text-[13px] font-medium text-destructive">
          <WarningCircle weight="fill" className="h-4 w-4 shrink-0" />
          Buyer refund cannot exceed the protected amount of ${protectedAmount.toLocaleString()}.
        </div>
      )}

      <ReasonField value={reason} onChange={setReason} />

      <div className="flex justify-end">
        <Button disabled={overLimit || !reason.trim()} className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-10 px-8">
          Confirm Settlement
        </Button>
      </div>
    </div>
  )
} */
