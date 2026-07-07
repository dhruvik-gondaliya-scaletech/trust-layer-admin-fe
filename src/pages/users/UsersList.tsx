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
export function UsersList() {
  const [search, setSearch] = React.useState("")
    const [countryFilter, setCountryFilter] = React.useState("all")
  const [timeFilter, setTimeFilter] = React.useState("all")
  const [dateFilter, setDateFilter] = React.useState("all")
  
  // New Filters
  const [disputesFilter, setDisputesFilter] = React.useState("all")
  const [lastActiveFilter, setLastActiveFilter] = React.useState("all")
  
  const navigate = useNavigate()

  const handleResetFilters = () => {
    setSearch("")
            setCountryFilter("all")
    setDateFilter("all")
    setTimeFilter("all")
    setDisputesFilter("all")
    setLastActiveFilter("all")
  }

  // Filter Data
  const filteredUsers = mockUsers.filter(user => {
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
    <div className="h-full w-full">
      <div className="bg-white border border-[#EEF2F7] rounded-[20px] pt-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col">
        {/* PAGE HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-6 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] font-bold tracking-tight text-[#0F172A]">Users</h1>
            <p className="text-[14px] font-medium text-muted-foreground">Manage all platform users and operations.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 h-[42px] font-semibold bg-white border-[#EEF2F7] shadow-sm rounded-[10px] px-5 transition-all active:scale-98">
              <Export weight="bold" className="h-[18px] w-[18px]" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="px-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 bg-[#FAFBFD] rounded-[14px] p-4 border border-[#EEF2F7]">
            {/* Search Box */}
            <div className="relative w-full sm:w-[320px]">
              <MagnifyingGlass weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search users..."
                className="pl-[38px] h-[42px] w-full rounded-[10px] bg-white border border-[#EEF2F7] shadow-sm text-[14px] font-medium transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary placeholder:text-[14px] placeholder:font-normal placeholder:text-muted-foreground/70"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Dropdown Filters */}
            

            

            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Any Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 ml-1">
              {(countryFilter !== "all" || dateFilter !== "all" || timeFilter !== "all" || disputesFilter !== "all" || lastActiveFilter !== "all" || search !== "") && (
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

        {/* Data Table */}
        <div className="flex-1 border-t border-[#EEF2F7]">
          <DataTable 
            columns={columns} 
            data={filteredUsers} 
            onRowClick={(row) => navigate(`/users/${row.id}`)}
            className="border-0 shadow-none bg-transparent rounded-none"
            rowClassName="h-[56px] hover:bg-[#F8FAFF] border-b border-[#EEF2F7] transition-all duration-150 cursor-pointer"
            pagination={true}
          />
        </div>
      </div>
    </div>
  )
}
