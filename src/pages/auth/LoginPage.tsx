import * as React from "react"
import { useNavigate } from "react-router-dom"
import { EnvelopeSimple, LockKey, Eye, EyeSlash, ShieldCheck, CheckCircle, ChartBar, Users, WarningCircle, Briefcase } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { login, isAuthenticated } from "@/lib/auth"

export function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate("/")
    }
  }, [navigate])

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      login() // Mock login by setting token
      setIsLoading(false)
      navigate("/")
    }, 1000)
  }

  return (
    <div className="min-h-screen w-full bg-[#F6F8FC] flex font-sans selection:bg-[#2F5BFF]/20 selection:text-[#2F5BFF]">
      
      {/* Left Column (Login Form) - Full width on mobile, half on desktop */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div 
          className="w-full max-w-[460px] animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both"
        >
          {/* Main Card */}
          <div className="bg-white rounded-[24px] border border-[#E8EDF7] shadow-[0_12px_32px_-12px_rgba(15,23,42,0.08)] p-8 sm:p-10">
            {/* Header */}
            <div className="flex flex-col items-center mb-10 text-center animate-in fade-in slide-in-from-bottom-2 duration-700 delay-[50ms] fill-mode-both">
              <div className="mb-6 bg-gradient-to-br from-[#2F5BFF] to-[#1E3A8A] w-12 h-12 rounded-[14px] flex items-center justify-center shadow-md">
                {/* Simplified Logo mark */}
                <ShieldCheck weight="fill" className="text-white w-6 h-6" />
              </div>
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-primary uppercase mb-5">
                Admin Portal
              </div>
              <h1 className="text-[40px] font-bold tracking-tight text-[#0F172A] leading-tight mb-2">
                Welcome back
              </h1>
              <p className="text-[15px] text-[#64748B] leading-relaxed max-w-[320px]">
                Sign in to manage users, deals, transactions, disputes, and platform operations.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignIn} className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-[100ms] fill-mode-both">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[13px] font-semibold text-[#0F172A]">Email Address</Label>
                <div className="relative">
                  <EnvelopeSimple className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/70" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@trustlayer.com"
                    required
                    className="h-[52px] rounded-[14px] pl-11 text-[15px] border-[#E8EDF7] shadow-sm bg-[#FAFBFD] focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[13px] font-semibold text-[#0F172A]">Password</Label>
                  <a href="#" className="text-[13px] font-medium text-primary hover:text-primary/80 transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <LockKey className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/70" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    required
                    className="h-[52px] rounded-[14px] pl-11 pr-11 text-[15px] border-[#E8EDF7] shadow-sm bg-[#FAFBFD] focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all duration-200"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeSlash className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1 pb-3">
                <Checkbox id="remember" className="rounded-[6px] border-[#E8EDF7] data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                <label
                  htmlFor="remember"
                  className="text-[13px] font-medium text-[#475569] leading-none cursor-pointer"
                >
                  Remember me for 30 days
                </label>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className={cn(
                  "w-full h-[52px] rounded-[14px] bg-[#2F5BFF] hover:bg-[#1E3A8A] text-white font-semibold text-[15px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5",
                  isLoading && "opacity-80 pointer-events-none translate-y-0 shadow-none"
                )}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>

          {/* Bottom Links */}
          <div className="flex items-center justify-center gap-4 mt-8 text-[13px] text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-700 delay-[150ms] fill-mode-both">
            <a href="#" className="hover:text-foreground transition-colors font-medium">Need help?</a>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <a href="#" className="hover:text-foreground transition-colors font-medium">Contact Support</a>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <a href="#" className="hover:text-foreground transition-colors font-medium">Privacy Policy</a>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <a href="#" className="hover:text-foreground transition-colors font-medium">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Column (Info Panel) - Hidden on mobile, visible on lg screens */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-12 py-12 relative overflow-hidden bg-white/30">
        
        {/* Abstract Geometrics Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle gradient orb */}
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-b from-[#2F5BFF]/5 to-transparent blur-3xl opacity-70"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik00MCAwSDBWMGg0MHY0MEgzOVYxSDM5eiIgZmlsbD0iI2U4ZWRmNyIgZmlsbC1vcGFjaXR5PSIwLjUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=')] opacity-50"></div>
          
          {/* Abstract geometric shapes */}
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] border-[1px] border-[#2F5BFF]/10 rounded-full"></div>
          <div className="absolute top-[30%] right-[20%] w-[200px] h-[200px] border-[1px] border-[#2F5BFF]/20 rounded-full"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-gradient-to-tr from-[#2F5BFF]/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-[520px] mx-auto animate-in fade-in slide-in-from-right-8 duration-1000 ease-out">
          
          {/* Enterprise Security Card */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(15,23,42,0.04)] rounded-[24px] p-8 mb-6 transform transition-all duration-500 hover:shadow-[0_16px_48px_rgba(15,23,42,0.08)] hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-[14px] bg-[#EEF2FF] flex items-center justify-center text-[#2F5BFF]">
                <ShieldCheck weight="fill" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#0F172A]">Enterprise Security</h3>
                <p className="text-[14px] text-muted-foreground">SOC2 Type II Certified Platform</p>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                "Bank-grade AES-256 encryption",
                "Protected fund operations & routing",
                "Secure administrator access with audit logs"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle weight="fill" className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                  <span className="text-[15px] text-[#334155] font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-6 mb-6">
            {/* Live Platform Status */}
            <div className="flex-1 bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(15,23,42,0.04)] rounded-[20px] p-6 transform transition-all duration-500 hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)] hover:-translate-y-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-bold text-muted-foreground uppercase tracking-wider">Status</span>
                <div className="flex items-center gap-1.5 bg-[#ECFDF5] text-[#059669] px-2.5 py-1 rounded-full border border-[#059669]/20">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Operational</span>
                </div>
              </div>
              <div className="text-[28px] font-bold text-[#0F172A] tracking-tight">99.99%</div>
              <p className="text-[13px] text-muted-foreground font-medium mt-1">Platform Uptime SLA</p>
            </div>

            {/* Statistics Mini Card */}
            <div className="flex-1 bg-gradient-to-br from-[#1E293B] to-[#0F172A] shadow-xl rounded-[20px] p-6 relative overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2F5BFF] opacity-20 blur-3xl rounded-full group-hover:bg-[#3B82F6] transition-colors duration-500"></div>
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white mb-4">
                  <ChartBar weight="bold" className="w-4 h-4" />
                </div>
                <div className="text-[28px] font-bold text-white tracking-tight">$2.4B+</div>
                <p className="text-[13px] text-slate-300 font-medium mt-1">Protected Funds Vol.</p>
              </div>
            </div>
          </div>

          {/* Micro Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Briefcase, label: "Active Deals", value: "8,432" },
              { icon: Users, label: "Platform Users", value: "142K" },
              { icon: WarningCircle, label: "Open Disputes", value: "1.2%" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-md border border-white/30 rounded-[16px] p-4 flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-white/60 cursor-default hover:-translate-y-1 hover:shadow-sm">
                <stat.icon className="w-5 h-5 text-primary mb-2 opacity-80" />
                <div className="text-[18px] font-bold text-[#0F172A]">{stat.value}</div>
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  )
}
