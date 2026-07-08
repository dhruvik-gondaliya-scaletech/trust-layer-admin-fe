import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import {
  Users, Briefcase, CheckCircle, Bank, CurrencyCircleDollar,
  ChartLineUp, WarningCircle, ArrowRight
} from "@phosphor-icons/react"

const recentDisputes = [
  { id: "DSP-2041", item: "Rolex Submariner", buyer: "Alex", seller: "Watch Vault", status: "open", updated: "10 mins ago" },
  { id: "DSP-2040", item: "Custom Software UI", buyer: "Tech Startup", seller: "Dev Studio", status: "escalated", updated: "2 hours ago" },
]


const recentDeals = [
  { id: "DL-9042", item: "Web Application Dev", buyer: "Acme Corp", seller: "Dev Pro", amount: "$15,000", status: "active" },
  { id: "DL-9041", item: "2019 Tesla Model 3", buyer: "Mike S.", seller: "Auto Sales", amount: "$28,500", status: "completed" },
]

const recentTransactions = [
  { id: "TRX-1035", dealId: "DL-9042", amount: "$15,000", paymentStatus: "funded", date: "Oct 24, 2026" },
  { id: "TRX-1034", dealId: "DL-9041", amount: "$28,500", paymentStatus: "released", date: "Oct 24, 2026" },
]

