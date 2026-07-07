import * as React from "react"
import { ArrowLeft, CheckCircle, MapPin, Clock, Desktop, Browser, Key, DeviceMobile } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { PageTabs } from "@/components/ui/page-tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function StatusBadge() {
  return (
    <div className="inline-flex items-center justify-center rounded-full bg-success/10 px-2.5 py-0.5 text-success">
      <span className="text-[12px] font-bold">Active</span>
    </div>
  )
}

export function ProfileDetails() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = React.useState("overview")

  return (
    <div className="flex flex-col h-full w-full space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="h-9 w-9 rounded-full bg-white border border-[#EEF2F7] shadow-sm hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <PageHeader 
          title="Profile" 
          className="mb-0"
        />
        <p className="text-[14px] text-muted-foreground ml-2">Manage your personal information, account settings and security.</p>
      </div>

      {/* Profile Card Header - Matching UserDetails */}
      <div className="bg-white border border-[#EEF2F7] rounded-[20px] p-5 shadow-sm flex flex-col md:flex-row gap-5 items-start md:items-center">
        <Avatar className="h-20 w-20 rounded-xl border-2 border-border/50 shadow-sm">
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-[20px] rounded-xl">
            EM
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-[22px] font-bold text-foreground">Eric Mills</h2>
            <StatusBadge />
          </div>
          <div className="flex items-center gap-4 text-[13px] font-medium text-muted-foreground">
            <span className="font-bold text-primary">Super Admin</span>
            <span>•</span>
            <span>admin@trustlayer.com</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-[13px] font-medium text-muted-foreground">Last Login</span>
          <span className="text-[15px] font-bold text-foreground">Today, 12:24 PM</span>
          <div className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground mt-1">
            <span className="font-mono font-bold bg-muted px-2 py-0.5 rounded-md text-foreground">ID: ADM-9901</span>
          </div>
        </div>
      </div>

      <PageTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        className="top-[72px]"
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "security", label: "Security" },
        ]} 
      />

      <div className="w-full">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "security" && <SecurityTab />}
      </div>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Personal Information (70%) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#EEF2F7] rounded-[16px] p-6 shadow-sm flex flex-col gap-6 h-full relative">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-foreground m-0">
                Personal Information
              </h3>
              <Button variant="outline" className="h-8 text-[12px] rounded-lg font-bold">Edit Profile</Button>
            </div>
            
            <div className="flex flex-col gap-6 w-full pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EEF2F7] pb-4">
                <span className="text-[13px] font-medium text-[#6B7280]">First Name</span>
                <span className="text-[15px] font-medium text-[#111827]">Eric</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EEF2F7] pb-4">
                <span className="text-[13px] font-medium text-[#6B7280]">Last Name</span>
                <span className="text-[15px] font-medium text-[#111827]">Mills</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EEF2F7] pb-4">
                <span className="text-[13px] font-medium text-[#6B7280]">Email Address</span>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-medium text-[#111827]">admin@trustlayer.com</span>
                  <div className="flex items-center gap-1 text-[#16A34A] text-[12px] font-bold bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                    <CheckCircle weight="fill" className="h-3.5 w-3.5" /> Verified
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EEF2F7] pb-4">
                <span className="text-[13px] font-medium text-[#6B7280]">Phone Number</span>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-medium text-[#111827]">+1 (555) 019-2834</span>
                  <div className="flex items-center gap-1 text-[#16A34A] text-[12px] font-bold bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                    <CheckCircle weight="fill" className="h-3.5 w-3.5" /> Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Photo & Quick Info (30%) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-[#EEF2F7] rounded-[16px] p-6 shadow-sm flex flex-col gap-6 items-center text-center">
            <h3 className="text-[14px] font-bold text-foreground w-full text-left m-0">Profile Photo</h3>
            <Avatar className="h-24 w-24 rounded-full border border-border shadow-sm">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-[24px]">EM</AvatarFallback>
            </Avatar>
            <div className="flex w-full gap-3 mt-2">
              <Button className="flex-1 text-[13px] rounded-xl h-9 font-bold" variant="default">Upload Photo</Button>
              <Button className="flex-1 text-[13px] rounded-xl h-9 font-bold text-destructive hover:text-destructive focus:text-destructive hover:bg-destructive/10" variant="outline">Remove Photo</Button>
            </div>
          </div>

          <div className="bg-white border border-[#EEF2F7] rounded-[16px] p-6 shadow-sm flex flex-col gap-6">
            <h3 className="text-[16px] font-bold text-foreground m-0">Account Summary</h3>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-muted-foreground">Role</span>
                <span className="text-[14px] font-bold text-foreground">Super Admin</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-muted-foreground">Status</span>
                <StatusBadge />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-muted-foreground">Permissions</span>
                <span className="text-[14px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">Full Access</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-muted-foreground">Member Since</span>
                <span className="text-[14px] font-bold text-foreground">Mar 2024</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#EEF2F7]">
                <span className="text-[13px] font-medium text-muted-foreground">Last Login</span>
                <div className="text-right flex flex-col items-end">
                  <span className="text-[14px] font-bold text-foreground">Today</span>
                  <span className="text-[12px] font-medium text-muted-foreground">12:24 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#EEF2F7] rounded-[16px] p-6 shadow-sm flex flex-col justify-between h-full">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-[16px] font-bold text-foreground m-0">Password</h3>
            </div>
            <p className="text-[13px] text-muted-foreground font-medium">Last changed 3 months ago</p>
            <div className="text-[24px] font-bold tracking-widest pt-2 text-[#111827]">••••••••••</div>
          </div>
          <div className="mt-6">
            <Button variant="outline" className="h-9 text-[13px] rounded-lg font-bold">Change Password</Button>
          </div>
        </div>

        <div className="bg-white border border-[#EEF2F7] rounded-[16px] p-6 shadow-sm flex flex-col justify-between h-full">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DeviceMobile className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-[16px] font-bold text-foreground m-0">Two Factor Authentication</h3>
            </div>
            <p className="text-[13px] text-muted-foreground font-medium">Add an extra layer of security to your account.</p>
            <div className="pt-2">
              <div className="inline-flex items-center justify-center rounded-full bg-success/10 px-2.5 py-0.5 text-success">
                <span className="text-[12px] font-bold">Enabled</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button variant="outline" className="h-9 text-[13px] rounded-lg font-bold">Manage</Button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#EEF2F7] rounded-[16px] p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[16px] font-bold text-foreground m-0">Login Sessions</h3>
            <p className="text-[13px] text-muted-foreground font-medium mt-1">Review your active sessions across devices.</p>
          </div>
          <Button variant="outline" className="h-9 text-[13px] rounded-lg font-bold text-destructive hover:text-destructive hover:bg-destructive/5">Sign Out Other Sessions</Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border border-[#EEF2F7] p-4 rounded-[12px]">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Desktop className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] text-foreground">MacBook Pro 16"</span>
                  <span className="text-[11px] font-bold bg-success/10 text-success px-2 py-0.5 rounded-full">Current Session</span>
                </div>
                <div className="flex items-center gap-3 text-[13px] font-medium text-muted-foreground">
                  <span className="flex items-center gap-1"><Browser className="h-4 w-4" /> Chrome</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> San Francisco, CA</span>
                </div>
              </div>
            </div>
            <div className="text-[13px] font-medium text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" /> Active Now
            </div>
          </div>

          <div className="flex items-center justify-between border border-[#EEF2F7] p-4 rounded-[12px]">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                <DeviceMobile className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-[14px] text-foreground">iPhone 14 Pro</span>
                <div className="flex items-center gap-3 text-[13px] font-medium text-muted-foreground">
                  <span className="flex items-center gap-1"><Browser className="h-4 w-4" /> Safari</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> San Jose, CA</span>
                </div>
              </div>
            </div>
            <div className="text-[13px] font-medium text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" /> 2 hours ago
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
