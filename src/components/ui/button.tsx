import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl",
        outline: "border border-border-glass bg-background-glass/50 backdrop-blur-md hover:bg-primary/10 hover:border-primary/30 text-foreground rounded-xl",
        secondary: "bg-secondary-glass text-secondary-foreground hover:bg-secondary/80 backdrop-blur-md border border-border-glass rounded-xl",
        ghost: "hover:bg-accent-light/20 hover:text-accent-foreground rounded-xl",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-primary text-white font-semibold shadow-card hover:shadow-glow hover:-translate-y-1 rounded-2xl",
        glass: "glass-card text-foreground hover:shadow-glow hover:-translate-y-1 hover:bg-card-glass/80",
        'glass-primary': "glass-card bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:shadow-glow hover:-translate-y-1",
        'github': "bg-gray-900 text-white hover:bg-gray-800 rounded-xl",
        'status-connected': "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500/20 rounded-full",
        'status-pending': "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 hover:bg-yellow-500/20 rounded-full",
        'status-disconnected': "bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500/20 rounded-full",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg font-semibold",
        icon: "h-10 w-10",
        'icon-sm': "h-8 w-8",
        'icon-lg': "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