function SectionHeader({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h2 className="text-[14px] font-bold tracking-tight text-foreground leading-none">{title}</h2>
        <p className="text-[13px] font-medium text-muted-foreground/80 mt-1.5">{description}</p>
      </div>
      <Button variant="ghost" size="sm" className="gap-1.5 font-semibold text-primary hover:text-primary-hover hover:bg-primary/10 h-8 text-[13px] px-3 -mt-0.5">
        View All <ArrowRight weight="bold" className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}

function ListCard({
  avatar,
  title,
  subtitle,
  metadata,
  status,
  time,
}: {
  avatar: React.ReactNode,
  title: React.ReactNode,
  subtitle?: React.ReactNode,
  metadata?: React.ReactNode,
  status: React.ReactNode,
  time: string,
}) {
  return (
    <div className="flex items-center justify-between px-4 h-[90px] rounded-xl border border-border/40 bg-card hover:bg-muted/10 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-md shadow-sm">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/30 text-muted-foreground font-bold text-[11px] uppercase border border-border/50">
          {avatar}
        </div>
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <h4 className="text-[14px] font-medium text-foreground leading-tight truncate">
            {title}
          </h4>
          {subtitle && (
            <p className="text-[12px] font-medium text-muted-foreground mt-1 truncate">
              {subtitle}
            </p>
          )}
          {metadata && (
            <p className="text-[12px] font-medium text-foreground mt-0.5 truncate">
              {metadata}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 ml-4 shrink-0">
        <div className="flex flex-col items-end gap-1.5 justify-center">
          {status}
          <span className="text-[11px] font-medium text-muted-foreground">{time}</span>
        </div>
        <Button variant="outline" size="sm" className="h-8 w-[100px] rounded-lg text-[12px] font-semibold border-border/60 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-colors shrink-0">
          View Details
        </Button>
      </div>
    </div>
  )
}

export function Dashboard() {
  return (
    <div className="flex-1 space-y-6 2xl:space-y-8 p-4 lg:p-6 2xl:p-8">
      <PageHeader
        title="Dashboard"
        description="Real-time overview of platform operations."
      />

      {/* Row 1: KPI Cards */}
      <div className="grid gap-4 lg:gap-6 2xl:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Registered Users" value="12,548" icon={<Users weight="fill" />} iconContainerClassName="bg-[#EEF4FF] text-[#3B82F6]" className="bg-white" />
        <StatCard title="Active Deals" value="342" icon={<Briefcase weight="fill" />} iconContainerClassName="bg-[#F3F0FF] text-[#7C3AED]" className="bg-white" />
        <StatCard title="Completed Deals" value="1,845" icon={<CheckCircle weight="fill" />} iconContainerClassName="bg-[#ECFDF3] text-[#16A34A]" className="bg-white" />
        <StatCard title="Protected Funds" value="$4.2M" icon={<Bank weight="fill" />} iconContainerClassName="bg-[#EFF6FF] text-[#2563EB]" className="bg-white" />
        <StatCard title="Funds Released" value="$18.4M" icon={<CurrencyCircleDollar weight="fill" />} iconContainerClassName="bg-[#ECFDF3] text-[#16A34A]" className="bg-white" />
        <StatCard title="Platform Revenue" value="$128,450" icon={<ChartLineUp weight="fill" />} iconContainerClassName="bg-[#F5F3FF] text-[#7C3AED]" className="bg-white" />
        <StatCard title="Open Disputes" value="3" icon={<WarningCircle weight="fill" />} iconContainerClassName="bg-[#FEF2F2] text-[#EF4444]" className="bg-white" />
      </div>

      {/* Row 2: Operations */}
      <div className="flex flex-col gap-6 2xl:gap-8">
        
        {/* Deals & Transactions - 2 Column */}
        <div className="grid gap-6 2xl:gap-8 grid-cols-1 lg:grid-cols-2">
          
          <div className="bg-card rounded-[20px] border border-[#EEF2F7] shadow-sm p-4 lg:p-6 space-y-4">
            <SectionHeader title="Recent Deals" description="Latest active and completed deals" />
            {recentDeals.length > 0 ? (
              <div className="space-y-4">
                {recentDeals.map(d => (
                  <ListCard
                    key={d.id}
                    avatar={d.item.substring(0, 2)}
                    title={d.item}
                    subtitle={d.id}
                    metadata={<>{d.buyer} <span className="text-muted-foreground mx-1">↔</span> {d.seller} <span className="text-muted-foreground mx-1">•</span> <span className="font-bold">{d.amount}</span></>}
                    status={<StatusBadge status={d.status as any} />}
                    time={"Updated recently"}
                  />
                ))}
              </div>
            ) : (
              <EmptyState icon={<Briefcase weight="regular" className="h-6 w-6" />} title="No recent deals" description="There are no active deals to display." />
            )}
          </div>

          <div className="bg-card rounded-[20px] border border-[#EEF2F7] shadow-sm p-4 lg:p-6 space-y-4">
            <SectionHeader title="Recent Transactions" description="Latest platform fund movements" />
            {recentTransactions.length > 0 ? (
              <div className="space-y-4">
                {recentTransactions.map(t => (
                  <ListCard
                    key={t.id}
                    avatar={<CurrencyCircleDollar weight="bold" className="h-5 w-5" />}
                    title={t.amount}
                    subtitle={t.dealId}
                    status={<StatusBadge status={t.paymentStatus as any} />}
                    time={t.date}
                  />
                ))}
              </div>
            ) : (
              <EmptyState icon={<Bank weight="regular" className="h-6 w-6" />} title="No recent transactions" description="No funds have been moved recently." />
            )}
          </div>

        </div>

        {/* Disputes - Full Width */}
        <div className="bg-card rounded-[20px] border border-[#EEF2F7] shadow-sm p-4 lg:p-6 space-y-4">
          <SectionHeader title="Recent Disputes" description="Cases requiring review" />
          {recentDisputes.length > 0 ? (
            <div className="space-y-4">
              {recentDisputes.map(d => (
                <ListCard
                  key={d.id}
                  avatar={d.item.substring(0, 2)}
                  title={d.item}
                  subtitle={d.id}
                  metadata={<>{d.buyer} <span className="text-muted-foreground mx-1">↔</span> {d.seller}</>}
                  status={<StatusBadge status={d.status as any} />}
                  time={d.updated}
                />
              ))}
            </div>
          ) : (
            <EmptyState icon={<WarningCircle weight="regular" className="h-6 w-6" />} title="No recent disputes" description="No disputes require attention at this time." />
          )}
        </div>

      </div>
    </div>
  )
}