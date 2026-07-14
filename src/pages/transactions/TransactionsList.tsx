import * as React from "react"
import { useNavigate } from "react-router-dom"
import { DataTable } from "@/components/ui/data-table"

import { Input } from "@/components/ui/input"
import { mockTransactions, mockDeals, mockUsers } from "@/lib/mock-data"
import type { TransactionData } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MagnifyingGlass, DotsThree, CreditCard, Bank, Wallet, Package, User, ShieldCheck } from "@phosphor-icons/react"
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
      case "released": return "bg-[#F0FDFA] text-[#0D9488]" // Teal
      case "failed": return "bg-[#FEF2F2] text-[#DC2626]" // Red
      case "refunded": return "bg-[#FFF7ED] text-[#EA580C]" // Orange
      case "cancelled": return "bg-[#E2E8F0] text-[#1E293B]" // Dark Gray
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

// Per-category badge colors for the transaction ledger
const TYPE_BADGE: Record<string, string> = {
  "Funds on Hold": "bg-[#EFF6FF] text-[#2563EB]",      // Blue
  "Funds Released": "bg-[#ECFDF5] text-[#059669]",      // Green
  "Payout to Seller": "bg-[#ECFDF5] text-[#059669]",    // Green
  "Wallet Deposit": "bg-[#FFF7ED] text-[#EA580C]",      // Orange
  "Wallet Withdrawal": "bg-[#FEF2F2] text-[#DC2626]",   // Red
  "Wallet Debit": "bg-[#FEF2F2] text-[#DC2626]",        // Red
  "Platform Fee": "bg-[#F3E8FF] text-[#9333EA]",        // Purple
  "Partial Settlement": "bg-[#FEFCE8] text-[#CA8A04]",  // Yellow
  "Partial Refund": "bg-[#FEFCE8] text-[#CA8A04]",      // Yellow
  "Buyer Refund": "bg-[#FEF2F2] text-[#DC2626]",        // Red
  "Wallet Adjustment": "bg-[#F1F5F9] text-[#475569]",   // Gray
  "Wallet Bonus": "bg-[#F0FDFA] text-[#0D9488]",        // Teal
  "Chargeback": "bg-[#FEF2F2] text-[#B91C1C]",          // Deep Red
  "Payment Failure": "bg-[#F1F5F9] text-[#64748B]",     // Gray
  "Refund Reversal": "bg-[#EEF2FF] text-[#4F46E5]",     // Indigo
}

// Type filter options (central ledger)
const FILTER_CATEGORIES = [
  "Funds on Hold", "Funds Released", "Buyer Refund", "Wallet Deposit",
  "Wallet Withdrawal", "Platform Fee", "Wallet Adjustment",
  "Chargeback",
]

const ALL_METHODS = [
  "ACH", "Wire Transfer", "Credit Card", "Wallet",
  "Bank Transfer", "Internal Adjustment", "Internal Transfer", "Admin Adjustment",
]

function MethodIcon({ method }: { method: string }) {
  const m = method.toLowerCase()
  if (m.includes("card")) return <CreditCard className="h-4 w-4 text-[#64748B]" />
  if (m.includes("wallet")) return <Wallet className="h-4 w-4 text-[#64748B]" />
  return <Bank className="h-4 w-4 text-[#64748B]" />
}

// Which "kind" of source a transaction represents, driving the Source column layout
type SourceKind = "deal" | "wallet" | "platform" | "admin" | "chargeback"

function getSourceKind(category?: string): SourceKind {
  switch (category) {
    case "Wallet Deposit":
    case "Wallet Withdrawal":
    case "Wallet Bonus":
    case "Bonus Credit":
    case "Wallet Debit":
      return "wallet"
    case "Wallet Adjustment":
      return "admin"
    case "Platform Fee":
      return "platform"
    case "Chargeback":
      return "chargeback"
    default:
      return "deal"
  }
}

