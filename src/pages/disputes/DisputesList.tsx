import * as React from "react"
import { useNavigate } from "react-router-dom"
import { DataTable } from "@/components/ui/data-table"

import { Input } from "@/components/ui/input"
import { mockDisputes } from "@/lib/mock-data"
import type { DisputeData } from "@/lib/mock-data"
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



// Admins land on their action queue: only disputes escalated to them.
const DEFAULT_STATUS = "escalated to admin"

export function DisputesList() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState(DEFAULT_STATUS)
  const [amountFilter, setAmountFilter] = React.useState("all")
  const [dateFilter, setDateFilter] = React.useState("all")

  const navigate = useNavigate()

  const handleResetFilters = () => {
    setSearch("")
    setStatusFilter(DEFAULT_STATUS)
    setAmountFilter("all")
    setDateFilter("all")
  }

  const filtersDirty =
    statusFilter !== DEFAULT_STATUS || amountFilter !== "all" || dateFilter !== "all" || search !== ""

  // Filter Data
  const filteredDisputes = mockDisputes.filter(dsp => {
    if (statusFilter !== "all" && dsp.status.toLowerCase() !== statusFilter) return false

    if (search) {
      const q = search.toLowerCase()
      if (
        !dsp.dealId.toLowerCase().includes(q) &&
        !dsp.product.toLowerCase().includes(q) &&
        !(dsp.reason && dsp.reason.toLowerCase().includes(q))
      ) {
        return false
      }
    }

    return true
  })

  const columns = [
    {
      header: "Deal",
      accessor: "dealId",
      className: "w-[360px]",
      cell: (row: DisputeData) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-muted border border-[#EEF2F7] flex items-center justify-center overflow-hidden shrink-0">
            {row.productThumbnail ? (
              <img src={row.productThumbnail} alt={row.product} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon weight="fill" className="h-5 w-5 text-muted-foreground/50" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-foreground transition-colors truncate max-w-[300px]" title={row.product}>{row.product}</span>
            <span className="text-[13px] font-medium text-muted-foreground">{row.dealId}</span>
          </div>
        </div>
      )
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
        <span className="text-[14px] font-bold text-foreground">
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
      header: "Created At",
      accessor: "created",
      sortable: true,
      cell: (row: DisputeData) => <span className="text-[13px] font-medium text-muted-foreground whitespace-nowrap">{row.created}</span>
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

  return (
    <div className="h-full w-full">
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

        {/* FILTER TOOLBAR */}
        <div className="px-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 bg-[#FAFBFD] rounded-[14px] p-4 border border-[#EEF2F7]">
            
            {/* Search */}
            <div className="relative w-full sm:w-[360px]">
              <MagnifyingGlass weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search deal ID, product name or dispute reason..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-[38px] h-[42px] w-full rounded-[10px] bg-white border border-[#EEF2F7] shadow-sm text-[14px] font-medium transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary placeholder:text-[14px] placeholder:font-normal placeholder:text-muted-foreground/70"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[190px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="escalated to admin">Escalated to Admin</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="waiting for seller">Waiting for Seller</SelectItem>
                <SelectItem value="seller responded">Seller Responded</SelectItem>
                <SelectItem value="under review">Under Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={amountFilter} onValueChange={setAmountFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Amounts</SelectItem>
                <SelectItem value="<1000">Under $1,000</SelectItem>
                <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                <SelectItem value=">5000">Over $5,000</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 ml-1">
              {filtersDirty && (
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
          {statusFilter === DEFAULT_STATUS && filteredDisputes.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center gap-3 py-20 px-6">
              <h3 className="text-[18px] font-bold text-[#0F172A]">🎉 No disputes require your attention.</h3>
              <p className="text-[14px] font-medium text-muted-foreground max-w-sm">
                There are currently no disputes escalated to the admin team.
              </p>
              <Button
                onClick={() => setStatusFilter("all")}
                className="mt-2 h-[42px] font-semibold rounded-[10px] px-5 shadow-sm"
              >
                View All Disputes
              </Button>
            </div>
          ) : (
            <DataTable entityName="Disputes"
              columns={columns}
              data={filteredDisputes}
              onRowClick={(row) => navigate(`/disputes/${row.id}`)}
              className="border-0 shadow-none bg-transparent rounded-none"
              rowClassName="h-[56px] hover:bg-[#F8FAFF] border-b border-[#EEF2F7] transition-all duration-150 cursor-pointer"
              pagination={true}
            />
          )}
        </div>

      </div>
    </div>
  )
}
