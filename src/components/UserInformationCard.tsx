import { useNavigate } from "react-router-dom"
import { User, CheckCircle } from "@phosphor-icons/react"

interface UserInformationCardProps {
  title: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  profileLabel: string;
}

export function UserInformationCard({ title, user, profileLabel }: UserInformationCardProps) {
  const navigate = useNavigate()

  return (
    <div className="relative bg-white border border-[#EEF2F7] rounded-[20px] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] h-full">
      <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2 mb-6">
        <User className="h-5 w-5 text-muted-foreground" /> {title}
      </h3>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-10 flex-1">
        <div className="space-y-4 flex-1 w-full min-w-0">
          <div className="flex items-center justify-between sm:pr-[120px]">
             <div className="min-w-0 pr-4">
               <div className="text-[12px] font-medium text-muted-foreground mb-1">Name</div>
               <div className="font-medium text-[15px] text-[#111827] truncate">{user.name}</div>
             </div>
          </div>
          <div className="flex items-center justify-between">
             <div className="min-w-0 pr-4">
               <div className="text-[12px] font-medium text-muted-foreground mb-1">Email</div>
               <div className="font-medium text-[15px] text-[#111827] truncate">{user.email}</div>
             </div>
             <div className="flex items-center gap-1.5 text-[#16A34A] text-[13px] font-medium shrink-0">
               <CheckCircle weight="fill" className="h-4 w-4" /> Verified
             </div>
          </div>
          <div className="flex items-center justify-between">
             <div className="min-w-0 pr-4">
               <div className="text-[12px] font-medium text-muted-foreground mb-1">Phone</div>
               <div className="font-medium text-[15px] text-[#111827] truncate">{user.phone}</div>
             </div>
             <div className="flex items-center gap-1.5 text-[#16A34A] text-[13px] font-medium shrink-0">
               <CheckCircle weight="fill" className="h-4 w-4" /> Verified
             </div>
          </div>
        </div>
        
        <div 
          className="absolute top-6 right-6 w-[110px] h-[95px] shrink-0 border border-[#E5E7EB] rounded-[12px] flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-[#F8FAFC] transition-all hover:border-primary hover:shadow-md bg-white"
          onClick={() => navigate(`/users/${user.id}`)}
        >
          <User weight="fill" className="h-6 w-6 text-[#64748B]" />
          <div className="font-bold text-[#0F172A] text-[13px] mt-0.5 text-center leading-tight">{profileLabel}</div>
          <div className="text-primary text-[12px] font-semibold flex items-center gap-1 mt-0.5">
            View User <span aria-hidden="true">&rarr;</span>
          </div>
        </div>
      </div>
    </div>
  )
}
