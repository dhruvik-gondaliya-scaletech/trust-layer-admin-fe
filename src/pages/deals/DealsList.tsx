import * as React from "react"
import { useNavigate } from "react-router-dom"
import { DataTable } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { mockDeals } from "@/lib/mock-data"
import type { DealData } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MagnifyingGlass, DotsThree, Export, Image as ImageIcon } from "@phosphor-icons/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
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

export function DealsList() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [categoryFilter, setCategoryFilter] = React.useState("all")
  const [dateFilter, setDateFilter] = React.useState("all")
  
  const navigate = useNavigate()

  const handleResetFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setCategoryFilter("all")
    setDateFilter("all")
  }

  // Filter Data
  const filteredDeals = mockDeals.filter(deal => {
    if (statusFilter !== "all" && deal.status.toLowerCase() !== statusFilter) return false
    if (categoryFilter !== "all" && deal.category.toLowerCase() !== categoryFilter) return false

    if (search) {
      const q = search.toLowerCase()
      if (
        !deal.product.toLowerCase().includes(q) &&
        !deal.id.toLowerCase().includes(q) &&
        !deal.buyer.toLowerCase().includes(q) &&
        !deal.seller.toLowerCase().includes(q)
      ) {
        return false
      }
    }

    return true
  })

  const columns = [
    {
      header: "Deal",
      accessor: "product",
      className: "w-[280px]",
      cell: (row: DealData) => (
        <div className="flex items-center gap-3 py-1">
          <div className="h-[42px] w-[42px] rounded-[10px] bg-[#F7F9FC] border border-[#EEF2F7] flex items-center justify-center text-muted-foreground/50 overflow-hidden shrink-0">
            {row.productThumbnail ? (
              <img src={row.productThumbnail} alt={row.product} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon weight="fill" className="h-5 w-5" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-[#111827] truncate max-w-[200px]" title={row.product}>{row.product}</span>
            <span className="text-[12px] font-normal text-[#64748B]">{row.id}</span>
          </div>
        </div>
      )
    },
    {
      header: "Type",
      accessor: "type",
      cell: (row: any) => (
        <span className={cn(
          "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-[12px] font-bold",
          row.type === "Buy" ? "bg-[#ECFDF5] text-[#059669]" : "bg-[#EFF6FF] text-[#2563EB]"
        )}>
          {row.type || "Buy"}
        </span>
      )
    },
    {
      header: "Category",
      accessor: "category",
      cell: (row: DealData) => <span className="text-[13px] font-medium text-[#475569]">{row.category}</span>
    },
    {
      header: "Protected Amount",
      accessor: "amount",
      sortable: true,
      cell: (row: DealData) => (
        <span className="text-[14px] font-bold text-[#111827]">
          ${row.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      )
    },
    {
      header: "Platform Fee",
      accessor: "platformFee",
      cell: (row: DealData) => (
        <span className="text-[14px] font-medium text-[#475569]">
          ${row.platformFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      )
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row: DealData) => <StatusBadgeSemantic status={row.status} />
    },
    {
      header: "Created",
      accessor: "created",
      sortable: true,
      cell: (row: DealData) => <span className="text-[13px] font-normal text-[#475569] whitespace-nowrap">{row.created}</span>
    },
    {
      header: "Updated",
      accessor: "updated",
      cell: (row: DealData) => <span className="text-[13px] font-normal text-[#475569] whitespace-nowrap">{row.updated}</span>
    },
    {
      header: "",
      className: "w-[40px]",
      cell: (row: DealData) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted text-muted-foreground rounded-md transition-all active:scale-95">
                <DotsThree weight="bold" className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-[0_12px_40px_rgba(15,23,42,0.1)] border-border/50 animate-in fade-in zoom-in-95 duration-100">
              <DropdownMenuItem onClick={() => navigate(`/deals/${row.id}`)} className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px]">
                View Deal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.id)} className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px]">
                Copy Deal ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText("TRX-1035")} className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px]">
                Copy Transaction ID
              </DropdownMenuItem>
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px]">
                View Buyer
              </DropdownMenuItem>
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px]">
                View Seller
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem onClick={() => navigate(`/deals/${row.id}?tab=transaction`)} className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px] text-muted-foreground focus:text-muted-foreground focus:bg-muted/10">
                Open Transaction
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/deals/${row.id}?tab=dispute`)} className="font-bold cursor-pointer rounded-lg py-2.5 text-[13px] text-white bg-[#DC2626] hover:bg-[#B91C1C] focus:bg-[#B91C1C] focus:text-white mt-1">
                Open Dispute
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ]

    return (
    <div className="h-full w-full">
      {/* ONE UNIFIED CONTAINER */}
      <div className="bg-white border border-[#EEF2F7] rounded-[20px] pt-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-6 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] font-bold tracking-tight text-[#0F172A]">Deals</h1>
            <p className="text-[14px] font-medium text-muted-foreground">Monitor and manage all active and historical deals across the TrustLayer platform.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 h-[42px] font-semibold bg-white border-[#EEF2F7] shadow-sm rounded-[10px] px-5 transition-all active:scale-98">
              <Export weight="bold" className="h-[18px] w-[18px]" />
              Export Deals
            </Button>
          </div>
        </div>
        

        {/* FILTER TOOLBAR */}
        <div className="px-6 mb-6">
          <div className="flex flex-wrap items-center gap-3 bg-[#FAFBFD] rounded-[14px] p-4 border border-[#EEF2F7]">
            
            {/* Search */}
            <div className="relative w-full sm:w-[260px]">
              <MagnifyingGlass weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search deals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-[38px] h-[42px] w-full rounded-[10px] bg-white border border-[#EEF2F7] shadow-sm text-[14px] font-medium transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary placeholder:text-[14px] placeholder:font-normal placeholder:text-muted-foreground/70"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-[42px] w-[130px] rounded-[10px] border-[#EEF2F7] bg-white shadow-sm font-semibold text-[14px] focus:ring-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px] border-[#EEF2F7] shadow-lg">
                <SelectItem value="all" className="rounded-lg text-[14px] font-semibold">All Statuses</SelectItem>
                <SelectItem value="open" className="rounded-lg text-[14px] font-semibold">Open</SelectItem>
                <SelectItem value="funded" className="rounded-lg text-[14px] font-semibold">Funded</SelectItem>
                <SelectItem value="completed" className="rounded-lg text-[14px] font-semibold">Completed</SelectItem>
                <SelectItem value="disputed" className="rounded-lg text-[14px] font-semibold">Disputed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-[42px] w-[130px] rounded-[10px] border-[#EEF2F7] bg-white shadow-sm font-semibold text-[14px] focus:ring-0">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px] border-[#EEF2F7] shadow-lg">
                <SelectItem value="all" className="rounded-lg text-[14px] font-semibold">All Categories</SelectItem>
                <SelectItem value="watches" className="rounded-lg text-[14px] font-semibold">Watches</SelectItem>
                <SelectItem value="vehicles" className="rounded-lg text-[14px] font-semibold">Vehicles</SelectItem>
                <SelectItem value="luxury" className="rounded-lg text-[14px] font-semibold">Luxury</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="h-[42px] w-[150px] rounded-[10px] border-[#EEF2F7] bg-white shadow-sm font-semibold text-[14px] focus:ring-0">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px] border-[#EEF2F7] shadow-lg">
                <SelectItem value="all" className="rounded-lg text-[14px] font-semibold">Any Time</SelectItem>
                <SelectItem value="today" className="rounded-lg text-[14px] font-semibold">Today</SelectItem>
                <SelectItem value="7days" className="rounded-lg text-[14px] font-semibold">Last 7 Days</SelectItem>
                <SelectItem value="30days" className="rounded-lg text-[14px] font-semibold">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>

            {(statusFilter !== "all" || categoryFilter !== "all" || dateFilter !== "all" || search !== "") && (
              <Button 
                variant="ghost" 
                onClick={handleResetFilters}
                className="h-[42px] text-[14px] font-bold text-[#0F62FE] hover:bg-[#0F62FE]/10 rounded-[10px] px-4 ml-1 transition-colors"
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>

        {/* TABLE WRAPPER */}
        <div className="flex-1 border-t border-[#EEF2F7]">
          <DataTable entityName="Deals" 
            columns={columns} 
            data={filteredDeals}
            onRowClick={(row) => navigate(`/deals/${row.id}`)}
            className="border-0 shadow-none bg-transparent rounded-none"
            rowClassName="h-[56px] hover:bg-[#F8FAFF] border-b border-[#EEF2F7] transition-all duration-150 cursor-pointer"
            pagination={true}
          />
        </div>

      </div>
    </div>
  )
}
