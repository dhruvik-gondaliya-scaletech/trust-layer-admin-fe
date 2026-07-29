import { useNavigate } from "react-router-dom"
import { HouseSimple, ArrowLeft, Question } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center animate-in fade-in duration-500">
      <div className="relative mb-6">
        {/* Decorative circle glow */}
        <div className="absolute inset-0 -m-4 bg-primary/5 rounded-full blur-xl animate-pulse" />
        
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Question weight="duotone" className="h-12 w-12" />
        </div>
        
        {/* 404 Badge */}
        <div className="absolute -bottom-2 -right-2 bg-destructive text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
          404 ERROR
        </div>
      </div>

      <h1 className="text-[32px] font-bold text-foreground tracking-tight max-w-md leading-tight">
        Page Not Found
      </h1>
      
      <p className="mt-3 text-[15px] text-muted-foreground max-w-md leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:justify-center">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 h-11 px-5 border-[#E8EDF7] font-semibold text-[14px]"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
        <Button
          variant="default"
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 h-11 px-5 bg-primary hover:bg-primary-hover font-semibold text-[14px]"
        >
          <HouseSimple className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
