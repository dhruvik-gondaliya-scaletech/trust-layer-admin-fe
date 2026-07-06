import * as React from "react"
import { EmptyState } from "@/components/ui/empty-state"
import { PageHeader } from "@/components/ui/page-header"
import { Gear } from "@phosphor-icons/react"
import { PageTabs } from "@/components/ui/page-tabs"

export { Dashboard } from "./Dashboard"

export { UsersList } from "./users/UsersList"
export { UserDetails } from "./users/UserDetails"

export { DealsList } from "./deals/DealsList"
export { DealDetails } from "./deals/DealDetails"

export { TransactionsList } from "./transactions/TransactionsList"
export { TransactionDetails } from "./transactions/TransactionDetails"

export { DisputesList } from "./disputes/DisputesList"
export { DisputeDetails } from "./disputes/DisputeDetails"

export function Settings() {
  const [activeTab, setActiveTab] = React.useState("general")

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Configure platform fees, integrations, and security." />
      <PageTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        tabs={[
          { id: "general", label: "General" },
          { id: "fees", label: "Platform Fees" },
          { id: "notifications", label: "Notifications" },
          { id: "security", label: "Security" },
        ]} 
      />
      <EmptyState
        title="Platform Settings"
        description={`This module is under construction. Currently viewing: ${activeTab}`}
        icon={<Gear weight="fill" className="h-8 w-8 text-muted-foreground/50" />}
      />
    </div>
  )
}
