import * as React from "react"
import { useNavigate } from "react-router-dom"
import { DataTable } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { mockUsers } from "@/lib/mock-data"
import type { UserData } from "@/lib/mock-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MagnifyingGlass, DotsThree, Export } from "@phosphor-icons/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function StatusBadgeSemantic({ status }: { status: UserData["status"] | string }) {
  const getBadgeStyle = () => {
    switch (status.toLowerCase()) {
      case "active": return "bg-[#ECFDF5] text-[#059669]" // Green
      case "verified": return "bg-[#EFF6FF] text-[#2563EB]" // Blue
      case "pending": return "bg-[#FEFCE8] text-[#CA8A04]" // Yellow
      case "suspended": return "bg-[#FFF7ED] text-[#EA580C]" // Orange
      case "deleted": return "bg-[#F1F5F9] text-[#64748B]" // Gray
      case "banned": return "bg-[#FEF2F2] text-[#DC2626]" // Red
      default: return "bg-[#F1F5F9] text-[#64748B]"
    }
  }
  return (
    <span className={cn("inline-flex items-center justify-center rounded-full px-[12px] h-[26px] text-[12px] font-medium", getBadgeStyle())}>
      {status}
    </span>
  )
}

function TrustScoreBadge({ score }: { score: number }) {
  const getScoreData = () => {
    if (score >= 90) return { label: "Excellent", className: "text-[#059669]" } // Green
    if (score >= 70) return { label: "Good", className: "text-[#2563EB]" } // Blue
    if (score >= 50) return { label: "Fair", className: "text-[#EA580C]" } // Orange
    return { label: "Poor", className: "text-[#DC2626]" } // Red
  }
  const { label, className } = getScoreData()
  return (
    <div className="flex flex-col">
      <span className="text-[13px] font-semibold text-[#111827]">{score}</span>
      <span className={cn("text-[12px] font-medium", className)}>
        {label}
      </span>
    </div>
  )
}

