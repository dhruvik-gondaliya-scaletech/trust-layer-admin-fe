import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CaretLeft, CaretDown, Export, Briefcase, User, Bank, Image as ImageIcon, Scales, NotePencil, Question, ShieldWarning } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { PageTabs } from "@/components/ui/page-tabs"
import { Timeline } from "@/components/ui/timeline"
import { mockDisputes, mockTransactions } from "@/lib/mock-data"
import type { DisputeData } from "@/lib/mock-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  const relatedTransaction = mockTransactions.find(t => t.dealId === dispute.dealId)

  const updateUrlTab = (tabId: string) => {
    setActiveTab(tabId)
    navigate(`/disputes/${id}?tab=${tabId}`, { replace: true })
  }

  return (
    <div className="flex flex-col space-y-6">
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
          <Button variant="outline" className="gap-2 h-10 font-semibold bg-background shadow-sm border-border/50 rounded-xl hover:bg-muted">
            <Export weight="bold" className="h-4 w-4" />
            Export Data
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2 h-10 font-semibold shadow-sm rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 border-0">
                Admin Actions
                <CaretDown weight="bold" className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-[0_12px_40px_rgba(15,23,42,0.1)] border-border/50">
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2">
                Mark Under Review
              </DropdownMenuItem>
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2">
                Assign to Admin
              </DropdownMenuItem>
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2">
                Request Additional Evidence
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1.5" />
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2">
                Message Buyer
              </DropdownMenuItem>
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2">
                Message Seller
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1.5" />
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2 text-success focus:text-success focus:bg-success/10">
                Approve Refund
              </DropdownMenuItem>
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2 text-warning focus:text-warning focus:bg-warning/10">
                Partial Refund
              </DropdownMenuItem>
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2 text-destructive focus:text-destructive focus:bg-destructive/10">
                Reject Refund
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1.5" />
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2">
                Close Case
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Summary Card Header */}
      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col md:flex-row gap-6 items-start md:items-center">
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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="xl:col-span-3 space-y-6">
          {activeTab === "overview" && <OverviewTab dispute={dispute} />}
          {activeTab === "evidence" && <EvidenceTab dispute={dispute} />}
          {activeTab === "timeline" && <TimelineTab dispute={dispute} />}
          {activeTab === "decision" && <DecisionTab dispute={dispute} />}
        </div>

        {/* Right Sticky Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          
          <div className="sticky top-[140px] space-y-6">
            <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-6">
              <h3 className="text-[14px] font-bold text-foreground mb-4">Related Information</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer" onClick={() => navigate(`/deals/${dispute.dealId}`)}>
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase weight="fill" className="h-5 w-5 text-primary" />
                    <span className="font-bold text-[13px]">Deal Summary</span>
                  </div>
                  <p className="text-[12px] text-muted-foreground mb-2">View the original deal terms, product details, and shipping info.</p>
                  <span className="text-[12px] font-bold text-primary">View Deal →</span>
                </div>

                <div className="p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer" onClick={() => relatedTransaction ? navigate(`/transactions/${relatedTransaction.id}`) : navigate(`/transactions`)}>
                  <div className="flex items-center gap-3 mb-2">
                    <Bank weight="fill" className="h-5 w-5 text-primary" />
                    <span className="font-bold text-[13px]">Transaction Summary</span>
                  </div>
                  <p className="text-[12px] text-muted-foreground mb-2">Review payment methods, platform fees, and wallet logs.</p>
                  <span className="text-[12px] font-bold text-primary">View Transaction →</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer text-center">
                    <User weight="fill" className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <span className="font-bold text-[12px] block mb-1">Buyer Profile</span>
                    <span className="text-[10px] font-bold text-primary">View User →</span>
                  </div>
                  <div className="p-3 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer text-center">
                    <User weight="fill" className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <span className="font-bold text-[12px] block mb-1">Seller Profile</span>
                    <span className="text-[10px] font-bold text-primary">View User →</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
              <h3 className="text-[14px] font-bold text-foreground mb-4">Activity Log</h3>
              <div className="space-y-4">
                <div className="relative pl-4 border-l-2 border-border/50 pb-4">
                  <div className="absolute w-2 h-2 bg-primary rounded-full -left-[5px] top-1"></div>
                  <p className="text-[12px] font-bold text-foreground">Admin Assigned Case</p>
                  <p className="text-[12px] text-muted-foreground mt-1">Super Admin • Today, 10:15 AM</p>
                </div>
                <div className="relative pl-4 border-l-2 border-border/50 pb-4">
                  <div className="absolute w-2 h-2 bg-border rounded-full -left-[5px] top-1"></div>
                  <p className="text-[12px] font-bold text-foreground">Dispute Escalated</p>
                  <p className="text-[12px] text-muted-foreground mt-1">System • Yesterday, 4:45 PM</p>
                </div>
                <div className="relative pl-4 border-l-2 border-border/50">
                  <div className="absolute w-2 h-2 bg-border rounded-full -left-[5px] top-1"></div>
                  <p className="text-[12px] font-bold text-foreground">Dispute Opened</p>
                  <p className="text-[12px] text-muted-foreground mt-1">{dispute.buyer} • Oct 22, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OverviewTab({ dispute }: { dispute: DisputeData }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-6 md:col-span-2">
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
      
      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-6">
        <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
          <User className="h-5 w-5 text-muted-foreground" /> Buyer Information
        </h3>
        <div className="space-y-4">
          <div>
             <div className="text-[12px] font-medium text-muted-foreground mb-1">Name</div>
             <div className="font-medium text-primary hover:underline cursor-pointer">{dispute.buyer}</div>
          </div>
          <div>
             <div className="text-[12px] font-medium text-muted-foreground mb-1">Trust Score</div>
             <div className="font-medium">{dispute.buyerTrustScore}</div>
          </div>
          <div>
             <div className="text-[12px] font-medium text-muted-foreground mb-1">Previous Disputes</div>
             <div className="font-medium">0 Open, 1 Resolved</div>
          </div>
        </div>
      </div>

      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-6">
        <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
          <User className="h-5 w-5 text-muted-foreground" /> Seller Information
        </h3>
        <div className="space-y-4">
          <div>
             <div className="text-[12px] font-medium text-muted-foreground mb-1">Name</div>
             <div className="font-medium text-primary hover:underline cursor-pointer">{dispute.seller}</div>
          </div>
          <div>
             <div className="text-[12px] font-medium text-muted-foreground mb-1">Trust Score</div>
             <div className="font-medium">{dispute.sellerTrustScore}</div>
          </div>
          <div>
             <div className="text-[12px] font-medium text-muted-foreground mb-1">Previous Disputes</div>
             <div className="font-medium">1 Open, 4 Resolved</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EvidenceTab({ dispute }: { dispute: DisputeData }) {
  return (
    <div className="space-y-6">
      
      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-6">
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

      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-6">
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

      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-6 border-l-4 border-l-destructive">
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

function DecisionTab({ dispute }: { dispute: DisputeData }) {
  return (
    <div className="space-y-6">
      
      <div className="rounded-[20px] border border-warning/30 bg-warning/5 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <NotePencil weight="fill" className="text-warning h-5 w-5" />
          <h3 className="font-bold text-foreground text-[13px]">Admin Notes (Internal Only)</h3>
        </div>
        <textarea 
          className="w-full h-32 p-4 rounded-xl border border-warning/30 bg-white shadow-inner text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning"
          placeholder="Add internal notes about the investigation here..."
          defaultValue="The buyer's photos clearly show damage not present in the seller's original listing photos. However, the seller's pre-shipment photos are inconclusive for that specific side of the casing. Recommending partial refund to cover repair costs, or full refund upon return."
        />
        <div className="flex justify-end">
          <Button className="bg-warning text-warning-foreground hover:bg-warning/90 font-bold">Save Notes</Button>
        </div>
      </div>

      <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-6">
        <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-4">
          <Scales weight="fill" className="h-5 w-5 text-primary" /> Final Decision Panel
        </h3>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
             <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Protected Funds Status</div>
                <div className="font-medium"><DisputeStatusBadge status="Under Review" /></div>
             </div>
             <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Protected Amount</div>
                <div className="font-medium font-mono">${dispute.amount.toLocaleString()}</div>
             </div>
          </div>
          <div className="space-y-4">
             <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Platform Fee</div>
                <div className="font-medium font-mono text-muted-foreground">$168.00 (Standard Policy applies)</div>
             </div>
          </div>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
          <p className="text-[13px] font-medium text-muted-foreground mb-4">You are about to issue a final decision. This action will disburse the protected funds according to your selection and close the case.</p>
          <div className="flex flex-wrap gap-3">
             <Button className="bg-success hover:bg-success/90 text-white font-bold">Release to Seller</Button>
             <Button variant="outline" className="border-warning text-warning hover:bg-warning/10 font-bold">Partial Refund</Button>
             <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 font-bold">Full Refund to Buyer</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
