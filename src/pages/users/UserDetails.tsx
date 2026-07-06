import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CaretLeft, CaretDown, Export, Prohibit, SealCheck, Trash, LockKey, MapPin, Clock, Star, Handshake, Money, ArrowUpRight, CheckCircle, MagnifyingGlass, DotsThree } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PageTabs } from "@/components/ui/page-tabs"
import { DataTable } from "@/components/ui/data-table"
import { Timeline } from "@/components/ui/timeline"
import { StatCard } from "@/components/ui/stat-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockUsers, mockDeals, mockTransactions, mockReviews, mockActivity } from "@/lib/mock-data"
import type { UserData } from "@/lib/mock-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { User } from "@phosphor-icons/react"

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
        <div className="ml-auto flex items-center gap-3">
          <Button variant="outline" className="gap-2 h-10 font-semibold bg-background shadow-sm border-border/50 rounded-xl hover:bg-muted">
            <Export weight="bold" className="h-4 w-4" />
            Export Data
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2 h-10 font-semibold shadow-sm rounded-xl">
                Quick Actions
                <CaretDown weight="bold" className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg border-border/50">
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2">
                View Public Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2">
                Reset Password
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1.5" />
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2 text-warning focus:text-warning focus:bg-warning/10">
                <Prohibit className="mr-2 h-4 w-4" />
                Suspend User
              </DropdownMenuItem>
              <DropdownMenuItem className="font-medium cursor-pointer rounded-lg py-2 text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash className="mr-2 h-4 w-4" />
                Deactivate User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            {user.verified && <SealCheck weight="fill" className="h-5 w-5 text-success" />}
            <StatusBadge status={user.status} />
          </div>
          <div className="flex items-center gap-4 text-[13px] font-medium text-muted-foreground">
            <span>{user.username}</span>
            <span>•</span>
            <span>{user.email}</span>
            <span>•</span>
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 text-[12px] font-bold text-primary uppercase tracking-wider">
              Trust Score: {user.trustScore}
            </span>
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
          { id: "activity", label: "Activity" },
        ]} 
      />

      <div className="w-full">
        {activeTab === "overview" && <OverviewTab user={user} />}
        {activeTab === "wallet" && <WalletTab user={user} />}
        {activeTab === "deals" && <DealsTab />}
        {activeTab === "transactions" && <TransactionsTab />}
        {activeTab === "reviews" && <ReviewsTab user={user} />}
        {activeTab === "activity" && <ActivityTab />}
      </div>
    </div>
  )
}

