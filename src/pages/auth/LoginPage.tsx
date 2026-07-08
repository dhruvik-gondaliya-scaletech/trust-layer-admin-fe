import * as React from "react"
import { useNavigate } from "react-router-dom"
import { EnvelopeSimple, LockKey, Eye, EyeSlash, ShieldCheck } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    <div className="min-h-screen w-full bg-[#F6F8FC] flex items-center justify-center font-sans px-4 sm:px-6 py-12 selection:bg-[#2F5BFF]/20 selection:text-[#2F5BFF]">

      <div className="w-full max-w-[460px] animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
        {/* Main Card */}
        <div className="bg-white rounded-[24px] border border-[#E8EDF7] shadow-[0_12px_32px_-12px_rgba(15,23,42,0.08)] p-8 sm:p-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-10 text-center animate-in fade-in slide-in-from-bottom-2 duration-700 delay-75 fill-mode-both">
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
          <form onSubmit={handleSignIn} className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100 fill-mode-both">
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

            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full h-[52px] rounded-[14px] bg-[#2F5BFF] hover:bg-[#1E3A8A] text-white font-semibold text-[15px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 mt-2",
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
      </div>

    </div>
  )
}
