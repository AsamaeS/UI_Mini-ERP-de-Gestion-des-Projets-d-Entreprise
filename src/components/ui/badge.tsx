import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-success/15 text-success",
        warning: "border-transparent bg-warning/15 text-warning",
        info: "border-transparent bg-info/15 text-info",
        muted: "border-transparent bg-muted text-muted-foreground",
        active: "border-transparent bg-success/15 text-success font-medium",
        pending: "border-transparent bg-warning/15 text-warning font-medium",
        inactive: "border-transparent bg-muted text-muted-foreground font-medium",
        error: "border-transparent bg-destructive/10 text-destructive font-medium",
        "priority-low": "border-transparent bg-muted text-muted-foreground",
        "priority-medium": "border-transparent bg-info/15 text-info",
        "priority-high": "border-transparent bg-warning/15 text-warning",
        "priority-critical": "border-transparent bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
