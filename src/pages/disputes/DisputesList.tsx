import * as React from "react"
import { useNavigate } from "react-router-dom"
import { DataTable } from "@/components/ui/data-table"

import { Input } from "@/components/ui/input"
import { mockDisputes } from "@/lib/mock-data"
import type { DisputeData } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MagnifyingGlass, DotsThree, Export, WarningCircle, Clock, Scales, MagnifyingGlassPlus, Checks, ShieldCheck, Image as ImageIcon } from "@phosphor-icons/react"
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

export function DisputesList() {
  const [activeTab, setActiveTab] = React.useState("all")
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [priorityFilter, setPriorityFilter] = React.useState("all")
  const [buyerFilter, setBuyerFilter] = React.useState("all")
  const [sellerFilter, setSellerFilter] = React.useState("all")
  
  const navigate = useNavigate()

  const handleResetFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setPriorityFilter("all")
    setBuyerFilter("all")
    setSellerFilter("all")
  }

  // Filter Data
  const filteredDisputes = mockDisputes.filter(dsp => {
    if (activeTab !== "all" && dsp.status.toLowerCase() !== activeTab) return false;
    
    if (statusFilter !== "all" && dsp.status.toLowerCase() !== statusFilter) return false
    if (priorityFilter !== "all" && dsp.priority.toLowerCase() !== priorityFilter) return false

    if (search) {
      const q = search.toLowerCase()
      if (
        !dsp.id.toLowerCase().includes(q) &&
        !dsp.dealId.toLowerCase().includes(q) &&
        !dsp.buyer.toLowerCase().includes(q) &&
        !dsp.seller.toLowerCase().includes(q) &&
        !dsp.product.toLowerCase().includes(q)
      ) {
        return false
      }
    }

    return true
  })

  const columns = [
    {
      header: "Dispute ID",
      accessor: "id",
      className: "w-[120px]",
      cell: (row: DisputeData) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0">
            {row.productThumbnail ? (
              <img src={row.productThumbnail} alt={row.product} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon weight="fill" className="h-5 w-5 text-muted-foreground/50" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#111827]">{row.id}</span>
            <span className="text-[12px] text-muted-foreground truncate max-w-[120px]">{row.product}</span>
          </div>
        </div>
      )
    },
    {
      header: "Deal",
      accessor: "dealId",
      cell: (row: DisputeData) => (
        <span className="text-[14px] font-medium text-[#2553FF] hover:underline cursor-pointer" onClick={(e) => { e.stopPropagation(); navigate(`/deals/${row.dealId}`); }}>{row.dealId}</span>
      )
    },
    {
      header: "Buyer",
      accessor: "buyer",
      cell: (row: DisputeData) => <span className="text-[13px] font-medium text-[#111827]">{row.buyer}</span>
    },
    {
      header: "Seller",
      accessor: "seller",
      cell: (row: DisputeData) => <span className="text-[13px] font-medium text-[#111827]">{row.seller}</span>
    },
    {
      header: "Reason",
      accessor: "reason",
      cell: (row: DisputeData) => <span className="text-[13px] font-medium text-[#475569]">{row.reason}</span>
    },
    {
      header: "Protected Amount",
      accessor: "amount",
      sortable: true,
      cell: (row: DisputeData) => (
        <span className="text-[15px] font-bold text-[#111827]">
          ${row.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      )
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row: DisputeData) => <DisputeStatusBadge status={row.status} />
    },
    {
      header: "Priority",
      accessor: "priority",
      cell: (row: DisputeData) => <PriorityBadge priority={row.priority} />
    },
    {
      header: "Created",
      accessor: "created",
      sortable: true,
      cell: (row: DisputeData) => <span className="text-[13px] font-normal text-[#475569] whitespace-nowrap">{row.created}</span>
    },
    {
      header: "",
      className: "w-[40px]",
      cell: (row: DisputeData) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted text-muted-foreground rounded-md transition-all active:scale-95">
                <DotsThree weight="bold" className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-[0_12px_40px_rgba(15,23,42,0.1)] border-border/50 animate-in fade-in zoom-in-95 duration-100">
              <DropdownMenuItem onClick={() => navigate(`/disputes/${row.id}`)} className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px]">
                View Case
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
              <DropdownMenuItem onClick={() => navigate(`/transactions`)} className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px]">
                Open Transaction
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.id)} className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px] text-muted-foreground focus:text-muted-foreground focus:bg-muted/10">
                Copy Dispute ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ]

  const tabs = [
    { id: "all", label: "All" },
    { id: "open", label: "Open" },
    { id: "waiting for seller", label: "Waiting for Seller" },
    { id: "seller responded", label: "Seller Responded" },
    { id: "escalated to admin", label: "Escalated to Admin" },
    { id: "under review", label: "Under Review" },
    { id: "resolved", label: "Resolved" },
    { id: "refunded", label: "Refunded" },
    { id: "rejected", label: "Rejected" },
  ]

  return (
    <div className="h-full w-full space-y-6">
      
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
        <StatCard title="Open Cases" value="2" icon={<WarningCircle weight="fill" />} iconContainerClassName="bg-[#EFF6FF] text-[#2563EB]" className="bg-white" />
        <StatCard title="Waiting for Seller" value="1" icon={<Clock weight="fill" />} iconContainerClassName="bg-[#FFF7ED] text-[#EA580C]" className="bg-white" />
        <StatCard title="Escalated to Admin" value="1" icon={<Scales weight="fill" />} iconContainerClassName="bg-[#FEF2F2] text-[#DC2626]" className="bg-white" />
        <StatCard title="Under Review" value="1" icon={<MagnifyingGlassPlus weight="fill" />} iconContainerClassName="bg-[#EEF2FF] text-[#4F46E5]" className="bg-white" />
        <StatCard title="Resolved Today" value="0" icon={<Checks weight="fill" />} iconContainerClassName="bg-[#ECFDF3] text-[#059669]" className="bg-white" />
        <StatCard title="Avg Resolution Time" value="2.4d" icon={<ShieldCheck weight="fill" />} iconContainerClassName="bg-[#F3F4F6] text-[#6B7280]" className="bg-white" />
      </div>

      {/* ONE UNIFIED CONTAINER */}
      <div className="bg-white border border-[#EEF2F7] rounded-[20px] pt-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-6 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] font-bold tracking-tight text-[#0F172A]">Disputes</h1>
            <p className="text-[14px] font-medium text-muted-foreground">Review, investigate and resolve disputes raised across the TrustLayer platform.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 h-[42px] font-semibold bg-white border-[#EEF2F7] shadow-sm rounded-[10px] px-5 transition-all active:scale-98">
              <Export weight="bold" className="h-[18px] w-[18px]" />
              Export Disputes
            </Button>
          </div>
        </div>
        
        {/* TABS */}
        <div className="flex items-center gap-2 border-b border-[#EEF2F7] px-6 pb-4 mb-6 overflow-x-auto scrollbar-hide">
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
                placeholder="Search dispute ID, deal ID, buyer, seller..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-[38px] h-[42px] w-full rounded-[10px] bg-white border border-[#EEF2F7] shadow-sm text-[14px] font-medium transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary placeholder:text-[14px] placeholder:font-normal placeholder:text-muted-foreground/70"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-[42px] w-[160px] rounded-[10px] border-[#EEF2F7] bg-white shadow-sm font-semibold text-[14px] focus:ring-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px] border-[#EEF2F7] shadow-lg">
                <SelectItem value="all" className="rounded-lg text-[14px] font-semibold">All Statuses</SelectItem>
                <SelectItem value="open" className="rounded-lg text-[14px] font-semibold">Open</SelectItem>
                <SelectItem value="waiting for seller" className="rounded-lg text-[14px] font-semibold">Waiting for Seller</SelectItem>
                <SelectItem value="escalated to admin" className="rounded-lg text-[14px] font-semibold">Escalated to Admin</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="h-[42px] w-[140px] rounded-[10px] border-[#EEF2F7] bg-white shadow-sm font-semibold text-[14px] focus:ring-0">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px] border-[#EEF2F7] shadow-lg">
                <SelectItem value="all" className="rounded-lg text-[14px] font-semibold">All Priorities</SelectItem>
                <SelectItem value="high" className="rounded-lg text-[14px] font-semibold">High</SelectItem>
                <SelectItem value="medium" className="rounded-lg text-[14px] font-semibold">Medium</SelectItem>
                <SelectItem value="low" className="rounded-lg text-[14px] font-semibold">Low</SelectItem>
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

            <div className="flex gap-2 ml-1">
              <Button 
                onClick={() => {}}
                className="h-[40px] text-[13px] font-bold bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-[10px] px-4 transition-colors"
              >
                Apply Filters
              </Button>
              {(statusFilter !== "all" || priorityFilter !== "all" || buyerFilter !== "all" || sellerFilter !== "all" || search !== "") && (
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
          <DataTable entityName="Disputes" 
            columns={columns} 
            data={filteredDisputes}
            onRowClick={(row) => navigate(`/disputes/${row.id}`)}
            className="border-0 shadow-none bg-transparent rounded-none"
            rowClassName="h-[56px] hover:bg-[#F8FAFF] border-b border-[#EEF2F7] transition-all duration-150 cursor-pointer"
            pagination={true}
          />
        </div>

      </div>
    </div>
  )
}