function SourceIcon({ kind, thumbnail, product }: { kind: SourceKind, thumbnail?: string, product?: string }) {
  const base = "h-12 w-12 rounded-[12px] bg-[#F8FAFC] border border-[#EEF2F7] flex items-center justify-center shrink-0"
  if (kind === "deal") {
    if (thumbnail) {
      return (
        <div className={`${base} overflow-hidden`}>
          <img src={thumbnail} alt={product} className="h-full w-full object-cover" />
        </div>
      )
    }
    return <div className={base}><Package className="h-5 w-5 text-[#94A3B8]" /></div>
  }
  const icon =
    kind === "wallet" ? <User className="h-5 w-5 text-[#94A3B8]" /> :
    kind === "platform" ? <Bank className="h-5 w-5 text-[#94A3B8]" /> :
    kind === "admin" ? <ShieldCheck className="h-5 w-5 text-[#94A3B8]" /> :
    <CreditCard className="h-5 w-5 text-[#94A3B8]" />
  return <div className={base}>{icon}</div>
}

// Resolve the two lines shown in the Source column for a transaction
function getSourceLines(row: TransactionData) {
  const kind = getSourceKind(row.category)
  switch (kind) {
    case "wallet":
      return { title: row.user || row.buyer, subtitle: row.category || "Wallet" }
    case "admin":
      return { title: "Admin Adjustment", subtitle: row.user || row.buyer }
    case "platform":
      return { title: "Platform Fee", subtitle: row.dealId || "Platform" }
    case "chargeback":
      return { title: row.user || row.buyer, subtitle: "Chargeback" }
    default: {
      const deal = mockDeals.find(d => d.id === row.dealId)
      return { title: deal?.product || row.product || row.category || "—", subtitle: row.dealId || "—" }
    }
  }
}

