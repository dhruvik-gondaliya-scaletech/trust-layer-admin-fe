import * as React from "react"
import { useNavigate } from "react-router-dom"
import { DataTable } from "@/components/ui/data-table"
import { PageTabs } from "@/components/ui/page-tabs"
import { Input } from "@/components/ui/input"
import { mockTransactions } from "@/lib/mock-data"
import type { TransactionData } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MagnifyingGlass, DotsThree, Export, Receipt, LockKey, Handshake, ArrowUUpLeft, Money, CalendarBlank } from "@phosphor-icons/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/ui/stat-card"
import { cn } from "@/lib/utils"

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

export function TransactionsList() {
  const [activeTab, setActiveTab] = React.useState("all")
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [paymentMethodFilter, setPaymentMethodFilter] = React.useState("all")
  const [amountFilter, setAmountFilter] = React.useState("all")
  const [buyerFilter, setBuyerFilter] = React.useState("all")
  const [sellerFilter, setSellerFilter] = React.useState("all")
  const [dateFilter, setDateFilter] = React.useState("all")
  
  const navigate = useNavigate()

  const handleResetFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setPaymentMethodFilter("all")
    setAmountFilter("all")
    setBuyerFilter("all")
    setSellerFilter("all")
    setDateFilter("all")
  }

  // Filter Data
  const filteredTransactions = mockTransactions.filter(trx => {
    if (activeTab !== "all" && activeTab !== "protected funds") {
       if (trx.protectedStatus.toLowerCase() !== activeTab) return false;
    }
    if (activeTab === "protected funds" && trx.protectedStatus.toLowerCase() !== "protected") return false;
    
    if (statusFilter !== "all" && trx.status.toLowerCase() !== statusFilter) return false
    if (paymentMethodFilter !== "all" && trx.paymentType.toLowerCase() !== paymentMethodFilter) return false

    if (search) {
      const q = search.toLowerCase()
      if (
        !trx.id.toLowerCase().includes(q) &&
        !trx.dealId.toLowerCase().includes(q) &&
        !trx.buyer.toLowerCase().includes(q) &&
        !trx.seller.toLowerCase().includes(q) &&
        !trx.product.toLowerCase().includes(q)
      ) {
        return false
      }
    }

    return true
  })

  const columns = [
    {
      header: "Transaction ID",
      accessor: "id",
      className: "w-[150px]",
      cell: (row: TransactionData) => (
        <span className="text-[13px] font-bold text-[#111827]">{row.id}</span>
      )
    },
    {
      header: "Deal ID",
      accessor: "dealId",
      cell: (row: TransactionData) => (
        <div className="flex flex-col">
          <span className="text-[14px] font-medium text-[#2553FF] hover:underline cursor-pointer" onClick={(e) => { e.stopPropagation(); navigate(`/deals/${row.dealId}`); }}>{row.dealId}</span>
          <span className="text-[12px] text-muted-foreground truncate max-w-[150px]">{row.product}</span>
        </div>
      )
    },
    {
      header: "Buyer",
      accessor: "buyer",
      cell: (row: TransactionData) => <span className="text-[13px] font-medium text-[#111827]">{row.buyer}</span>
    },
    {
      header: "Seller",
      accessor: "seller",
      cell: (row: TransactionData) => <span className="text-[13px] font-medium text-[#111827]">{row.seller}</span>
    },
    {
      header: "Amount",
      accessor: "amount",
      sortable: true,
      cell: (row: TransactionData) => (
        <span className="text-[14px] font-bold text-[#111827]">
          ${row.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      )
    },
    {
      header: "Platform Fee",
      accessor: "platformFee",
      cell: (row: TransactionData) => (
        <span className="text-[14px] font-medium text-[#475569]">
          ${row.platformFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      )
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row: TransactionData) => <StatusBadgeSemantic status={row.status} />
    },
    {
      header: "Protected Funds",
      accessor: "protectedStatus",
      cell: (row: TransactionData) => <ProtectedFundsStatusBadge status={row.protectedStatus} />
    },
    {
      header: "Created",
      accessor: "date",
      sortable: true,
      cell: (row: TransactionData) => <span className="text-[13px] font-normal text-[#475569] whitespace-nowrap">{row.date}</span>
    },
    {
      header: "",
      className: "w-[40px]",
      cell: (row: TransactionData) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted text-muted-foreground rounded-md transition-all active:scale-95">
                <DotsThree weight="bold" className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-[0_12px_40px_rgba(15,23,42,0.1)] border-border/50 animate-in fade-in zoom-in-95 duration-100">
              <DropdownMenuItem onClick={() => navigate(`/transactions/${row.id}`)} className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px]">
                View Transaction
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/deals/${row.dealId}`)} className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px]">
                Open Deal
              </DropdownMenuItem>
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px]">
                View Buyer
              </DropdownMenuItem>
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px]">
                View Seller
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.id)} className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px] text-muted-foreground focus:text-muted-foreground focus:bg-muted/10">
                Copy Transaction ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.dealId)} className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px] text-muted-foreground focus:text-muted-foreground focus:bg-muted/10">
                Copy Deal ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ]

  const tabs = [
    { id: "all", label: "All" },
    { id: "protected funds", label: "Protected Funds" },
    { id: "released", label: "Released" },
    { id: "refunded", label: "Refunded" },
    { id: "failed", label: "Failed" },
    { id: "disputed", label: "Disputed" },
  ]

  return (
    <div className="h-full w-full space-y-6">
      
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
        <StatCard title="Total Transactions" value="5" icon={<Receipt weight="fill" />} iconContainerClassName="bg-[#FEFCE8] text-[#CA8A04]" className="bg-white" />
        <StatCard title="Protected Funds" value="$32,500.00" icon={<LockKey weight="fill" />} iconContainerClassName="bg-[#EFF6FF] text-[#2563EB]" className="bg-white" />
        <StatCard title="Released Funds" value="$150,000.00" icon={<Handshake weight="fill" />} iconContainerClassName="bg-[#ECFDF3] text-[#16A34A]" className="bg-white" />
        <StatCard title="Refunded" value="$24,000.00" icon={<ArrowUUpLeft weight="fill" />} iconContainerClassName="bg-[#FFF7ED] text-[#EA580C]" className="bg-white" />
        <StatCard title="Platform Revenue" value="$4,298.00" icon={<Money weight="fill" />} iconContainerClassName="bg-[#F5F3FF] text-[#7C3AED]" className="bg-white" />
        <StatCard title="Today's Transactions" value="3" icon={<CalendarBlank weight="fill" />} iconContainerClassName="bg-[#F3F4F6] text-[#6B7280]" className="bg-white" />
      </div>

      {/* ONE UNIFIED CONTAINER */}
      <div className="bg-white border border-[#EEF2F7] rounded-[20px] pt-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-6 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] font-bold tracking-tight text-[#0F172A]">Transactions</h1>
            <p className="text-[14px] font-medium text-muted-foreground">Monitor every payment and platform fund movement across TrustLayer.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 h-[42px] font-semibold bg-white border-[#EEF2F7] shadow-sm rounded-[10px] px-5 transition-all active:scale-98">
              <Export weight="bold" className="h-[18px] w-[18px]" />
              Export Transactions
            </Button>
          </div>
        </div>
        
        {/* TABS */}
        <div className="flex items-center gap-2 border-b border-[#EEF2F7] px-6 pb-4 mb-6 overflow-x-auto">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center justify-center h-[42px] px-[18px] text-[14px] font-semibold rounded-[12px] transition-all duration-200 outline-none whitespace-nowrap",
                  isActive
                    ? "bg-[#2553FF] text-white shadow-sm"
                    : "bg-transparent text-[#475569] hover:bg-[#EEF4FF]"
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* FILTER TOOLBAR */}
        <div className="px-6 mb-6">
          <div className="flex flex-wrap items-center gap-3 bg-[#FAFBFD] rounded-[14px] p-4 border border-[#EEF2F7]">
            
            {/* Search */}
            <div className="relative w-full sm:w-[320px]">
              <MagnifyingGlass weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search transaction ID, deal ID, buyer, seller..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-[38px] h-[42px] w-full rounded-[10px] bg-white border border-[#EEF2F7] shadow-sm text-[14px] font-medium transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary placeholder:text-[14px] placeholder:font-normal placeholder:text-muted-foreground/70"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-[42px] w-[160px] rounded-[10px] border-[#EEF2F7] bg-white shadow-sm font-semibold text-[14px] focus:ring-0">
                <SelectValue placeholder="Transaction Status" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px] border-[#EEF2F7] shadow-lg">
                <SelectItem value="all" className="rounded-lg text-[14px] font-semibold">All Statuses</SelectItem>
                <SelectItem value="completed" className="rounded-lg text-[14px] font-semibold">Completed</SelectItem>
                <SelectItem value="pending" className="rounded-lg text-[14px] font-semibold">Pending</SelectItem>
                <SelectItem value="failed" className="rounded-lg text-[14px] font-semibold">Failed</SelectItem>
                <SelectItem value="refunded" className="rounded-lg text-[14px] font-semibold">Refunded</SelectItem>
              </SelectContent>
            </Select>

            <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
              <SelectTrigger className="h-[42px] w-[160px] rounded-[10px] border-[#EEF2F7] bg-white shadow-sm font-semibold text-[14px] focus:ring-0">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px] border-[#EEF2F7] shadow-lg">
                <SelectItem value="all" className="rounded-lg text-[14px] font-semibold">All Methods</SelectItem>
                <SelectItem value="wire transfer" className="rounded-lg text-[14px] font-semibold">Wire Transfer</SelectItem>
                <SelectItem value="ach" className="rounded-lg text-[14px] font-semibold">ACH</SelectItem>
                <SelectItem value="credit card" className="rounded-lg text-[14px] font-semibold">Credit Card</SelectItem>
              </SelectContent>
            </Select>

            <Select value={amountFilter} onValueChange={setAmountFilter}>
              <SelectTrigger className="h-[42px] w-[140px] rounded-[10px] border-[#EEF2F7] bg-white shadow-sm font-semibold text-[14px] focus:ring-0">
                <SelectValue placeholder="Amount" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px] border-[#EEF2F7] shadow-lg">
                <SelectItem value="all" className="rounded-lg text-[14px] font-semibold">Any Amount</SelectItem>
                <SelectItem value="high" className="rounded-lg text-[14px] font-semibold">$10k+</SelectItem>
                <SelectItem value="medium" className="rounded-lg text-[14px] font-semibold">$1k - $10k</SelectItem>
              </SelectContent>
            </Select>

            <Select value={buyerFilter} onValueChange={setBuyerFilter}>
              <SelectTrigger className="h-[42px] w-[130px] rounded-[10px] border-[#EEF2F7] bg-white shadow-sm font-semibold text-[14px] focus:ring-0">
                <SelectValue placeholder="Buyer" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px] border-[#EEF2F7] shadow-lg">
                <SelectItem value="all" className="rounded-lg text-[14px] font-semibold">All Buyers</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sellerFilter} onValueChange={setSellerFilter}>
              <SelectTrigger className="h-[42px] w-[130px] rounded-[10px] border-[#EEF2F7] bg-white shadow-sm font-semibold text-[14px] focus:ring-0">
                <SelectValue placeholder="Seller" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px] border-[#EEF2F7] shadow-lg">
                <SelectItem value="all" className="rounded-lg text-[14px] font-semibold">All Sellers</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="h-[42px] w-[150px] rounded-[10px] border-[#EEF2F7] bg-white shadow-sm font-semibold text-[14px] focus:ring-0">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px] border-[#EEF2F7] shadow-lg">
                <SelectItem value="all" className="rounded-lg text-[14px] font-semibold">Any Time</SelectItem>
                <SelectItem value="today" className="rounded-lg text-[14px] font-semibold">Today</SelectItem>
                <SelectItem value="7days" className="rounded-lg text-[14px] font-semibold">Last 7 Days</SelectItem>
                <SelectItem value="30days" className="rounded-lg text-[14px] font-semibold">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 ml-1">
              <Button 
                onClick={() => {}}
                className="h-[40px] text-[13px] font-bold bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-[10px] px-4 transition-colors"
              >
                Apply Filters
              </Button>
              {(statusFilter !== "all" || paymentMethodFilter !== "all" || amountFilter !== "all" || buyerFilter !== "all" || sellerFilter !== "all" || dateFilter !== "all" || search !== "") && (
                <Button 
                  variant="ghost" 
                  onClick={handleResetFilters}
                  className="h-[42px] text-[14px] font-bold text-[#0F62FE] hover:bg-[#0F62FE]/10 rounded-[10px] px-4 transition-colors"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* TABLE WRAPPER */}
        <div className="flex-1 border-t border-[#EEF2F7]">
          <DataTable entityName="Transactions" 
            columns={columns} 
            data={filteredTransactions}
            onRowClick={(row) => navigate(`/transactions/${row.id}`)}
            className="border-0 shadow-none bg-transparent rounded-none"
            rowClassName="h-[56px] hover:bg-[#F8FAFF] border-b border-[#EEF2F7] transition-all duration-150 cursor-pointer"
            pagination={true}
          />
        </div>

      </div>
    </div>
  )
}