export function UsersList() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [trustScoreFilter, setTrustScoreFilter] = React.useState("all")
  const [walletFilter, setWalletFilter] = React.useState("all")
  const [countryFilter, setCountryFilter] = React.useState("all")
  const [dateFilter, setDateFilter] = React.useState("all")
  
  // New Filters
  const [openDealsFilter, setOpenDealsFilter] = React.useState("all")
  const [completedDealsFilter, setCompletedDealsFilter] = React.useState("all")
  const [disputesFilter, setDisputesFilter] = React.useState("all")
  const [lastActiveFilter, setLastActiveFilter] = React.useState("all")
  
  const navigate = useNavigate()

  const handleResetFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setTrustScoreFilter("all")
    setWalletFilter("all")
    setCountryFilter("all")
    setDateFilter("all")
    setOpenDealsFilter("all")
    setCompletedDealsFilter("all")
    setDisputesFilter("all")
    setLastActiveFilter("all")
  }

  // Filter Data
  const filteredUsers = mockUsers.filter(user => {
    if (statusFilter !== "all" && user.status.toLowerCase() !== statusFilter.toLowerCase()) return false
    if (countryFilter !== "all" && user.country !== countryFilter) return false
    
    // Search
    if (search) {
      const q = search.toLowerCase()
      const matchesSearch = 
        user.name.toLowerCase().includes(q) || 
        user.username.toLowerCase().includes(q) || 
        user.email.toLowerCase().includes(q)
      if (!matchesSearch) return false
    }

    return true
  })

  // Columns definition
  const columns = [
    {
      header: "User",
      accessor: "name",
      cell: (row: UserData) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 shrink-0 rounded-[10px] border border-border/50 bg-[#F8FAFC]">
            <AvatarFallback className="text-[13px] font-bold text-primary bg-transparent">
              {row.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-[#111827]">{row.name}</span>
            <span className="text-[13px] text-[#64748B]">@{row.username}</span>
          </div>
        </div>
      )
    },
    {
      header: "Email",
      accessor: "email",
      cell: (row: UserData) => <span className="text-[13px] font-medium text-[#475569]">{row.email}</span>
    },
    {
      header: "Trust Score",
      accessor: "trustScore",
      sortable: true,
      cell: (row: UserData) => <TrustScoreBadge score={row.trustScore} />
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row: UserData) => <StatusBadgeSemantic status={row.status} />
    },
    {
      header: "Wallet Balance",
      accessor: "walletBalance",
      sortable: true,
      cell: (row: UserData) => (
        <span className="text-[14px] font-bold text-[#111827]">
          ${row.walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      )
    },
    {
      header: "Open Deals",
      accessor: "openDeals",
      sortable: true,
      cell: (row: UserData) => <span className="text-[13px] font-bold text-[#111827]">{row.openDeals}</span>
    },
    {
      header: "Completed",
      accessor: "completedDeals",
      sortable: true,
      cell: (row: UserData) => <span className="text-[13px] font-medium text-[#475569]">{row.completedDeals}</span>
    },
    {
      header: "Disputes",
      accessor: "disputedDeals",
      sortable: true,
      cell: (row: UserData) => (
        <span className={cn("text-[13px] font-bold", row.disputedDeals > 0 ? "text-[#DC2626]" : "text-[#475569]")}>
          {row.disputedDeals}
        </span>
      )
    },
    {
      header: "Joined",
      accessor: "memberSince",
      cell: (row: UserData) => <span className="text-[13px] font-medium text-[#475569]">{row.memberSince}</span>
    },
    {
      header: "",
      accessor: "id",
      cell: (row: UserData) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[8px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] data-[state=open]:bg-[#F1F5F9]">
              <DotsThree weight="bold" className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px] rounded-[12px] p-1.5 shadow-xl border-[#EEF2F7]">
            <DropdownMenuItem onClick={() => navigate(`/users/${row.id}`)} className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2">
              View details
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2">
              Send message
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#EEF2F7] my-1" />
            <DropdownMenuItem className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2 text-destructive focus:text-destructive focus:bg-destructive/10">
              Suspend user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight text-[#0F172A]">Users</h1>
          <p className="text-[14px] text-[#64748B] mt-1 font-medium">
            Manage all platform users and operations.
          </p>
        </div>
        <Button className="h-[40px] px-4 rounded-[10px] bg-white border border-[#E5E7EB] text-[#0F172A] hover:bg-[#F8FAFC] shadow-sm font-semibold text-[14px]">
          <Export weight="bold" className="mr-2 h-4 w-4 text-[#64748B]" />
          Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-[20px] shadow-sm border border-[#EEF2F7] overflow-hidden">
        {/* Filters Toolbar */}
        <div className="p-4 border-b border-[#EEF2F7] bg-white">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Box */}
            <div className="relative flex-1 min-w-[280px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlass weight="bold" className="h-4 w-4 text-[#94A3B8]" />
              </div>
              <Input
                type="text"
                placeholder="Search users..."
                className="h-[38px] w-full pl-9 bg-[#F8FAFC] border-transparent hover:border-[#E2E8F0] focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 rounded-[10px] text-[14px] font-medium transition-all shadow-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Dropdown Filters */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-[38px] w-[140px] bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-[10px] text-[13px] font-semibold focus:ring-0 focus:ring-offset-0 data-[state=open]:border-primary shadow-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-[12px] p-1 border-[#E2E8F0] shadow-lg">
                <SelectItem value="all" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">All Statuses</SelectItem>
                <SelectItem value="active" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">Active</SelectItem>
                <SelectItem value="suspended" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">Suspended</SelectItem>
              </SelectContent>
            </Select>

            <Select value={trustScoreFilter} onValueChange={setTrustScoreFilter}>
              <SelectTrigger className="h-[38px] w-[130px] bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-[10px] text-[13px] font-semibold focus:ring-0 focus:ring-offset-0 data-[state=open]:border-primary shadow-sm">
                <SelectValue placeholder="Trust Score" />
              </SelectTrigger>
              <SelectContent className="rounded-[12px] p-1 border-[#E2E8F0] shadow-lg">
                <SelectItem value="all" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">Any Score</SelectItem>
                <SelectItem value="excellent" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">Excellent</SelectItem>
                <SelectItem value="good" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">Good</SelectItem>
                <SelectItem value="fair" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">Fair</SelectItem>
                <SelectItem value="poor" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">Poor</SelectItem>
              </SelectContent>
            </Select>

            <Select value={walletFilter} onValueChange={setWalletFilter}>
              <SelectTrigger className="h-[38px] w-[140px] bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-[10px] text-[13px] font-semibold focus:ring-0 focus:ring-offset-0 data-[state=open]:border-primary shadow-sm">
                <SelectValue placeholder="Wallet Balance" />
              </SelectTrigger>
              <SelectContent className="rounded-[12px] p-1 border-[#E2E8F0] shadow-lg">
                <SelectItem value="all" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">Any Balance</SelectItem>
                <SelectItem value="0" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">$0</SelectItem>
                <SelectItem value=">0" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">&gt;$0</SelectItem>
                <SelectItem value=">10k" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">&gt;$10k</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={openDealsFilter} onValueChange={setOpenDealsFilter}>
              <SelectTrigger className="h-[38px] w-[140px] bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-[10px] text-[13px] font-semibold focus:ring-0 focus:ring-offset-0 data-[state=open]:border-primary shadow-sm">
                <SelectValue placeholder="Open Deals" />
              </SelectTrigger>
              <SelectContent className="rounded-[12px] p-1 border-[#E2E8F0] shadow-lg">
                <SelectItem value="all" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">Any Open Deals</SelectItem>
                <SelectItem value="0" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">0 Deals</SelectItem>
                <SelectItem value="1+" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">1+ Deals</SelectItem>
                <SelectItem value="5+" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">5+ Deals</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={completedDealsFilter} onValueChange={setCompletedDealsFilter}>
              <SelectTrigger className="h-[38px] w-[160px] bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-[10px] text-[13px] font-semibold focus:ring-0 focus:ring-offset-0 data-[state=open]:border-primary shadow-sm">
                <SelectValue placeholder="Completed Deals" />
              </SelectTrigger>
              <SelectContent className="rounded-[12px] p-1 border-[#E2E8F0] shadow-lg">
                <SelectItem value="all" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">Any Completed</SelectItem>
                <SelectItem value="0" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">0 Deals</SelectItem>
                <SelectItem value="1+" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">1+ Deals</SelectItem>
                <SelectItem value="10+" className="rounded-md text-[13px] font-semibold focus:bg-[#F1F5F9]">10+ Deals</SelectItem>
              </SelectContent>
            </Select>

            {(statusFilter !== "all" || trustScoreFilter !== "all" || walletFilter !== "all" || countryFilter !== "all" || dateFilter !== "all" || openDealsFilter !== "all" || completedDealsFilter !== "all" || disputesFilter !== "all" || lastActiveFilter !== "all" || search !== "") && (
              <Button 
                variant="ghost" 
                onClick={handleResetFilters}
                className="h-[38px] px-3 text-[13px] font-semibold text-muted-foreground hover:text-foreground rounded-[10px]"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <DataTable 
          columns={columns} 
          data={filteredUsers} 
          onRowClick={(row) => navigate(`/users/${row.id}`)}
          rowClassName="h-[56px] cursor-pointer hover:bg-[#F8FAFC] transition-colors border-b border-[#EEF2F7]"
        />
      </div>
    </div>
  )
}