export function TransactionsList() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [categoryFilter, setCategoryFilter] = React.useState("all")
  const [methodFilter, setMethodFilter] = React.useState("all")
  const [walletFilter, setWalletFilter] = React.useState("all")
  const [dateFilter, setDateFilter] = React.useState("all")

  const navigate = useNavigate()

  const handleResetFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setCategoryFilter("all")
    setMethodFilter("all")
    setWalletFilter("all")
    setDateFilter("all")
  }

  const hasActiveFilters =
    statusFilter !== "all" || categoryFilter !== "all" || methodFilter !== "all" ||
    walletFilter !== "all" || dateFilter !== "all" || search !== ""

  // Filter Data
  const filteredTransactions = mockTransactions.filter(trx => {
    if (statusFilter !== "all" && trx.status.toLowerCase() !== statusFilter) return false
    if (categoryFilter !== "all" && trx.category !== categoryFilter) return false
    if (methodFilter !== "all" && trx.paymentType !== methodFilter) return false

    if (walletFilter === "wallet" && trx.dealId) return false
    if (walletFilter === "deal" && !trx.dealId) return false

    if (search) {
      const q = search.toLowerCase()
      const email = mockUsers.find(u => u.name === trx.user)?.email || ""
      if (
        !trx.id.toLowerCase().includes(q) &&
        !(trx.dealId || "").toLowerCase().includes(q) &&
        !(trx.user || "").toLowerCase().includes(q) &&
        !email.toLowerCase().includes(q) &&
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
      header: "Source",
      className: "w-[18%]",
      cell: (row: TransactionData) => {
        const kind = getSourceKind(row.category)
        const deal = kind === "deal" ? mockDeals.find(d => d.id === row.dealId) : undefined
        const { title, subtitle } = getSourceLines(row)
        return (
          <div className="flex items-center gap-3 py-1">
            <SourceIcon kind={kind} thumbnail={deal?.productThumbnail} product={deal?.product || row.product} />
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-[#111827] truncate max-w-[220px]" title={title}>{title}</span>
              <span className="text-[13px] text-[#64748B]">{subtitle}</span>
            </div>
          </div>
        )
      }
    },
    {
      header: "Transaction ID",
      accessor: "id",
      className: "w-[9%]",
      cell: (row: TransactionData) => (
        <span className="text-[13px] font-bold text-[#111827]">{row.id}</span>
      )
    },
    {
      header: "Type",
      className: "w-[11%]",
      cell: (row: TransactionData) => {
        const color = (row.category && TYPE_BADGE[row.category]) || "bg-[#F1F5F9] text-[#64748B]"
        return (
          <div className="flex flex-col gap-0.5 py-1">
            <span className={cn("inline-flex w-fit items-center px-2 py-0.5 rounded text-[12px] font-medium", color)}>
              {row.category || "—"}
            </span>
            {row.note && (
              <span className="text-[11px] text-[#94A3B8] truncate max-w-[220px]" title={row.note}>{row.note}</span>
            )}
          </div>
        )
      }
    },
    {
      header: "Amount",
      className: "w-[10%]",
      cell: (row: TransactionData) => {
        const isPositive = row.direction !== "out"
        const sign = isPositive ? "+" : "-"
        return (
          <span className={cn("text-[14px] font-bold", isPositive ? "text-[#16A34A]" : "text-[#DC2626]")}>
            {sign}${typeof row.amount === 'number' ? row.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : row.amount}
          </span>
        )
      }
    },
    {
      header: "User",
      className: "w-[10%]",
      cell: (row: TransactionData) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold text-[#111827]">{row.user || "—"}</span>
          {row.userRole && <span className="text-[12px] text-[#64748B]">{row.userRole}</span>}
        </div>
      )
    },
    {
      header: "Payment Method",
      accessor: "paymentType",
      className: "w-[10%]",
      cell: (row: TransactionData) => (
        <div className="flex items-center gap-2">
          <MethodIcon method={row.paymentType} />
          <span className="text-[13px] font-medium text-[#475569]">{row.paymentType}</span>
        </div>
      )
    },
    {
      header: "Payment Type",
      className: "w-[9%]",
      cell: (row: TransactionData) => {
        let overallType = "Deal Payment"
        if (row.category === "Wallet Deposit") overallType = "Wallet Deposit"
        if (row.category === "Wallet Withdrawal") overallType = "Wallet Withdrawal"
        return (
          <span className="text-[13px] font-medium text-[#475569]">{overallType}</span>
        )
      }
    },
    {
      header: "Status",
      className: "w-[9%]",
      cell: (row: TransactionData) => <StatusBadgeSemantic status={row.status} />
    },
    {
      header: "Created At",
      className: "w-[10%]",
      cell: (row: TransactionData) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-medium text-[#111827]">{row.date}</span>
          <span className="text-[12px] text-[#64748B]">{row.time || "10:32 AM"}</span>
        </div>
      )
    },
    {
      header: "",
      className: "w-[4%]",
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
              {row.dealId && (
                <DropdownMenuItem onClick={() => navigate(`/deals/${row.dealId}`)} className="font-medium cursor-pointer rounded-lg py-2.5 text-[13px]">
                  View Deal
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ]

  return (
    <div className="h-full w-full space-y-6 2xl:space-y-8">
      {/* ONE UNIFIED CONTAINER */}
      <div className="bg-white border border-[#EEF2F7] rounded-[20px] pt-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col">

        {/* PAGE HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 px-6 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] font-bold tracking-tight text-[#0F172A]">Transactions</h1>
            <p className="text-[14px] font-medium text-muted-foreground">The central ledger for every fund movement across TrustLayer — funds on hold, refunds, fees, payouts, and wallet activity.</p>
          </div>
        </div>

        {/* FILTER TOOLBAR */}
        <div className="px-6 mb-8">
          <div className="flex flex-wrap items-center gap-6 bg-[#FAFBFD] rounded-[14px] p-4 border border-[#EEF2F7]">

            {/* Search */}
            <div className="relative w-full sm:w-[300px]">
              <MagnifyingGlass weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search product, deal ID, user, email, TRX ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-[38px] h-[42px] w-full rounded-[10px] bg-white border border-[#EEF2F7] shadow-sm text-[14px] font-medium transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary placeholder:text-[14px] placeholder:font-normal placeholder:text-muted-foreground/70"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="released">Released</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {FILTER_CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                {ALL_METHODS.map(m => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={walletFilter} onValueChange={setWalletFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Wallet Activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activity</SelectItem>
                <SelectItem value="wallet">Wallet Only</SelectItem>
                <SelectItem value="deal">Deal Only</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 ml-1">
              {hasActiveFilters && (
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
            className="border-0 shadow-none bg-transparent rounded-none"
            tableClassName="w-full table-fixed"
            rowClassName="h-[56px] hover:bg-[#F8FAFF] border-b border-[#EEF2F7] transition-all duration-150 cursor-pointer"
            onRowClick={(row) => navigate(`/transactions/${row.id}`)}
            pagination={true}
          />
        </div>

      </div>
    </div>
  )
}
