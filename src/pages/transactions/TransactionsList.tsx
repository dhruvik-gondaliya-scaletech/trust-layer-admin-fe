import * as React from "react"
import { useNavigate } from "react-router-dom"
import { DataTable } from "@/components/ui/data-table"

import { Input } from "@/components/ui/input"
import { mockTransactions, mockDeals } from "@/lib/mock-data"
import type { TransactionData } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MagnifyingGlass, DotsThree, CreditCard, Bank } from "@phosphor-icons/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
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


export function TransactionsList() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [dateFilter, setDateFilter] = React.useState("all")
  
  const navigate = useNavigate()

  const handleResetFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setTypeFilter("all")
    setDateFilter("all")
  }

  // Filter Data
  const filteredTransactions = mockTransactions.filter(trx => {
    if (statusFilter !== "all" && trx.status.toLowerCase() !== statusFilter) return false
    
    const rowType = (trx.type === "Sell" || (trx.type === "Buy" && trx.status === "Refunded")) ? "credit" : "debit"
    if (typeFilter !== "all" && rowType !== typeFilter) return false

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

  const getFinancialMovement = (row: TransactionData) => {
    if (row.type === "Sell" || (row.type === "Buy" && row.status === "Refunded")) {
      return { label: "Credit", color: "bg-[#ECFDF3] text-[#16A34A]", sign: "+" }
    }
    return { label: "Debit", color: "bg-[#FEF2F2] text-[#DC2626]", sign: "-" }
  }

  const columns = [
    { 
      header: "Deal", 
      cell: (row: TransactionData) => {
        const deal = mockDeals.find(d => d.id === row.dealId)
        const product = deal?.product || row.product
        const thumbnail = deal?.productThumbnail
        return (
          <div 
            className="flex items-center gap-3 cursor-pointer group py-1"
            onClick={(e) => { e.stopPropagation(); navigate(`/deals/${row.dealId}`) }}
          >
            {thumbnail ? (
              <div className="h-12 w-12 rounded-[12px] bg-[#F8FAFC] border border-[#EEF2F7] flex items-center justify-center shrink-0 overflow-hidden">
                <img src={thumbnail} alt={product} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-[12px] bg-[#F8FAFC] border border-[#EEF2F7] flex items-center justify-center shrink-0">
                <span className="text-[#94A3B8] font-medium text-[13px]">{product ? product.substring(0, 2).toUpperCase() : 'DL'}</span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-[#111827] group-hover:text-primary transition-colors">{product}</span>
              <span className="text-[13px] text-[#64748B]">{row.dealId}</span>
            </div>
          </div>
        )
      }
    },
    {
      header: "Transaction ID",
      accessor: "id",
      cell: (row: TransactionData) => (
        <span className="text-[13px] font-bold text-[#111827]">{row.id}</span>
      )
    },
    { 
      header: "Type", 
      cell: (row: TransactionData) => {
        const move = getFinancialMovement(row)
        return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[12px] font-medium ${move.color}`}>{move.label}</span>
      }
    },
    { 
      header: "Amount", 
      cell: (row: TransactionData) => {
        const move = getFinancialMovement(row)
        const isPositive = move.sign === "+"
        return (
          <span className={`text-[14px] font-bold ${isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
            {move.sign}${typeof row.amount === 'number' ? row.amount.toLocaleString(undefined, {minimumFractionDigits: 2}) : row.amount}
          </span>
        )
      }
    },
    { 
      header: "Date", 
      accessor: "date", 
      cell: (row: TransactionData) => <span className="text-[13px] font-medium text-[#475569]">{row.date}</span> 
    },
    { 
      header: "Method", 
      accessor: "paymentType", 
      cell: (row: TransactionData) => {
        const isCard = row.paymentType?.toLowerCase().includes("card")
        return (
          <div className="flex items-center gap-2">
            {isCard ? <CreditCard className="h-4 w-4 text-[#64748B]" /> : <Bank className="h-4 w-4 text-[#64748B]" />}
            <span className="text-[13px] font-medium text-[#475569]">{row.paymentType}</span>
          </div>
        )
      }
    },
    { 
      header: "Status", 
      cell: (row: TransactionData) => <StatusBadgeSemantic status={row.status} /> 
    },
    { 
      header: "Created At", 
      cell: (row: TransactionData) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-medium text-[#111827]">{row.date}</span>
          <span className="text-[12px] text-[#64748B]">10:32 AM</span>
        </div>
      )
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
                View Deal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ]

  return (
    <div className="h-full w-full space-y-6">
      
      {/* ONE UNIFIED CONTAINER */}
      <div className="bg-white border border-[#EEF2F7] rounded-[20px] pt-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-6 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] font-bold tracking-tight text-[#0F172A]">Transactions</h1>
            <p className="text-[14px] font-medium text-muted-foreground">Monitor every payment and platform fund movement across TrustLayer.</p>
          </div>
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

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-[42px] w-[160px] rounded-[10px] border-[#EEF2F7] bg-white shadow-sm font-semibold text-[14px] focus:ring-0">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px] border-[#EEF2F7] shadow-lg">
                <SelectItem value="all" className="rounded-lg text-[14px] font-semibold">All Types</SelectItem>
                <SelectItem value="credit" className="rounded-lg text-[14px] font-semibold">Credit</SelectItem>
                <SelectItem value="debit" className="rounded-lg text-[14px] font-semibold">Debit</SelectItem>
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
              {(statusFilter !== "all" || typeFilter !== "all" || dateFilter !== "all" || search !== "") && (
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
