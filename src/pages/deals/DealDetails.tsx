import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CaretLeft, Export, Star, Image as ImageIcon, Briefcase, Package, Scales, User } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PageTabs } from "@/components/ui/page-tabs"
import { DataTable } from "@/components/ui/data-table"
import { Timeline } from "@/components/ui/timeline"
import { mockDeals, mockTransactions, mockReviews, mockUsers } from "@/lib/mock-data"
import type { DealData } from "@/lib/mock-data"
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
      case "completed": return "bg-[#ECFDF5] text-[#059669]" // Green
      case "pending": return "bg-[#FEFCE8] text-[#CA8A04]" // Yellow
      case "failed": return "bg-[#FEF2F2] text-[#DC2626]" // Red
      case "refunded": return "bg-[#E2E8F0] text-[#1E293B]" // Dark Gray
      default: return "bg-[#F1F5F9] text-[#64748B]"
    }
  }
  return (
    <span className={cn("inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[12px] font-semibold", getBadgeStyle())}>
      {status}
    </span>
  )
}

export function DealDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Use URL params for active tab if available, else default to overview
  const urlParams = new URLSearchParams(window.location.search)
  const tabFromUrl = urlParams.get('tab') || "overview"
  const [activeTab, setActiveTab] = React.useState(tabFromUrl)

  const deal = mockDeals.find(d => d.id === id) || mockDeals[0]

  const updateUrlTab = (tabId: string) => {
    setActiveTab(tabId)
    navigate(`/deals/${id}?tab=${tabId}`, { replace: true })
  }

  return (
    <div className="flex flex-col space-y-6">
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
        <div className="ml-auto flex items-center gap-3">
          <Button variant="outline" className="gap-2 h-10 font-semibold bg-background shadow-sm border-border/50 rounded-xl hover:bg-muted">
            <Export weight="bold" className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Summary Card Header */}
      <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col flex flex-col md:flex-row gap-6 items-start md:items-center">
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
            {deal.trustScore && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 text-[12px] font-bold text-primary uppercase tracking-wider">
                Trust Score: {deal.trustScore}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-[13px] font-medium text-muted-foreground">Protected Amount</span>
          <span className="text-[24px] font-bold text-foreground">
            ${deal.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[12px] font-medium text-muted-foreground mt-1">
            Created {deal.created}
          </span>
        </div>
      </div>

      <PageTabs 
        activeTab={activeTab} 
        onTabChange={updateUrlTab}
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "transaction", label: "Transaction" },
          { id: "reviews", label: "Reviews", count: 2 },
          { id: "dispute", label: "Dispute" },
        ]} 
      />

      <div className="w-full space-y-6">
        {/* Main Content Area */}
        <div className="space-y-6">
          {activeTab === "overview" && <OverviewTab deal={deal} />}
          {activeTab === "transaction" && <TransactionTab />}
          {activeTab === "reviews" && <ReviewsTab />}
          {activeTab === "dispute" && <DisputeTab deal={deal} />}
        </div>
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
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col space-y-6">
          <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-muted-foreground" /> Product Details
          </h3>
          <div className="grid gap-4">
            <div>
              <div className="text-[12px] font-medium text-muted-foreground mb-1">Item Name</div>
              <div className="font-medium">{deal.product}</div>
            </div>
            <div>
              <div className="text-[12px] font-medium text-muted-foreground mb-1">Category</div>
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
        
        <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col space-y-6">
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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col">
          <h3 className="font-bold text-foreground mb-8">Deal Timeline</h3>
          <Timeline items={dealTimeline as any} className="ml-2" />
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
    </div>
  )
}

function TransactionTab() {
  const navigate = useNavigate()
  const transactions = mockTransactions.slice(0, 2) // mock related transactions
  return (
    <div className="space-y-6">

      <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col space-y-4">
        <h3 className="font-bold text-foreground">Transaction History</h3>
        <DataTable className="border-0 shadow-none bg-transparent rounded-none" rowClassName="h-[56px] hover:bg-[#F8FAFF] border-b border-[#EEF2F7] transition-all duration-150 cursor-pointer" 
          onRowClick={(row) => navigate(`/transactions/${row.id}`)}
          columns={[
            { header: "Date", accessor: "date", className: "w-[120px]" },
            { header: "Type", accessor: "paymentType" },
            { header: "Amount", cell: (row) => <span className="text-[14px] font-bold text-[#111827]">{row.amount}</span> },
            { header: "Reference", cell: (row) => <span className="text-[12px] font-mono text-[#64748B]">{row.reference}</span> },
            { header: "Status", cell: (row) => <StatusBadgeTransaction status={row.status} /> }
          ]}
          data={transactions}
        />
      </div>
    </div>
  )
}

function ReviewsTab() {
  // Use mockReviews but simulate them being for this deal
  const reviews = mockReviews.slice(0, 2)
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div key={review.id} className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-xl">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{review.reviewer.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-foreground">{review.reviewer}</span>
                  <span className="text-[12px] font-medium text-muted-foreground">{review.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-warning/10 px-2 py-1 rounded-lg">
                <Star weight="fill" className="text-warning h-4 w-4" />
                <span className="font-bold text-warning text-[13px]">{i === 0 ? "5" : "4"}.0</span>
              </div>
            </div>
            <p className="text-[13px] font-medium text-muted-foreground/90">{review.comment}</p>
            <div className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-[12px] font-bold text-muted-foreground uppercase">
              As {i === 0 ? "Buyer" : "Seller"}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DisputeTab({ deal }: { deal: DealData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
            <Scales className="h-5 w-5 text-destructive" /> Dispute Information
          </h3>
          <StatusBadgeSemantic status="Disputed" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
             <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Issue Summary</div>
                <div className="font-medium text-[13px] border p-4 rounded-lg bg-muted/20">
                  Buyer claims the item arrived damaged. Scratches on the side of the watch.
                </div>
             </div>
             <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Buyer Evidence</div>
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

          <div className="space-y-4">
             <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Seller Response</div>
                <div className="font-medium text-[13px] border p-4 rounded-lg bg-muted/20">
                  Item was packed securely. Damage must have happened during shipping. I have pre-shipment photos.
                </div>
             </div>
             <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Seller Evidence</div>
                <div className="flex gap-2 mt-2">
                  <div className="h-16 w-16 bg-muted rounded-lg border border-border flex items-center justify-center">
                    <ImageIcon className="text-muted-foreground/50 h-6 w-6" />
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6">
           <h4 className="font-bold mb-4">Admin Review Timeline</h4>
           <Timeline items={[
             { id: 1, title: "Dispute Opened", date: deal.updated, type: "error" },
             { id: 2, title: "Admin Review Started", description: "Assigned to Support Team", date: "Just now", type: "info" }
           ] as any} className="ml-2" />
        </div>

        <div className="flex gap-3 pt-4 border-t border-border/50">
           <Button className="bg-primary text-primary-foreground font-semibold">Request More Evidence</Button>
           <Button variant="outline" className="font-semibold text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive">Approve Refund</Button>
           <Button variant="outline" className="font-semibold text-success border-success hover:bg-success/10 hover:text-success">Release to Seller</Button>
        </div>
      </div>
    </div>
  )
}
