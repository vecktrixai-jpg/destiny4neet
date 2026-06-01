import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "surface" | "low" | "lowest" | "high" 
  containerClassName?: string
}

export function SectionWrapper({ className, children, containerClassName, variant = "surface", ...props }: SectionWrapperProps) {
  const bgColors = {
    surface: "bg-surface",
    low: "bg-surface-container-low",
    lowest: "bg-surface-container-lowest",
    high: "bg-surface-container-high"
  }

  return (
    <section
      className={cn(
        "w-full py-20 md:py-32 overflow-hidden",
        bgColors[variant],
        className
      )}
      {...props}
    >
      <div className={cn("container mx-auto px-4 md:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  )
}
