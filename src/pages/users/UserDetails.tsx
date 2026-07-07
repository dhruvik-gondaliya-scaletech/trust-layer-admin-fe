import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CaretLeft, LockKey, Money, ArrowUpRight, CheckCircle, MagnifyingGlass, DotsThree, Star, CreditCard, Bank } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PageTabs } from "@/components/ui/page-tabs"
import { DataTable } from "@/components/ui/data-table"
import { StatCard } from "@/components/ui/stat-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockUsers, mockDeals, mockTransactions, mockReviews } from "@/lib/mock-data"
import type { UserData } from "@/lib/mock-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function UserDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = React.useState("overview")

  const user = mockUsers.find(u => u.id === id) || mockUsers[0] // fallback to first user for demo

  return (
    <div className="flex flex-col space-y-6">
      {/* Header Navigation */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/users")}
          className="h-10 w-10 rounded-full bg-background border border-border/50 shadow-sm hover:bg-muted"
        >
          <CaretLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer" onClick={() => navigate("/users")}>Users</span>
            <span>/</span>
            <span className="text-foreground">{user.id}</span>
          </div>
          <h1 className="text-[24px] font-bold tracking-tight text-foreground">User Profile</h1>
        </div>
      </div>

      {/* Profile Card Header - Compact */}
      <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-5 shadow-sm flex flex-col md:flex-row gap-5 items-start md:items-center">
        <Avatar className="h-20 w-20 rounded-xl border-2 border-border/50 shadow-sm">
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-[20px] rounded-xl">
            {user.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-[22px] font-bold text-foreground">{user.name}</h2>
            <StatusBadge status={user.status} />
          </div>
          <div className="flex items-center gap-4 text-[13px] font-medium text-muted-foreground">
            <span>{user.username}</span>
            <span>•</span>
            <span>{user.email}</span>
            <span>•</span>
            <span>{user.phone}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-[13px] font-medium text-muted-foreground">Wallet Balance</span>
          <span className="text-[22px] font-bold text-foreground">
            ${user.walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[12px] font-medium text-muted-foreground mt-0.5">
            Member since {user.memberSince}
          </span>
        </div>
      </div>

      <PageTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        className="top-[72px]"
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "wallet", label: "Wallet" },
          { id: "deals", label: "Deals", count: user.openDeals + user.completedDeals },
          { id: "transactions", label: "Transactions" },
          { id: "reviews", label: "Reviews", count: mockReviews.length },
        ]} 
      />

      <div className="w-full">
        {activeTab === "overview" && <OverviewTab user={user} />}
        {activeTab === "wallet" && <WalletTab user={user} />}
        {activeTab === "deals" && <DealsTab />}
        {activeTab === "transactions" && <TransactionsTab />}
        {activeTab === "reviews" && <ReviewsTab user={user} />}
      </div>
    </div>
  )
}

