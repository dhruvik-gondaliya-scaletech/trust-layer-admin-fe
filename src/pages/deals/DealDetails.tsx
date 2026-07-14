import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CaretLeft, Export, Star, Image as ImageIcon, Briefcase, Package, Scales, User, Bank, Receipt } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PageTabs } from "@/components/ui/page-tabs"
import { Timeline } from "@/components/ui/timeline"
import { mockDeals, mockTransactions, mockReviews, mockUsers, mockDisputes } from "@/lib/mock-data"
import type { DealData, TransactionData } from "@/lib/mock-data"
import { UserInformationCard } from "@/components/UserInformationCard"
import { cn } from "@/lib/utils"

function StatusBadgeSemantic({ status }: { status: DealData["status"] | string }) {
  const getBadgeStyle = () => {
    switch (status.toLowerCase()) {
      case "draft": return "bg-[#F1F5F9] text-[#64748B]" // Gray
      case "open": return "bg-[#EFF6FF] text-[#2563EB]" // Blue
      case "funded": return "bg-[#F3E8FF] text-[#9333EA]" // Purple
      case "shipped": return "bg-[#FFF7ED] text-[#EA580C]" // Orange
      case "delivered": return "bg-[#F0FDFA] text-[#0D9488]" // Teal
      case "completed": return "bg-[#ECFDF5] text-[#059669]" // Green
      case "disputed": return "bg-[#FEF2F2] text-[#DC2626]" // Red
      case "cancelled": return "bg-[#E2E8F0] text-[#1E293B]" // Dark Gray
      default: return "bg-[#F1F5F9] text-[#64748B]"
    }
  }
  return (
    <span className={cn("inline-flex items-center justify-center rounded-full px-3 py-1 text-[13px] font-semibold", getBadgeStyle())}>
      {status}
    </span>
  )
}

function StatusBadgeTransaction({ status }: { status: string }) {
  const getBadgeStyle = () => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-[#F1F5F9] text-[#64748B]" // Gray
      case "completed": return "bg-[#ECFDF5] text-[#059669]" // Green
      case "failed": return "bg-[#FEF2F2] text-[#DC2626]" // Red
      case "refunded": return "bg-[#FFF7ED] text-[#EA580C]" // Orange
      case "released": return "bg-[#F0FDFA] text-[#0D9488]" // Teal
      case "processing": return "bg-[#EFF6FF] text-[#2563EB]" // Blue
      default: return "bg-[#F1F5F9] text-[#64748B]"
    }
  }
  return (
    <span className={cn("inline-flex items-center justify-center rounded-full px-3 py-1 text-[13px] font-semibold", getBadgeStyle())}>
      {status}
    </span>
  )
}

