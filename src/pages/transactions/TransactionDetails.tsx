import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CaretLeft, Briefcase, LockKey, User, ArrowUUpLeft, Handshake, Money, Receipt, Bank, WarningCircle, Image as ImageIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { PageTabs } from "@/components/ui/page-tabs"
import { Timeline } from "@/components/ui/timeline"
import { StatCard } from "@/components/ui/stat-card"
import { mockTransactions, mockDeals, mockUsers } from "@/lib/mock-data"
import type { TransactionData, DealData } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { UserInformationCard } from "@/components/UserInformationCard"

function StatusBadgeSemantic({ status }: { status: TransactionData["status"] | string }) {
  const getBadgeStyle = () => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-[#F1F5F9] text-[#64748B]" // Gray
      case "completed": return "bg-[#ECFDF5] text-[#059669]" // Green
      case "failed": return "bg-[#FEF2F2] text-[#DC2626]" // Red
      case "refunded": return "bg-[#FFF7ED] text-[#EA580C]" // Orange
      default: return "bg-[#F1F5F9] text-[#64748B]"
    }
  }
  return (
    <span className={cn("inline-flex items-center justify-center rounded-full px-3 py-1 text-[13px] font-semibold", getBadgeStyle())}>
      {status}
    </span>
  )
}

function ProtectedFundsStatusBadge({ status }: { status: TransactionData["protectedStatus"] | string }) {
  const getBadgeStyle = () => {
    switch (status.toLowerCase()) {
      case "protected": return "bg-[#EFF6FF] text-[#2563EB]" // Blue
      case "released": return "bg-[#ECFDF5] text-[#059669]" // Green
      case "refunded": return "bg-[#FFF7ED] text-[#EA580C]" // Orange
      case "failed": return "bg-[#FEF2F2] text-[#DC2626]" // Red
      case "disputed": return "bg-[#F3E8FF] text-[#9333EA]" // Purple
      case "pending": return "bg-[#F1F5F9] text-[#64748B]" // Gray
      default: return "bg-[#F1F5F9] text-[#64748B]"
    }
  }
  return (
    <span className={cn("inline-flex items-center justify-center rounded-full px-3 py-1 text-[13px] font-semibold", getBadgeStyle())}>
      {status}
    </span>
  )
}

