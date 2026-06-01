import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  interactive?: boolean
}

export function GlassCard({ className, children, interactive = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface-container-lowest/80 backdrop-blur-[16px]",
        "border border-border/20 shadow-[0_4px_20px_rgba(0,53,39,0.04),0_10px_40px_rgba(0,0,0,0.03)]",
        "transition-all duration-300",
        interactive && "hover:bg-surface-container-low hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,53,39,0.06),0_15px_45px_rgba(0,0,0,0.04)] cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