function OverviewTab({ user }: { user: UserData }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Personal Information (70%) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#EEF2F7] rounded-[16px] p-6 shadow-sm flex flex-col gap-6 h-full">
            <h3 className="text-[18px] font-semibold text-foreground m-0">
              Personal Information
            </h3>
            
            {/* Contact Info Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#EEF2F7] rounded-[12px] p-5 flex flex-col gap-1.5">
                <div className="text-[12px] font-medium text-[#6B7280]">Email Address</div>
                <div className="text-[16px] font-medium text-[#111827] truncate">{user.email}</div>
                {user.verified && (
                  <div className="flex items-center gap-1.5 text-[#16A34A] text-[13px] font-medium mt-1">
                    <CheckCircle weight="fill" className="h-4 w-4" /> Verified
                  </div>
                )}
              </div>
              
              <div className="bg-white border border-[#EEF2F7] rounded-[12px] p-5 flex flex-col gap-1.5">
                <div className="text-[12px] font-medium text-[#6B7280]">Phone Number</div>
                <div className="text-[16px] font-medium text-[#111827] truncate">{user.phone}</div>
                {user.verified && (
                  <div className="flex items-center gap-1.5 text-[#16A34A] text-[13px] font-medium mt-1">
                    <CheckCircle weight="fill" className="h-4 w-4" /> Verified
                  </div>
                )}
              </div>
            </div>

            <div className="mt-2">
              <div className="text-[12px] font-medium text-[#6B7280] mb-1">Location</div>
              <div className="text-[16px] font-medium text-[#111827]">{user.country}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Reviews (30%) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-[#EEF2F7] rounded-[16px] p-6 shadow-sm flex flex-col gap-6 h-full">
            <h3 className="text-[18px] font-semibold text-foreground m-0">
              Reviews
            </h3>
            
            <div className="flex flex-col gap-5 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[14px] font-medium text-muted-foreground">
                  <Star weight="fill" className="text-warning h-4 w-4" /> Buyer Rating
                </div>
                <div className="text-[16px] font-semibold text-foreground">
                  {user.buyerRating || "N/A"}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[14px] font-medium text-muted-foreground">
                  <Star weight="fill" className="text-warning h-4 w-4" /> Seller Rating
                </div>
                <div className="text-[16px] font-semibold text-foreground">
                  {user.sellerRating || "N/A"}
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  )
}

function WalletTab({ user }: { user: UserData }) {
  const navigate = useNavigate()

  const getFinancialMovement = (row: any) => {
    if (row.status === "Refunded") return { label: "Refund", color: "bg-orange-100 text-orange-700", sign: "+" }
    if (row.type === "Sell") return { label: "Credit", color: "bg-green-100 text-green-700", sign: "+" }
    if (row.type === "Buy") return { label: "Debit", color: "bg-red-100 text-red-700", sign: "-" }
    return { label: "Hold", color: "bg-blue-100 text-blue-700", sign: "-" }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Available Balance" value={`$${user.walletBalance.toLocaleString()}`} icon={<Money weight="fill" />} iconContainerClassName="bg-[#ECFDF3] text-[#16A34A]" className="bg-white" />
        <StatCard title="Protected Funds" value={`$${user.heldFunds.toLocaleString()}`} icon={<LockKey weight="fill" />} iconContainerClassName="bg-[#EFF6FF] text-[#2563EB]" className="bg-white" />
        <StatCard title="Total Withdrawn" value={`$${user.withdrawn.toLocaleString()}`} icon={<ArrowUpRight weight="fill" />} iconContainerClassName="bg-[#F3F4F6] text-[#6B7280]" className="bg-white" />
      </div>

      <div className="bg-white border border-[#EEF2F7] rounded-[20px] shadow-sm flex flex-col space-y-0 overflow-hidden">
        <div className="p-6 border-b border-[#EEF2F7]">
          <h3 className="font-bold text-foreground">Wallet History</h3>
        </div>
        <DataTable className="border-0 shadow-none bg-transparent rounded-none" rowClassName="h-[56px] hover:bg-[#F8FAFC] border-b border-[#EEF2F7] transition-all duration-150 cursor-pointer" 
          onRowClick={(row) => navigate(`/transactions/${row.id}`)}
          columns={[
            { header: "Date", accessor: "date", cell: (row: any) => <span className="text-[13px] font-medium text-[#475569]">{row.date}</span> },
            { header: "Type", cell: (row: any) => {
                const move = getFinancialMovement(row)
                return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[12px] font-medium ${move.color}`}>{move.label}</span>
            }},
            { header: "Deal", cell: (row: any) => (
                <div className="flex flex-col py-1">
                  <span className="text-[13px] font-medium text-[#111827]">{row.product}</span>
                  <span className="text-[12px] text-[#64748B]">{row.dealId}</span>
                </div>
            )},
            { header: "Txn ID", cell: (row: any) => (
                <span className="text-[13px] font-medium font-mono text-[#475569]">
                  {row.id}
                </span>
            )},
            { header: "Amount", cell: (row: any) => {
                const move = getFinancialMovement(row)
                const isPositive = move.sign === "+"
                return (
                  <span className={`text-[14px] font-bold ${isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                    {move.sign}${typeof row.amount === 'number' ? row.amount.toLocaleString(undefined, {minimumFractionDigits: 2}) : row.amount}
                  </span>
                )
            }},
            { header: "Status", cell: (row: any) => <StatusBadge status={row.status} /> }
          ]}
          data={mockTransactions}
        />
      </div>
    </div>
  )
}

function DealsTab() {
  const navigate = useNavigate()
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [categoryFilter, setCategoryFilter] = React.useState("all")

  const handleResetFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setTypeFilter("all")
    setCategoryFilter("all")
  }

  const columns = [
    {
      header: "Deal",
      accessor: "product",
      cell: (row: any) => (
        <div 
          className="flex items-center gap-3 cursor-pointer group py-1"
          onClick={() => navigate(`/deals/${row.id}`)}
        >
          {row.productThumbnail ? (
            <div className="h-12 w-12 rounded-[12px] bg-[#F8FAFC] border border-[#EEF2F7] flex items-center justify-center shrink-0 overflow-hidden">
              <img src={row.productThumbnail} alt={row.product} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-[12px] bg-[#F8FAFC] border border-[#EEF2F7] flex items-center justify-center shrink-0">
              <span className="text-[#94A3B8] font-medium text-[13px]">{row.product ? row.product.substring(0, 2).toUpperCase() : 'DL'}</span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-[#111827] group-hover:text-primary transition-colors">{row.product}</span>
            <span className="text-[13px] text-[#64748B]">{row.id}</span>
          </div>
        </div>
      )
    },
    {
      header: "Type",
      accessor: "type",
      cell: (row: any) => {
        const isBuy = row.type === "Buy"
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[12px] font-medium ${isBuy ? 'bg-[#ECFDF3] text-[#16A34A]' : 'bg-[#EFF6FF] text-[#2563EB]'}`}>
            {row.type}
          </span>
        )
      }
    },
    {
      header: "Category",
      accessor: "category",
      cell: (row: any) => <span className="text-[13px] font-medium text-[#475569]">{row.category}</span>
    },
    {
      header: "Amount",
      accessor: "amount",
      sortable: true,
      cell: (row: any) => (
        <span className="text-[14px] font-bold text-[#111827]">
          ${typeof row.amount === 'number' ? row.amount.toLocaleString(undefined, {minimumFractionDigits: 2}) : row.amount}
        </span>
      )
    },
    {
      header: "Created",
      accessor: "created",
      cell: (row: any) => <span className="text-[13px] font-medium text-[#475569]">{row.created}</span>
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row: any) => <StatusBadge status={row.status} />
    },
    {
      header: "",
      accessor: "actions",
      cell: (row: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[8px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] data-[state=open]:bg-[#F1F5F9]" onClick={(e) => e.stopPropagation()}>
              <DotsThree weight="bold" className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px] rounded-[12px] p-1.5 shadow-xl border-[#EEF2F7]">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/deals/${row.id}`) }} className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2">
              View Deal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <div className="bg-white border border-[#EEF2F7] rounded-[20px] shadow-sm overflow-hidden">
      {/* Filters Toolbar */}
      <div className="p-4 border-b border-[#EEF2F7] bg-white">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[280px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlass weight="bold" className="h-4 w-4 text-[#94A3B8]" />
            </div>
            <Input
              type="text"
              placeholder="Search deals..."
              className="h-[38px] w-full pl-9 bg-[#F8FAFC] border-transparent hover:border-[#E2E8F0] focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 rounded-[10px] text-[14px] font-medium transition-all shadow-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="disputed">Disputed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="watches">Watches</SelectItem>
              <SelectItem value="vehicles">Vehicles</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="digital">Digital Assets</SelectItem>
            </SelectContent>
          </Select>

          {(statusFilter !== "all" || typeFilter !== "all" || categoryFilter !== "all" || search !== "") && (
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

      <DataTable 
        className="border-0 shadow-none bg-transparent rounded-none" 
        rowClassName="h-[56px] hover:bg-[#F8FAFC] border-b border-[#EEF2F7] transition-all duration-150 cursor-pointer" 
        columns={columns}
        data={mockDeals}
        onRowClick={(row) => navigate(`/deals/${row.id}`)}
      />
    </div>
  )
}

function TransactionsTab() {
  const navigate = useNavigate()

  const getFinancialMovement = (row: any) => {
    if (row.type === "Sell" || (row.type === "Buy" && row.status === "Refunded")) {
      return { label: "Credit", color: "bg-green-100 text-green-700", sign: "+" }
    }
    return { label: "Debit", color: "bg-red-100 text-red-700", sign: "-" }
  }

  const columns = [
    { 
      header: "Date", 
      accessor: "date", 
      cell: (row: any) => <span className="text-[13px] font-medium text-[#475569]">{row.date}</span> 
    },
    { 
      header: "Deal", 
      cell: (row: any) => {
        const deal = mockDeals.find(d => d.id === row.dealId)
        const product = deal?.product || row.product
        const thumbnail = deal?.productThumbnail
        return (
          <div className="flex items-center gap-3 py-1">
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
              <span className="text-[14px] font-semibold text-[#111827]">{product}</span>
              <span className="text-[13px] text-[#64748B]">{row.dealId}</span>
            </div>
          </div>
        )
      }
    },
    { 
      header: "Type", 
      cell: (row: any) => {
        const move = getFinancialMovement(row)
        return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[12px] font-medium ${move.color}`}>{move.label}</span>
      }
    },
    { 
      header: "Amount", 
      cell: (row: any) => {
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
      header: "Method", 
      accessor: "paymentType", 
      cell: (row: any) => {
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
      cell: (row: any) => <StatusBadge status={row.status} /> 
    },
    { 
      header: "Created At", 
      cell: (row: any) => (
        <div className="flex flex-col">
          <span className="text-[13px] font-medium text-[#111827]">{row.date}</span>
          <span className="text-[12px] text-[#64748B]">10:32 AM</span>
        </div>
      )
    },
    {
      header: "",
      accessor: "actions",
      cell: (row: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[8px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] data-[state=open]:bg-[#F1F5F9]" onClick={(e) => e.stopPropagation()}>
              <DotsThree weight="bold" className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px] rounded-[12px] p-1.5 shadow-xl border-[#EEF2F7]">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/transactions/${row.id}`) }} className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2">
              View Transaction
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/deals/${row.dealId}`) }} className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2">
              View Deal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <div className="bg-white border border-[#EEF2F7] rounded-[20px] shadow-sm overflow-hidden">
      <DataTable 
        className="border-0 shadow-none bg-transparent rounded-none" 
        rowClassName="h-[56px] hover:bg-[#F8FAFC] border-b border-[#EEF2F7] transition-all duration-150 cursor-pointer" 
        columns={columns}
        data={mockTransactions}
        onRowClick={(row) => navigate(`/transactions/${row.id}`)}
      />
    </div>
  )
}

function ReviewsTab({ user }: { user: UserData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Average Buyer Rating" value={user.buyerRating ? `${user.buyerRating} / 5.0` : "N/A"} icon={<Star weight="fill" />} iconContainerClassName="bg-[#FEFCE8] text-[#CA8A04]" className="bg-white" />
        <StatCard title="Average Seller Rating" value={user.sellerRating ? `${user.sellerRating} / 5.0` : "N/A"} icon={<Star weight="fill" />} iconContainerClassName="bg-[#FEFCE8] text-[#CA8A04]" className="bg-white" />
      </div>
      
      <div className="bg-white border border-[#EEF2F7] rounded-[20px] shadow-sm overflow-hidden">
        <DataTable 
          className="border-0 shadow-none bg-transparent rounded-none" 
          rowClassName="h-[72px] hover:bg-[#F8FAFC] border-b border-[#EEF2F7] transition-all duration-150" 
          columns={[
            { header: "Reviewer", cell: (r: any) => (
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 rounded-[8px] border border-border/50 bg-[#F8FAFC]">
                    <AvatarFallback className="text-[11px] font-bold text-primary bg-transparent">{r.reviewer.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-[13px] font-bold text-[#111827]">{r.reviewer}</span>
                </div>
              )
            },
            { header: "Rating", cell: (r: any) => (
                <div className="flex items-center gap-1">
                  <Star weight="fill" className="text-warning h-4 w-4" />
                  <span className="font-bold text-warning text-[13px]">{r.rating}.0</span>
                </div>
              )
            },
            { header: "Comment", cell: (r: any) => <span className="text-[13px] font-medium text-[#475569] max-w-[250px] truncate block">{r.comment}</span> },
            { header: "Deal", cell: (r: any) => <span className="text-[13px] font-medium text-[#111827]">{r.deal}</span> },
            { header: "Date", accessor: "date", cell: (r: any) => <span className="text-[13px] font-medium text-[#475569]">{r.date}</span> },
          ]}
          data={mockReviews}
        />
      </div>
    </div>
  )
}