function OverviewTab({ user }: { user: UserData }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      {/* Left Main Content */}
      <div className="xl:col-span-3 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-sm flex flex-col space-y-6 h-full">
            <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" /> Personal Information
            </h3>
            <div className="grid gap-4">
              <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Full Name</div>
                <div className="text-[14px] font-semibold text-[#0F172A]">{user.name}</div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Email Address</div>
                <div className="text-[14px] font-semibold text-[#0F172A]">{user.email}</div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-muted-foreground mb-1">Phone Number</div>
                <div className="text-[14px] font-semibold text-[#0F172A]">{user.phone}</div>
              </div>
              <div className="flex gap-8">
                <div>
                  <div className="text-[12px] font-medium text-muted-foreground mb-1">Location</div>
                  <div className="text-[14px] font-semibold text-[#0F172A] flex items-center gap-1">
                    <MapPin className="text-muted-foreground" /> {user.country}
                  </div>
                </div>
                <div>
                  <div className="text-[12px] font-medium text-muted-foreground mb-1">Timezone</div>
                  <div className="text-[14px] font-semibold text-[#0F172A] flex items-center gap-1">
                    <Clock className="text-muted-foreground" /> {user.timezone}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-sm flex flex-col space-y-6 h-full">
            <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
              <LockKey className="h-5 w-5 text-muted-foreground" /> Security & Verification
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#EEF2F7] bg-[#F8FAFC]">
                <div className="flex items-center gap-3">
                  <div className="bg-success/10 text-success p-2 rounded-lg"><SealCheck weight="fill" /></div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[13px] text-[#0F172A]">Identity Verification</span>
                    <span className="text-[12px] text-muted-foreground">Completed via Persona</span>
                  </div>
                </div>
                <StatusBadge status="Verified" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#EEF2F7] bg-[#F8FAFC]">
                <div className="flex items-center gap-3">
                  <div className="bg-success/10 text-success p-2 rounded-lg"><SealCheck weight="fill" /></div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[13px] text-[#0F172A]">Email Verification</span>
                    <span className="text-[12px] text-muted-foreground">Verified at signup</span>
                  </div>
                </div>
                <StatusBadge status="Verified" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#EEF2F7] bg-[#F8FAFC]">
                <div className="flex items-center gap-3">
                  <div className="bg-success/10 text-success p-2 rounded-lg"><SealCheck weight="fill" /></div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[13px] text-[#0F172A]">Phone Verification</span>
                    <span className="text-[12px] text-muted-foreground">SMS 2FA Enabled</span>
                  </div>
                </div>
                <StatusBadge status="Verified" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sticky Sidebar (Summary) */}
      <div className="xl:col-span-1">
        <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-sm flex flex-col space-y-6">
          <h3 className="text-[14px] font-bold text-foreground mb-4">Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-muted-foreground">Trust Score</span>
              <span className={cn("text-[14px] font-bold", user.trustScore >= 80 ? "text-success" : user.trustScore >= 50 ? "text-warning" : "text-destructive")}>
                {user.trustScore}/100
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-muted-foreground">Completed Deals</span>
              <span className="text-[14px] font-bold text-foreground">{user.completedDeals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-muted-foreground">Open Deals</span>
              <span className="text-[14px] font-bold text-foreground">{user.openDeals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-muted-foreground">Disputes</span>
              <span className="text-[14px] font-bold text-destructive">{user.disputedDeals}</span>
            </div>
            <div className="w-full h-px bg-border/50 my-2" />
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-muted-foreground">Buyer Rating</span>
              <div className="flex items-center gap-1 font-bold text-foreground">
                <Star weight="fill" className="text-warning h-4 w-4" /> {user.buyerRating || "N/A"}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-muted-foreground">Seller Rating</span>
              <div className="flex items-center gap-1 font-bold text-foreground">
                <Star weight="fill" className="text-warning h-4 w-4" /> {user.sellerRating || "N/A"}
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckCircle weight="fill" className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-foreground uppercase tracking-wider">KYC Status</span>
                <span className="text-[12px] font-medium text-muted-foreground">{user.verified ? "Fully Verified" : "Action Required"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WalletTab({ user }: { user: UserData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Available Balance" value={`$${user.walletBalance.toLocaleString()}`} icon={<Money weight="fill" />} iconContainerClassName="bg-[#ECFDF3] text-[#16A34A]" className="bg-white" />
        <StatCard title="Protected Funds" value={`$${user.heldFunds.toLocaleString()}`} icon={<LockKey weight="fill" />} iconContainerClassName="bg-[#EFF6FF] text-[#2563EB]" className="bg-white" />
        <StatCard title="Total Released" value={`$${user.releasedFunds.toLocaleString()}`} icon={<Handshake weight="fill" />} iconContainerClassName="bg-[#ECFDF3] text-[#16A34A]" className="bg-white" />
        <StatCard title="Total Withdrawn" value={`$${user.withdrawn.toLocaleString()}`} icon={<ArrowUpRight weight="fill" />} iconContainerClassName="bg-[#F3F4F6] text-[#6B7280]" className="bg-white" />
      </div>

      <div className="bg-white border border-[#EEF2F7] rounded-[20px] shadow-sm flex flex-col space-y-0 overflow-hidden">
        <div className="p-6 border-b border-[#EEF2F7]">
          <h3 className="font-bold text-foreground">Wallet History</h3>
        </div>
        <DataTable className="border-0 shadow-none bg-transparent rounded-none" rowClassName="h-[56px] hover:bg-[#F8FAFC] border-b border-[#EEF2F7] transition-all duration-150" 
          columns={[
            { header: "Date", accessor: "date", cell: (row: any) => <span className="text-[13px] font-medium text-[#475569]">{row.date}</span> },
            { header: "Type", accessor: "paymentType", cell: (row: any) => <span className="text-[13px] font-medium text-[#111827]">{row.paymentType}</span> },
            { header: "Amount", cell: (row) => <span className="text-[14px] font-bold text-[#111827]">${typeof row.amount === 'number' ? row.amount.toLocaleString(undefined, {minimumFractionDigits: 2}) : row.amount}</span> },
            { header: "Reference", cell: (row) => <span className="text-[12px] font-mono text-[#64748B]">{row.reference}</span> },
            { header: "Status", cell: (row) => <StatusBadge status={row.status} /> }
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
  const [amountFilter, setAmountFilter] = React.useState("all")
  const [dateFilter, setDateFilter] = React.useState("all")

  const handleResetFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setAmountFilter("all")
    setDateFilter("all")
  }

  const columns = [
    {
      header: "Deal ID",
      accessor: "id",
      cell: (row: any) => <span className="text-[13px] font-bold text-[#111827]">{row.id}</span>
    },
    {
      header: "Item",
      accessor: "item",
      cell: (row: any) => (
        <span className="text-[13px] font-semibold text-[#111827] truncate max-w-[180px] block">
          {row.item}
        </span>
      )
    },
    {
      header: "Buyer",
      accessor: "buyer",
      cell: (row: any) => <span className="text-[13px] font-medium text-[#111827]">{row.buyer}</span>
    },
    {
      header: "Seller",
      accessor: "seller",
      cell: (row: any) => <span className="text-[13px] font-medium text-[#111827]">{row.seller}</span>
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
              View Deal Details
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
        <div className="flex flex-wrap items-center gap-3">
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
            <SelectTrigger className="h-[38px] w-[140px] bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-[10px] text-[13px] font-semibold focus:ring-0 focus:ring-offset-0 shadow-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-[12px] p-1 border-[#E2E8F0] shadow-lg">
              <SelectItem value="all" className="rounded-md text-[13px] font-semibold">All Statuses</SelectItem>
              <SelectItem value="active" className="rounded-md text-[13px] font-semibold">Active</SelectItem>
              <SelectItem value="completed" className="rounded-md text-[13px] font-semibold">Completed</SelectItem>
              <SelectItem value="disputed" className="rounded-md text-[13px] font-semibold">Disputed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={amountFilter} onValueChange={setAmountFilter}>
            <SelectTrigger className="h-[38px] w-[140px] bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-[10px] text-[13px] font-semibold focus:ring-0 focus:ring-offset-0 shadow-sm">
              <SelectValue placeholder="Amount" />
            </SelectTrigger>
            <SelectContent className="rounded-[12px] p-1 border-[#E2E8F0] shadow-lg">
              <SelectItem value="all" className="rounded-md text-[13px] font-semibold">Any Amount</SelectItem>
              <SelectItem value=">1000" className="rounded-md text-[13px] font-semibold">&gt; $1,000</SelectItem>
              <SelectItem value=">10000" className="rounded-md text-[13px] font-semibold">&gt; $10,000</SelectItem>
            </SelectContent>
          </Select>

          {(statusFilter !== "all" || amountFilter !== "all" || dateFilter !== "all" || search !== "") && (
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
  const columns = [
    { header: "Transaction ID", accessor: "id", cell: (r: any) => <span className="text-[13px] font-semibold text-[#111827]">{r.id}</span> },
    { header: "Deal ID", accessor: "dealId", cell: (r: any) => <span className="text-[13px] font-medium text-[#64748B]">{r.dealId}</span> },
    { header: "Type", accessor: "paymentType", cell: (r: any) => <span className="text-[13px] font-medium text-[#475569]">{r.paymentType}</span> },
    { header: "Amount", cell: (r: any) => <span className="text-[14px] font-bold text-[#111827]">${typeof r.amount === 'number' ? r.amount.toLocaleString(undefined, {minimumFractionDigits: 2}) : r.amount}</span> },
    { header: "Platform Fee", cell: (r: any) => <span className="text-[13px] font-medium text-[#475569]">${r.fee || "0.00"}</span> },
    { header: "Created", accessor: "date", cell: (r: any) => <span className="text-[13px] font-medium text-[#475569]">{r.date}</span> },
    { header: "Status", cell: (r: any) => <StatusBadge status={r.status} /> },
    {
      header: "",
      accessor: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[8px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] data-[state=open]:bg-[#F1F5F9]" onClick={(e) => e.stopPropagation()}>
              <DotsThree weight="bold" className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px] rounded-[12px] p-1.5 shadow-xl border-[#EEF2F7]">
            <DropdownMenuItem className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2">
              View Receipt
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

function ActivityTab() {
  return (
    <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-sm flex flex-col">
      <h3 className="text-[14px] font-bold text-foreground mb-8">Account Activity</h3>
      <Timeline items={mockActivity as any} className="ml-2" />
    </div>
  )
}
