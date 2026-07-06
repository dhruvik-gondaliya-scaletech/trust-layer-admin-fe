import { PageHeader } from "@/components/ui/page-header"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { StatCard } from "@/components/ui/stat-card"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bank,
  WarningCircle,
  User,
  ArrowRight
} from "@phosphor-icons/react"

export function DesignSystem() {
  return (
    <div className="space-y-12 pb-12">
      <PageHeader 
        title="Operations Design System" 
        description="The single source of truth for all TrustLayer Operations UI components."
      />

      {/* Colors Section */}
      <section>
        <SectionHeader title="Color Palette" description="Semantic tokens used across the platform." />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="space-y-2">
            <div className="h-16 rounded-md bg-primary shadow-sm" />
            <p className="text-sm font-bold text-center">Primary</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-md bg-success shadow-sm" />
            <p className="text-sm font-bold text-center">Success</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-md bg-warning shadow-sm" />
            <p className="text-sm font-bold text-center">Warning</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-md bg-destructive shadow-sm" />
            <p className="text-sm font-bold text-center">Danger</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-md bg-info shadow-sm" />
            <p className="text-sm font-bold text-center">Info</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-md bg-protected shadow-sm" />
            <p className="text-sm font-bold text-center">Protected</p>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section>
        <SectionHeader title="Typography" description="Font scales and weights." />
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">H1 / Page Title</span>
              <h1 className="text-[24px] font-bold tracking-tight text-foreground">The quick brown fox jumps over the lazy dog.</h1>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">H2 / Section Title</span>
              <h2 className="text-[24px] font-bold tracking-tight text-foreground">The quick brown fox jumps over the lazy dog.</h2>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Body</span>
              <p className="text-[14px] font-medium text-muted-foreground">The quick brown fox jumps over the lazy dog.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Buttons & Inputs */}
      <section>
        <SectionHeader title="Buttons & Inputs" description="Interactive elements with 12px border radius." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-sm uppercase text-muted-foreground">Buttons</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon"><ArrowRight weight="bold" /></Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm uppercase text-muted-foreground">Inputs</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Default text input..." />
              <Input type="password" placeholder="Password..." />
              <Input disabled placeholder="Disabled input..." />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Status Badges */}
      <section>
        <SectionHeader title="Status Badges" description="Reusable semantic badges (9999px radius)." />
        <Card>
          <CardContent className="p-6 flex flex-wrap gap-4">
            <StatusBadge status="active" />
            <StatusBadge status="inactive" />
            <StatusBadge status="verified" />
            <StatusBadge status="pending" />
            <StatusBadge status="funded" />
            <StatusBadge status="paid" />
            <StatusBadge status="released" />
            <StatusBadge status="disputed" />
            <StatusBadge status="returned" />
            <StatusBadge status="refunded" />
            <StatusBadge status="cancelled" />
            <StatusBadge status="completed" />
            <StatusBadge status="draft" />
            <StatusBadge status="Protected" />
          </CardContent>
        </Card>
      </section>

      {/* Cards */}
      <section>
        <SectionHeader title="Cards & Shadows" description="16px radius with soft premium shadows." />
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard 
            title="Total Protected Funds" 
            value="$4.2M" 
            trend={12} 
            trendLabel="vs last month"
            icon={<Bank weight="fill" />}
            iconContainerClassName="bg-[#EFF6FF] text-[#2563EB]"
          />
          <StatCard 
            title="Active Users" 
            value="1,492" 
            trend={-2.4} 
            trendLabel="vs last month"
            icon={<User weight="fill" />}
            iconContainerClassName="bg-[#EEF4FF] text-[#3B82F6]"
          />
          <StatCard 
            title="Disputes" 
            value="12" 
            trend={0} 
            trendLabel="requires review"
            icon={<WarningCircle weight="fill" />}
            iconContainerClassName="bg-[#FEF2F2] text-[#EF4444]"
          />
        </div>
      </section>

      {/* Tables */}
      <section>
        <SectionHeader title="Data Tables" description="High density enterprise tables." />
        <DataTable
          columns={[
            { header: "ID", accessor: "id", className: "font-bold text-foreground", sortable: true },
            { header: "Amount", accessor: "amount", sortable: true },
            { header: "Date", accessor: "date", sortable: true },
            { 
              header: "Status", 
              cell: (row) => <StatusBadge status={row.status as any} /> 
            },
          ]}
          data={[
            { id: "TRX-1029", amount: "$12,450.00", status: "completed", date: "Oct 24, 2026" },
            { id: "TRX-1030", amount: "$3,200.00", status: "pending", date: "Oct 24, 2026" },
            { id: "TRX-1031", amount: "$45,000.00", status: "disputed", date: "Oct 23, 2026" },
          ]}
        />
      </section>
    </div>
  )
}