export function DealDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const urlParams = new URLSearchParams(window.location.search)
  const tabFromUrl = urlParams.get('tab') || "overview"
  // If url has "transaction", fallback to overview since it moved to sidebar
  const [activeTab, setActiveTab] = React.useState(tabFromUrl === "transaction" ? "overview" : tabFromUrl)

  const deal = mockDeals.find(d => d.id === id) || mockDeals[0]
  const relatedDispute = mockDisputes.find(d => d.dealId === deal.id)

  const updateUrlTab = (tabId: string) => {
    setActiveTab(tabId)
    navigate(`/deals/${id}?tab=${tabId}`, { replace: true })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 2xl:gap-8 items-start">
      
      {/* 70% MAIN CONTENT */}
      <div className="flex flex-col space-y-6 2xl:space-y-8 lg:col-span-2">
        {/* Header Navigation */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/deals")}
            className="h-10 w-10 rounded-full bg-background border border-border/50 shadow-sm hover:bg-muted"
          >
            <CaretLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground">
              <span className="hover:text-foreground cursor-pointer" onClick={() => navigate("/deals")}>Deals</span>
              <span>/</span>
              <span className="text-foreground">{deal.id}</span>
            </div>
            <h1 className="text-[24px] font-bold tracking-tight text-foreground">Deal Details</h1>
          </div>
        </div>

        {/* Summary Card Header (Stripped of financials) */}
        <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="h-24 w-24 rounded-2xl bg-muted border-2 border-border/50 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
            {deal.productThumbnail ? (
              <img src={deal.productThumbnail} alt={deal.product} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon weight="fill" className="h-10 w-10 text-muted-foreground/50" />
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-[24px] font-bold text-foreground">{deal.product}</h2>
              <StatusBadgeSemantic status={deal.status} />
            </div>
            <div className="flex items-center gap-4 text-[13px] font-medium text-muted-foreground">
              <span>{deal.id}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><User className="h-4 w-4"/> Buyer: {deal.buyer}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><User className="h-4 w-4"/> Seller: {deal.seller}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
                {deal.category}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs - Transactions removed */}
        <PageTabs 
          activeTab={activeTab} 
          onTabChange={updateUrlTab}
          tabs={[
            { id: "overview", label: "Overview" },
            { id: "reviews", label: "Reviews", count: 2 },
          ]}
        />

        {/* Tab Content */}
        <div className="w-full space-y-6 2xl:space-y-8">
          {activeTab === "overview" && <OverviewTab deal={deal} />}
          {activeTab === "reviews" && <ReviewsTab />}
        </div>
      </div>

      {/* 30% SIDEBAR */}
      <div className="flex flex-col space-y-6 2xl:space-y-8 lg:col-span-1">
        
        {/* Quick Actions */}
        <div className="flex flex-col gap-3">
          {relatedDispute && (
            <Button
              onClick={() => navigate(`/disputes/${relatedDispute.id}`)}
              className="gap-2 h-11 w-full font-bold shadow-sm rounded-[12px] bg-destructive text-destructive-foreground hover:bg-destructive/90 border-0"
            >
              <Scales weight="bold" className="h-5 w-5" />
              Go to Dispute
            </Button>
          )}
          <Button variant="outline" className="gap-2 h-11 w-full font-bold bg-white shadow-sm border-border/50 rounded-[12px] hover:bg-muted text-foreground">
            <Export weight="bold" className="h-5 w-5" />
            Export Deal Data
          </Button>
        </div>

        {/* Financial Summary */}
        <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col space-y-6">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Bank className="h-5 w-5 text-muted-foreground" /> Financial Summary
          </h3>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-muted-foreground">Protected Amount</span>
              <span className="text-[20px] font-bold text-foreground">
                ${deal.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-muted-foreground">Platform Fee</span>
              <span className="text-[14px] font-bold text-foreground">
                ${deal.platformFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            {deal.trustScore && (
              <div className="flex justify-between items-center border-t border-border/50 pt-5">
                <span className="text-[13px] font-medium text-muted-foreground">Trust Score</span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 text-[13px] font-bold text-primary uppercase tracking-wider">
                  <Star weight="fill" className="h-3 w-3" /> {deal.trustScore}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Transactions Mini */}
        <TransactionSidebar dealId={deal.id} />

      </div>

    </div>
  )
}

function OverviewTab({ deal }: { deal: DealData }) {
  const buyerUser = mockUsers.find(u => u.name === deal.buyer) || { id: "USR-101", name: deal.buyer, email: `${deal.buyer.toLowerCase().replace(" ", ".")}@example.com`, phone: "+1 (555) 019-2834" }
  const sellerUser = mockUsers.find(u => u.name === deal.seller) || { id: "USR-102", name: deal.seller, email: `${deal.seller.toLowerCase().replace(" ", ".")}@example.com`, phone: "+1 (555) 018-2241" }

  const dealTimeline = [
    { id: 1, title: "Deal Created", date: deal.created, type: "default" },
    { id: 2, title: "Terms Accepted", date: deal.created, type: "info" },
    { id: 3, title: "Funds Protected", date: deal.created, type: "success" },
    ...(deal.status === "Shipped" || deal.status === "Delivered" || deal.status === "Completed" ? [{ id: 4, title: "Item Shipped", date: deal.updated, type: "info" }] : []),
    ...(deal.status === "Delivered" || deal.status === "Completed" ? [{ id: 5, title: "Item Delivered", date: deal.updated, type: "success" }] : []),
    ...(deal.status === "Completed" ? [{ id: 6, title: "Deal Completed", date: deal.updated, type: "success" }] : []),
    ...(deal.status === "Disputed" ? [{ id: 7, title: "Dispute Opened", date: deal.updated, type: "error" }] : []),
  ]

  return (
    <div className="space-y-6 2xl:space-y-8">
      {/* Product & Shipping stacked on 70% view is fine, or grid if enough space */}
      <div className="grid gap-6 2xl:gap-8 md:grid-cols-2">
        <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col space-y-6 2xl:space-y-8">
          <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-muted-foreground" /> Product Details
          </h3>
          <div className="grid gap-4">
            <div>
              <div className="text-[12px] font-medium text-muted-foreground mb-1">Item Name</div>
              <div className="font-medium">{deal.product}</div>
            </div>
            <div>
              <div className="text-[12px] font-medium text-muted-foreground mb-1">Product Type</div>
              <div className="font-medium">{deal.category}</div>
            </div>
            <div className="flex gap-8">
              <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Condition</div>
                <div className="font-medium flex items-center gap-1">New</div>
              </div>
            </div>
            <div>
              <div className="text-[12px] font-medium text-muted-foreground mb-1">Media Gallery</div>
              <div className="flex gap-2 mt-2">
                <div className="h-16 w-16 bg-muted rounded-lg border border-border flex items-center justify-center">
                  <ImageIcon className="text-muted-foreground/50 h-6 w-6" />
                </div>
                <div className="h-16 w-16 bg-muted rounded-lg border border-border flex items-center justify-center">
                  <ImageIcon className="text-muted-foreground/50 h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col space-y-6 2xl:space-y-8">
          <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" /> Shipping Information
          </h3>
          <div className="space-y-4">
            <div>
               <div className="text-[12px] font-medium text-muted-foreground mb-1">Shipping Method</div>
               <div className="font-medium">FedEx Overnight</div>
            </div>
            <div>
               <div className="text-[12px] font-medium text-muted-foreground mb-1">Tracking Number</div>
               <div className="font-medium text-primary">1Z9999999999999999</div>
            </div>
            <div>
               <div className="text-[12px] font-medium text-muted-foreground mb-1">Destination Address</div>
               <div className="font-medium">123 Main St, San Francisco, CA 94105</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col">
        <h3 className="font-bold text-foreground mb-8">Deal Timeline</h3>
        <Timeline items={dealTimeline as any} className="ml-2" />
      </div>

      <div className="grid gap-6 2xl:gap-8 md:grid-cols-2">
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
    </div>
  )
}

const getFinancialMovement = (row: TransactionData) => {
  if (row.type === "Sell" || (row.type === "Buy" && row.status === "Refunded")) {
    return { label: "Credit", color: "bg-[#ECFDF3] text-[#16A34A]", sign: "+" }
  }
  return { label: "Debit", color: "bg-[#FEF2F2] text-[#DC2626]", sign: "-" }
}

function TransactionSidebar({ dealId }: { dealId: string }) {
  const navigate = useNavigate()
  const dealTransactions = mockTransactions.filter(trx => trx.dealId === dealId)

  return (
    <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <Receipt className="h-5 w-5 text-muted-foreground" /> Transactions
        </h3>
        {dealTransactions.length > 0 && (
          <span className="text-[12px] font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
            {dealTransactions.length}
          </span>
        )}
      </div>

      {dealTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-6">
          <div className="h-10 w-10 rounded-full bg-[#F8FAFC] border border-[#EEF2F7] flex items-center justify-center">
            <Receipt className="h-5 w-5 text-[#94A3B8]" />
          </div>
          <p className="text-[13px] font-medium text-muted-foreground text-center">No transactions</p>
        </div>
      ) : (
        <div className="space-y-4">
          {dealTransactions.slice(0, 3).map((trx) => {
            const move = getFinancialMovement(trx)
            const isPositive = move.sign === "+"
            return (
              <div 
                key={trx.id} 
                onClick={() => navigate(`/transactions/${trx.id}`)}
                className="flex items-center justify-between p-3 border border-border/40 rounded-xl hover:bg-muted/30 cursor-pointer transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-foreground">{trx.date}</span>
                  <StatusBadgeTransaction status={trx.status} />
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className={`text-[14px] font-bold ${isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                    {move.sign}${typeof trx.amount === 'number' ? trx.amount.toLocaleString(undefined, {minimumFractionDigits: 2}) : trx.amount}
                  </span>
                  <span className="text-[12px] font-medium text-muted-foreground">{trx.paymentType}</span>
                </div>
              </div>
            )
          })}
          
          {dealTransactions.length > 3 && (
            <Button variant="ghost" className="w-full text-[#0F62FE] hover:bg-[#0F62FE]/5 hover:text-[#0F62FE]">
              View All Transactions
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

function ReviewsTab() {
  const reviews = mockReviews.slice(0, 2)
  return (
    <div className="space-y-6 2xl:space-y-8">
      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div key={review.id} className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-xl">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{review.reviewer.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-foreground">
                    {review.reviewer}
                    <span className="font-normal text-muted-foreground mx-1.5">•</span>
                    <span className="font-medium text-muted-foreground">{review.role}</span>
                  </span>
                  <span className="text-[12px] font-medium text-muted-foreground">{review.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-warning/10 px-2 py-1 rounded-lg">
                <Star weight="fill" className="text-warning h-4 w-4" />
                <span className="font-bold text-warning text-[13px]">{i === 0 ? "5" : "4"}.0</span>
              </div>
            </div>
            <p className="text-[13px] font-medium text-muted-foreground/90">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
