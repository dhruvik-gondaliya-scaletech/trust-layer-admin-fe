import * as React from "react"
import { DataTable } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PageTabs } from "@/components/ui/page-tabs"
import { 
  MagnifyingGlass, DotsThree, Plus, ShieldCheck,
  SquaresFour, Briefcase, ChartLineUp, WarningCircle, Users, 
  IdentificationCard, ChartBar, Gear, Bell
} from "@phosphor-icons/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// --- Mock Data: Users ---
type AdminUser = {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: "Active" | "Inactive" | "Suspended"
  lastLogin: string
  created: string
}

const mockAdminUsers: AdminUser[] = [
  { id: "1", name: "Eric Mills", email: "eric.mills@trustlayer.com", phone: "+1 (555) 010-2934", role: "Super Admin", status: "Active", lastLogin: "2 mins ago", created: "Jan 12, 2026" },
  { id: "2", name: "Sarah Connor", email: "sarah.c@trustlayer.com", phone: "+1 (555) 234-5678", role: "Finance Admin", status: "Active", lastLogin: "1 hour ago", created: "Feb 03, 2026" },
  { id: "3", name: "John Smith", email: "john.s@trustlayer.com", phone: "+1 (555) 987-6543", role: "Operations Admin", status: "Inactive", lastLogin: "3 days ago", created: "Mar 15, 2026" },
  { id: "4", name: "Alice Johnson", email: "alice.j@trustlayer.com", phone: "+1 (555) 111-2222", role: "Dispute Manager", status: "Active", lastLogin: "Today", created: "Apr 22, 2026" },
  { id: "5", name: "Bob Williams", email: "bob.w@trustlayer.com", phone: "+1 (555) 333-4444", role: "Compliance Manager", status: "Suspended", lastLogin: "1 week ago", created: "May 05, 2026" },
]

// --- Mock Data: Roles ---
type RoleData = {
  id: string
  role: string
  description: string
  members: number
  permissionCount: string | number
  status: "Active" | "Inactive"
  updated: string
}

const mockRoles: RoleData[] = [
  { id: "1", role: "Super Admin", description: "Full platform access. Everything enabled.", members: 2, permissionCount: "All", status: "Active", updated: "Jul 05, 2026" },
  { id: "2", role: "Operations Admin", description: "Manage day-to-day platform operations.", members: 5, permissionCount: 26, status: "Active", updated: "Jul 01, 2026" },
  { id: "3", role: "Finance Admin", description: "Manage transactions, refunds, and reports.", members: 2, permissionCount: 18, status: "Active", updated: "Jun 28, 2026" },
  { id: "4", role: "Dispute Manager", description: "Review and resolve active deal disputes.", members: 3, permissionCount: 21, status: "Active", updated: "Jun 15, 2026" },
  { id: "5", role: "Compliance Manager", description: "Verify users and oversee risk limits.", members: 2, permissionCount: 17, status: "Active", updated: "May 20, 2026" },
  { id: "6", role: "Support Agent", description: "Read-only access to assist platform users.", members: 6, permissionCount: 12, status: "Active", updated: "Apr 10, 2026" },
]

const permissionModules = [
  { id: "dashboard", name: "Dashboard", icon: SquaresFour, perms: ["View Dashboard"] },
  { id: "deals", name: "Deals", icon: Briefcase, perms: ["View", "Create", "Edit", "Delete", "Export", "Refund", "Release Funds"] },
  { id: "transactions", name: "Transactions", icon: ChartLineUp, perms: ["View", "Export", "Refund", "Release Funds", "Cancel Transaction"] },
  { id: "disputes", name: "Disputes", icon: WarningCircle, perms: ["View", "Review", "Escalate", "Resolve", "Refund", "Reject"] },
  { id: "users", name: "Users", icon: Users, perms: ["View", "Create", "Edit", "Suspend", "Verify", "Delete", "Export"] },
  { id: "admin_users", name: "Admin Users", icon: IdentificationCard, perms: ["View", "Create", "Edit", "Delete"] },
  { id: "roles", name: "Roles", icon: ShieldCheck, perms: ["View", "Create", "Edit", "Delete"] },
  { id: "reports", name: "Reports", icon: ChartBar, perms: ["View", "Export"] },
  { id: "notifications", name: "Notifications", icon: Bell, perms: ["View", "Send"] },
  { id: "settings", name: "Settings", icon: Gear, perms: ["View", "Edit"] },
  { id: "compliance", name: "Compliance", icon: WarningCircle, perms: ["View", "Edit", "Export"] },
  { id: "system_config", name: "System Configuration", icon: Gear, perms: ["View", "Edit"] }
]