export function TransactionDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const urlParams = new URLSearchParams(window.location.search)
  const tabFromUrl = urlParams.get('tab') || "overview"
  const [activeTab, setActiveTab] = React.useState(tabFromUrl)

  const transaction = mockTransactions.find(t => t.id === id) || mockTransactions[0]
  const relatedDeal = mockDeals.find(d => d.id === transaction.dealId)

  const updateUrlTab = (tabId: string) => {
    setActiveTab(tabId)
    navigate(`/transactions/${id}?tab=${tabId}`, { replace: true })
  }

  return (
    <div className="flex flex-col space-y-6 2xl:space-y-8">
      {/* Header Navigation */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/transactions")}
          className="h-10 w-10 rounded-full bg-background border border-border/50 shadow-sm hover:bg-muted"
        >
          <CaretLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer" onClick={() => navigate("/transactions")}>Transactions</span>
            <span>/</span>
            <span className="text-foreground">{transaction.id}</span>
          </div>
          <h1 className="text-[24px] font-bold tracking-tight text-foreground">Transaction Details</h1>
        </div>

      </div>

      {/* Summary Card Header */}
      <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col md:flex-row gap-6 2xl:gap-8 items-start md:items-center">
        <div className="h-20 w-20 rounded-[14px] bg-[#F8FAFC] border-2 border-[#EEF2F7] flex items-center justify-center shrink-0">
          <Receipt weight="fill" className="h-10 w-10 text-primary" />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-[24px] font-bold text-foreground">{transaction.id}</h2>
            <StatusBadgeSemantic status={transaction.status} />
            <ProtectedFundsStatusBadge status={transaction.protectedStatus} />
          </div>
          <div className="flex items-center gap-4 text-[13px] font-medium text-muted-foreground">
            <span className="hover:text-primary hover:underline cursor-pointer" onClick={() => navigate(`/deals/${transaction.dealId}`)}>Deal {transaction.dealId}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><User className="h-4 w-4"/> Buyer: {transaction.buyer}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><User className="h-4 w-4"/> Seller: {transaction.seller}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
              {transaction.paymentType}
            </span>
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-[12px] font-medium text-muted-foreground font-mono">
              Ref: {transaction.reference}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-[13px] font-medium text-muted-foreground">Total Amount</span>
          <span className="text-[24px] font-bold text-foreground">
            ${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[12px] font-medium text-muted-foreground mt-1">
            Created {transaction.date}
          </span>
        </div>
      </div>

      <PageTabs 
        activeTab={activeTab} 
        onTabChange={updateUrlTab}
        className="top-[72px]"
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "payment", label: "Payment" },
          { id: "timeline", label: "Timeline" },
          { id: "related_deal", label: "Related Deal" },
        ]} 
      />

      <div className="w-full">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 2xl:gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-3 space-y-6 2xl:space-y-8">
            {activeTab === "overview" && <OverviewTab transaction={transaction} />}
            {activeTab === "payment" && <PaymentTab transaction={transaction} />}
            {activeTab === "timeline" && <TimelineTab transaction={transaction} />}
            {activeTab === "related_deal" && <RelatedDealTab deal={relatedDeal} navigate={navigate} />}
          </div>

          {/* Right Sticky Sidebar */}
          <div className="hidden xl:block xl:col-span-1">
            <div className="sticky top-[140px] bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col space-y-6 2xl:space-y-8">
              <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">Transaction Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-medium text-muted-foreground">Transaction Status</span>
                  <span className="text-[14px] font-bold text-foreground">{transaction.status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-medium text-muted-foreground">Protected Funds</span>
                  <span className="text-[14px] font-bold text-foreground">{transaction.protectedStatus}</span>
                </div>
                <div className="w-full h-px bg-border/50 my-2" />
                
                {(() => {
                  const shippingCost = transaction.dealId && transaction.amount > 1000 ? 650 : 0;
                  const productPrice = transaction.amount - transaction.platformFee - shippingCost;
                  
                  return (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-medium text-muted-foreground">Product Price</span>
                        <span className="text-[14px] font-bold text-foreground">${productPrice.toLocaleString(undefined, {minimumFractionDigits:2})}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-medium text-muted-foreground">Shipping Cost</span>
                        <span className="text-[14px] font-bold text-foreground">${shippingCost.toLocaleString(undefined, {minimumFractionDigits:2})}</span>
                      </div>
                    </>
                  );
                })()}

                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-medium text-muted-foreground">Platform Fee</span>
                  <span className="text-[14px] font-bold text-foreground">${transaction.platformFee.toLocaleString(undefined, {minimumFractionDigits:2})}</span>
                </div>
                <div className="w-full h-px bg-border/50 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-bold text-foreground">Total Processed</span>
                  <span className="text-[14px] font-bold text-foreground">${transaction.amount.toLocaleString(undefined, {minimumFractionDigits:2})}</span>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[13px] font-medium text-muted-foreground">Date</span>
                  <span className="text-[14px] font-bold text-foreground">{transaction.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OverviewTab({ transaction }: { transaction: TransactionData }) {
  const navigate = useNavigate()
  
  const buyerUser = mockUsers.find(u => u.name === transaction.buyer) || { id: "USR-101", name: transaction.buyer, email: `${transaction.buyer.toLowerCase().replace(" ", ".")}@example.com`, phone: "+1 (555) 019-2834" }
  const sellerUser = mockUsers.find(u => u.name === transaction.seller) || { id: "USR-102", name: transaction.seller, email: `${transaction.seller.toLowerCase().replace(" ", ".")}@example.com`, phone: "+1 (555) 018-2241" }

  return (
    <div className="grid gap-6 2xl:gap-8 md:grid-cols-2">
      <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col space-y-6 2xl:space-y-8 md:col-span-2">
        <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-muted-foreground" /> Deal Summary
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <div className="text-[12px] font-medium text-muted-foreground mb-1">Product</div>
            <div className="font-medium">{transaction.product}</div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-muted-foreground mb-1">Deal ID</div>
            <div className="font-medium text-primary hover:underline cursor-pointer" onClick={() => navigate(`/deals/${transaction.dealId}`)}>{transaction.dealId}</div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-muted-foreground mb-1">Current Status</div>
            <div className="font-medium"><StatusBadgeSemantic status={transaction.status} /></div>
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

function PaymentTab({ transaction }: { transaction: TransactionData }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Buyer Paid" value={`$${transaction.amount.toLocaleString(undefined, {minimumFractionDigits:2})}`} icon={<ArrowUUpLeft weight="fill" />} iconContainerClassName="bg-[#F3F0FF] text-[#7C3AED]" className="bg-white" />
        <StatCard title="Platform Fee" value={`$${transaction.platformFee.toLocaleString(undefined, {minimumFractionDigits:2})}`} icon={<Money weight="fill" />} iconContainerClassName="bg-[#F5F3FF] text-[#7C3AED]" className="bg-white" />
        <StatCard title="Protected Funds" value={`$${(transaction.amount - transaction.platformFee).toLocaleString(undefined, {minimumFractionDigits:2})}`} icon={<LockKey weight="fill" />} iconContainerClassName="bg-[#EFF6FF] text-[#2563EB]" className="bg-white" />
        <StatCard title="Seller Receives" value={`$${(transaction.amount - transaction.platformFee).toLocaleString(undefined, {minimumFractionDigits:2})}`} icon={<Handshake weight="fill" />} iconContainerClassName="bg-[#ECFDF3] text-[#16A34A]" className="bg-white" />
      </div>

      <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col space-y-6 2xl:space-y-8">
        <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
          <Bank className="h-5 w-5 text-muted-foreground" /> Payment Details
        </h3>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
             <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Payment Method</div>
                <div className="font-medium bg-muted inline-flex px-2 py-1 rounded text-[13px] uppercase tracking-wider">{transaction.paymentType}</div>
             </div>
             <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Release Status</div>
                <div className="font-medium"><ProtectedFundsStatusBadge status={transaction.protectedStatus} /></div>
             </div>
             <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Refund Amount</div>
                <div className="font-medium">{transaction.protectedStatus === "Refunded" ? `$${transaction.amount.toLocaleString()}` : "$0.00"}</div>
             </div>
          </div>
          
          <div className="space-y-4">
             <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Buyer Wallet ID</div>
                <div className="font-mono text-[13px] text-muted-foreground">0x71C...976F</div>
             </div>
             <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Protected Vault ID</div>
                <div className="font-mono text-[13px] text-primary">0x99B...12A8</div>
             </div>
             <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Seller Wallet ID</div>
                <div className="font-mono text-[13px] text-muted-foreground">0x33F...BB19</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TimelineTab({ transaction }: { transaction: TransactionData }) {
  const tTimeline = [
    { id: 1, title: "Transaction Created", description: `Initialized by ${transaction.buyer}`, date: transaction.date, type: "default" },
    { id: 2, title: "Buyer Paid", description: `Funds secured via ${transaction.paymentType}`, date: transaction.date, type: "info" },
    { id: 3, title: "Funds Protected", description: `$${(transaction.amount - transaction.platformFee).toLocaleString()} securely held in vault`, date: transaction.date, type: "success" },
  ]
  
  if (transaction.protectedStatus === "Released") {
    tTimeline.push({ id: 4, title: "Seller Shipped", description: "Item tracking added", date: "Oct 25, 2026", type: "info" })
    tTimeline.push({ id: 5, title: "Buyer Confirmed", description: "Delivery verified", date: "Oct 27, 2026", type: "info" })
    tTimeline.push({ id: 6, title: "Funds Released", description: "Payment sent to seller", date: "Oct 27, 2026", type: "success" })
    tTimeline.push({ id: 7, title: "Completed", description: "Transaction finalized", date: "Oct 27, 2026", type: "success" })
  } else if (transaction.protectedStatus === "Refunded") {
    tTimeline.push({ id: 4, title: "Refund Processed", description: "Funds returned to buyer", date: "Oct 25, 2026", type: "warning" })
    tTimeline.push({ id: 5, title: "Completed", description: "Transaction finalized", date: "Oct 25, 2026", type: "success" })
  } else if (transaction.protectedStatus === "Disputed") {
    tTimeline.push({ id: 4, title: "Dispute Opened", description: "Buyer reported an issue", date: "Oct 25, 2026", type: "error" })
    tTimeline.push({ id: 5, title: "Seller Responded", description: "Evidence provided", date: "Oct 26, 2026", type: "info" })
    tTimeline.push({ id: 6, title: "Admin Reviewing", description: "Under review by TrustLayer Support", date: "Oct 26, 2026", type: "warning" })
  }

  return (
    <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col">
      <h3 className="font-bold text-foreground mb-8">Transaction Timeline</h3>
      <Timeline items={tTimeline as any} className="ml-2" />
    </div>
  )
}

function RelatedDealTab({ deal, navigate }: { deal: DealData | undefined, navigate: any }) {
  if (!deal) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card p-12 text-center shadow-sm">
        <WarningCircle weight="fill" className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
        <h3 className="font-bold text-foreground text-lg">No Related Deal Found</h3>
        <p className="text-muted-foreground mt-2">This transaction might not be tied to an active deal.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col max-w-2xl mx-auto">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 border-b border-border/50 pb-6">
          <div className="h-20 w-20 rounded-2xl bg-muted border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0">
            {deal.productThumbnail ? (
              <img src={deal.productThumbnail} alt={deal.product} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon weight="fill" className="h-8 w-8 text-muted-foreground/50" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">{deal.product}</h3>
            <span className="text-[13px] text-muted-foreground">Deal ID: {deal.id}</span>
            <div className="mt-1"><StatusBadgeSemantic status={deal.status} /></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[12px] font-medium text-muted-foreground block mb-1">Buyer</span>
            <span className="font-semibold">{deal.buyer}</span>
          </div>
          <div>
            <span className="text-[12px] font-medium text-muted-foreground block mb-1">Seller</span>
            <span className="font-semibold">{deal.seller}</span>
          </div>
          <div>
            <span className="text-[12px] font-medium text-muted-foreground block mb-1">Protected Amount</span>
            <span className="font-semibold">${deal.amount.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[12px] font-medium text-muted-foreground block mb-1">Category</span>
            <span className="font-semibold bg-muted px-2 py-0.5 rounded text-[12px] uppercase tracking-wider">{deal.category}</span>
          </div>
        </div>

        <Button onClick={() => navigate(`/deals/${deal.id}`)} className="w-full mt-4 font-semibold">
          View Deal Details →
        </Button>
      </div>
    </div>
  )
}