// --- Shared Components ---
function UserStatusBadge({ status }: { status: AdminUser["status"] }) {
  const getBadgeStyle = () => {
    switch (status) {
      case "Active": return "bg-[#ECFDF5] text-[#059669]" // Green
      case "Inactive": return "bg-[#F1F5F9] text-[#64748B]" // Gray
      case "Suspended": return "bg-[#FEF2F2] text-[#DC2626]" // Red
      default: return "bg-[#F1F5F9] text-[#64748B]"
    }
  }
  return (
    <span className={cn("inline-flex items-center justify-center rounded-full px-[12px] h-[26px] text-[12px] font-medium", getBadgeStyle())}>
      {status}
    </span>
  )
}

function RoleStatusBadge({ status }: { status: RoleData["status"] }) {
  const getBadgeStyle = () => {
    switch (status) {
      case "Active": return "bg-[#ECFDF5] text-[#059669]" // Green
      case "Inactive": return "bg-[#F1F5F9] text-[#64748B]" // Gray
      default: return "bg-[#F1F5F9] text-[#64748B]"
    }
  }
  return (
    <span className={cn("inline-flex items-center justify-center rounded-full px-[12px] h-[26px] text-[12px] font-medium", getBadgeStyle())}>
      {status}
    </span>
  )
}

function ModuleCard({ 
  module, selected, onTogglePerm, onToggleAll
}: { 
  module: typeof permissionModules[0], selected: string[], onTogglePerm: (perm: string) => void, onToggleAll: () => void
}) {
  const allSelected = selected.length === module.perms.length && module.perms.length > 0;
  return (
    <div className="bg-white border border-[#E8EDF7] rounded-[14px] p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 border-b border-[#EEF2F7] pb-3">
        <Checkbox
          checked={allSelected}
          onCheckedChange={onToggleAll}
          id={`select-all-${module.id}`}
        />
        <Label htmlFor={`select-all-${module.id}`} className="text-[16px] font-semibold text-[#0F172A] cursor-pointer">
          {module.name}
        </Label>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3 mt-1">
        {module.perms.map(perm => {
          const isSelected = selected.includes(perm)
          return (
            <div key={perm} className="flex items-center gap-2">
              <Checkbox 
                checked={isSelected}
                onCheckedChange={() => onTogglePerm(perm)}
                id={`perm-${module.id}-${perm}`}
              />
              <Label htmlFor={`perm-${module.id}-${perm}`} className="text-[13px] font-medium text-[#475569] cursor-pointer">
                {perm}
              </Label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// --- Main Page Component ---
export function AdminUsersPage() {
  const [activeTab, setActiveTab] = React.useState("users")
  
  // Modal states
  const [isAddUserOpen, setIsAddUserOpen] = React.useState(false)
  const [isCreateRoleOpen, setIsCreateRoleOpen] = React.useState(false)

  // Users Tab Filters
  const [search, setSearch] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")

  // Roles Tab Modal State
  const [selectedPerms, setSelectedPerms] = React.useState<Record<string, string[]>>({})

  // Derived state
  const filteredUsers = mockAdminUsers.filter(user => {
    if (roleFilter !== "all" && user.role !== roleFilter) return false
    if (statusFilter !== "all" && user.status.toLowerCase() !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!user.name.toLowerCase().includes(q) && !user.email.toLowerCase().includes(q)) {
        return false
      }
    }
    return true
  })
  
  const totalPermissions = Object.values(selectedPerms).reduce((acc, curr) => acc + curr.length, 0)

  // Handlers
  const handleResetFilters = () => {
    setSearch("")
    setRoleFilter("all")
    setStatusFilter("all")
  }

  const togglePerm = (moduleId: string, perm: string) => {
    setSelectedPerms(prev => {
      const modPerms = prev[moduleId] || []
      if (modPerms.includes(perm)) {
        return { ...prev, [moduleId]: modPerms.filter(p => p !== perm) }
      } else {
        return { ...prev, [moduleId]: [...modPerms, perm] }
      }
    })
  }

  const toggleAllPerms = (moduleId: string) => {
    const module = permissionModules.find(m => m.id === moduleId)!
    setSelectedPerms(prev => {
      const modPerms = prev[moduleId] || []
      if (modPerms.length === module.perms.length) {
        return { ...prev, [moduleId]: [] }
      } else {
        return { ...prev, [moduleId]: [...module.perms] }
      }
    })
  }

  const grantAll = () => {
    const allPerms: Record<string, string[]> = {}
    permissionModules.forEach(m => { allPerms[m.id] = [...m.perms] })
    setSelectedPerms(allPerms)
  }

  const revokeAll = () => setSelectedPerms({})

  // Columns for Users Table
  const userColumns = [
    {
      header: "Name",
      accessor: "name",
      cell: (row: AdminUser) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 shrink-0 rounded-[10px] border border-border/50 bg-[#F8FAFC]">
            <AvatarFallback className="text-[13px] font-bold text-primary bg-transparent">
              {row.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-[#111827]">{row.name}</span>
          </div>
        </div>
      )
    },
    { header: "Email", accessor: "email", cell: (row: AdminUser) => <span className="text-[13px] font-medium text-[#475569]">{row.email}</span> },
    { header: "Phone", accessor: "phone", cell: (row: AdminUser) => <span className="text-[13px] font-medium text-[#475569]">{row.phone}</span> },
    { header: "Role", accessor: "role", cell: (row: AdminUser) => <span className="text-[13px] font-medium text-[#111827]">{row.role}</span> },
    { header: "Status", accessor: "status", cell: (row: AdminUser) => <UserStatusBadge status={row.status} /> },
    { header: "Last Login", accessor: "lastLogin", cell: (row: AdminUser) => <span className="text-[13px] font-medium text-[#475569]">{row.lastLogin}</span> },
    { header: "Created", accessor: "created", cell: (row: AdminUser) => <span className="text-[13px] font-medium text-[#475569]">{row.created}</span> },
    {
      header: "",
      accessor: "id",
      cell: (row: AdminUser) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[8px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] data-[state=open]:bg-[#F1F5F9]">
              <DotsThree weight="bold" className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px] rounded-[12px] p-1.5 shadow-xl border-[#EEF2F7]">
            <DropdownMenuItem className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2">View</DropdownMenuItem>
            <DropdownMenuItem className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2">Edit</DropdownMenuItem>
            <DropdownMenuItem className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2">Reset Password</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#EEF2F7] my-1" />
            {row.role !== "Super Admin" && (
              <>
                <DropdownMenuItem className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2 text-destructive focus:text-destructive focus:bg-destructive/10">Disable</DropdownMenuItem>
                <DropdownMenuItem className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2 text-destructive focus:text-destructive focus:bg-destructive/10">Delete</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  // Columns for Roles Table
  const roleColumns = [
    { header: "Role", accessor: "role", cell: (row: RoleData) => <span className="text-[14px] font-bold text-[#111827]">{row.role}</span> },
    { header: "Description", accessor: "description", cell: (row: RoleData) => <span className="text-[13px] font-medium text-[#475569] block max-w-[280px] truncate">{row.description}</span> },
    { header: "Members", accessor: "members", cell: (row: RoleData) => <span className="text-[13px] font-bold text-[#111827]">{row.members}</span> },
    { header: "Permissions", accessor: "permissionCount", cell: (row: RoleData) => <span className="text-[13px] font-bold text-[#111827] bg-[#F8FAFC] px-2 py-1 rounded-md border border-[#EEF2F7]">{row.permissionCount}</span> },
    { header: "Status", accessor: "status", cell: (row: RoleData) => <RoleStatusBadge status={row.status} /> },
    { header: "Updated", accessor: "updated", cell: (row: RoleData) => <span className="text-[13px] font-medium text-[#475569]">{row.updated}</span> },
    {
      header: "",
      accessor: "id",
      cell: (row: RoleData) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[8px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] data-[state=open]:bg-[#F1F5F9]">
              <DotsThree weight="bold" className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px] rounded-[12px] p-1.5 shadow-xl border-[#EEF2F7]">
            <DropdownMenuItem className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2">Edit Role</DropdownMenuItem>
            <DropdownMenuItem className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2">Duplicate</DropdownMenuItem>
            {row.role !== "Super Admin" && (
              <>
                <DropdownMenuSeparator className="bg-[#EEF2F7] my-1" />
                <DropdownMenuItem className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2 text-destructive focus:text-destructive focus:bg-destructive/10">Disable</DropdownMenuItem>
                <DropdownMenuItem className="rounded-[8px] text-[13px] font-medium cursor-pointer py-2 text-destructive focus:text-destructive focus:bg-destructive/10">Delete</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <div className="h-full w-full space-y-6 2xl:space-y-8 flex flex-col">
      {/* Page Header & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-[24px] font-bold tracking-tight text-[#0F172A]">Admin Users</h1>
          <p className="text-[14px] font-medium text-muted-foreground">Manage platform administrators, roles, and access permissions.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            className="gap-2 h-[42px] font-semibold rounded-[10px] px-5 bg-white text-[#0F172A] border border-[#EEF2F7] hover:bg-[#F8FAFC] shadow-sm transition-all"
            onClick={() => setIsCreateRoleOpen(true)}
          >
            <Plus weight="bold" className="h-[18px] w-[18px]" />
            Create Role
          </Button>
          <Button 
            className="gap-2 h-[42px] font-semibold rounded-[10px] px-5 transition-all shadow-sm"
            onClick={() => setIsAddUserOpen(true)}
          >
            <Plus weight="bold" className="h-[18px] w-[18px]" />
            Add Admin User
          </Button>
        </div>
      </div>

      <PageTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        tabs={[
          { id: "users", label: "Users" },
          { id: "roles", label: "Roles" },
        ]} 
      />

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="bg-white border border-[#EEF2F7] rounded-[20px] shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col flex-1">
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-4 bg-[#FAFBFD] rounded-[14px] p-4 border border-[#EEF2F7]">
              {/* Search Box */}
              <div className="relative w-full sm:w-[320px]">
                <MagnifyingGlass weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search administrators..."
                  className="pl-[38px] h-[42px] w-full rounded-[10px] bg-white border border-[#EEF2F7] shadow-sm text-[14px] font-medium transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary placeholder:text-[14px] placeholder:font-normal placeholder:text-muted-foreground/70"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Operations Admin">Operations Admin</SelectItem>
                  <SelectItem value="Finance Admin">Finance Admin</SelectItem>
                  <SelectItem value="Dispute Manager">Dispute Manager</SelectItem>
                  <SelectItem value="Compliance Manager">Compliance Manager</SelectItem>
                  <SelectItem value="Support Agent">Support Agent</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>

              {(roleFilter !== "all" || statusFilter !== "all" || search !== "") && (
                <div className="flex gap-2 ml-1">
                  <Button 
                    variant="ghost" 
                    onClick={handleResetFilters}
                    className="h-[42px] text-[14px] font-bold text-[#0F62FE] hover:bg-[#0F62FE]/10 rounded-[10px] px-4 transition-colors"
                  >
                    Reset
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 border-t border-[#EEF2F7]">
            <DataTable 
              columns={userColumns} 
              data={filteredUsers} 
              className="border-0 shadow-none bg-transparent rounded-none"
              rowClassName="h-[56px] hover:bg-[#F8FAFF] border-b border-[#EEF2F7] transition-all duration-150"
              pagination={true}
            />
          </div>
        </div>
      )}

      {/* Roles Tab */}
      {activeTab === "roles" && (
        <div className="flex flex-col gap-8">
          <div className="bg-white border border-[#EEF2F7] rounded-[20px] shadow-[0_8px_30px_rgba(15,23,42,0.05)] overflow-hidden">
            <DataTable 
              columns={roleColumns} 
              data={mockRoles} 
              className="border-0 shadow-none bg-transparent rounded-none"
              rowClassName="h-[64px] hover:bg-[#F8FAFF] border-b border-[#EEF2F7] transition-all duration-150"
              pagination={false}
            />
          </div>
        </div>
      )}

      {/* --- Modals --- */}
      
      {/* Add Admin User Modal */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="max-w-[500px] p-0 rounded-[20px] border-[#EEF2F7] shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
          <DialogHeader className="px-6 py-5 border-b border-[#EEF2F7] bg-[#F8FAFC] shrink-0">
            <DialogTitle className="text-[18px] font-bold text-[#0F172A]">Add Admin User</DialogTitle>
            <p className="text-[13px] text-muted-foreground mt-1 font-medium">Create a new administrator account and assign roles.</p>
          </DialogHeader>

          <div className="overflow-y-auto flex-1 p-6 space-y-5 bg-white">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-[#475569]">First Name</Label>
                <Input placeholder="Enter first name" className="h-[42px] rounded-[10px]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-[#475569]">Last Name</Label>
                <Input placeholder="Enter last name" className="h-[42px] rounded-[10px]" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-semibold text-[#475569]">Email</Label>
              <Input type="email" placeholder="admin@trustlayer.com" className="h-[42px] rounded-[10px]" />
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-semibold text-[#475569]">Phone Number</Label>
              <Input type="tel" placeholder="+1 (555) 000-0000" className="h-[42px] rounded-[10px]" />
            </div>

            <div className="space-y-2">
              <Label className="text-[13px] font-semibold text-[#475569]">Role</Label>
              <Select>
                <SelectTrigger className="w-full h-[42px] rounded-[10px]">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Operations Admin">Operations Admin</SelectItem>
                  <SelectItem value="Finance Admin">Finance Admin</SelectItem>
                  <SelectItem value="Dispute Manager">Dispute Manager</SelectItem>
                  <SelectItem value="Compliance Manager">Compliance Manager</SelectItem>
                  <SelectItem value="Support Agent">Support Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#EEF2F7] flex items-center justify-end gap-3 shrink-0 rounded-b-[20px]">
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)} className="h-[42px] rounded-[10px] font-semibold bg-white shadow-sm hover:bg-[#F1F5F9]">
              Cancel
            </Button>
            <Button onClick={() => setIsAddUserOpen(false)} className="h-[42px] rounded-[10px] font-semibold shadow-sm">
              Create User
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Role Modal */}
      <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
        <DialogContent className="max-w-[700px] p-0 rounded-[20px] border-[#EEF2F7] shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
          <DialogHeader className="px-6 py-5 border-b border-[#EEF2F7] bg-[#F8FAFC] shrink-0">
            <DialogTitle className="text-[18px] font-bold text-[#0F172A]">Create Role</DialogTitle>
            <p className="text-[13px] text-muted-foreground mt-1 font-medium">Define a new administrator role and configure platform permissions.</p>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 p-6 space-y-6 2xl:space-y-8 bg-white">
            {/* Section 1: Basic Information */}
            <div className="space-y-4">
              <h3 className="text-[15px] font-bold text-[#0F172A] border-b border-[#EEF2F7] pb-2">Basic Information</h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2 col-span-2">
                  <Label className="text-[13px] font-semibold text-[#475569]">Role Name <span className="text-red-500">*</span></Label>
                  <Input placeholder="e.g. Operations Manager" className="h-[42px] rounded-[10px]" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label className="text-[13px] font-semibold text-[#475569]">Description</Label>
                  <textarea placeholder="Describe the responsibilities of this role." className="flex min-h-[80px] w-full rounded-[10px] border border-[#EEF2F7] bg-white px-3 py-2 text-[14px] shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none" />
                </div>
              </div>
            </div>

            {/* Section 2: Permissions */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EEF2F7] pb-3 gap-3">
                <h3 className="text-[15px] font-bold text-[#0F172A]">Permissions Configuration</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="ghost" onClick={grantAll} className="h-8 px-2 rounded-[6px] text-[12px] font-semibold text-[#059669] hover:bg-[#ECFDF5]">Grant All</Button>
                  <Button variant="ghost" onClick={revokeAll} className="h-8 px-2 rounded-[6px] text-[12px] font-semibold text-[#DC2626] hover:bg-[#FEF2F2]">Revoke All</Button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {permissionModules
                  .map(module => (
                  <ModuleCard 
                    key={module.id} 
                    module={module} 
                    selected={selectedPerms[module.id] || []}
                    onTogglePerm={(perm) => togglePerm(module.id, perm)}
                    onToggleAll={() => toggleAllPerms(module.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#EEF2F7] flex items-center justify-between shrink-0 rounded-b-[20px]">
            <div className="bg-white border border-[#EEF2F7] px-3 py-1.5 rounded-lg text-[13px] font-semibold text-[#0F172A] shadow-sm">
              <span className="text-primary">{totalPermissions}</span> Permissions Enabled
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)} className="h-[42px] rounded-[10px] font-semibold bg-white shadow-sm hover:bg-[#F1F5F9]">
                Cancel
              </Button>
              <Button onClick={() => setIsCreateRoleOpen(false)} className="h-[42px] rounded-[10px] font-semibold shadow-sm">
                Create Role
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}
