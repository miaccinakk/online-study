import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02]",
        secondary:
          "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80",
        outline:
          "border border-border bg-card text-foreground hover:bg-muted hover:border-primary/50 hover:text-primary",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent:
          "bg-accent text-accent-foreground shadow-md hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.02]",
        glow:
          "bg-primary text-primary-foreground glow-primary hover:scale-[1.02]",
        "glow-accent":
          "bg-accent text-accent-foreground glow-accent hover:scale-[1.02]",
        "outline-glow-accent":
          "border border-accent text-accent bg-transparent backdrop-blur-none hover:bg-accent hover:text-accent-foreground hover:scale-[1.02]",
        destructive:
          "bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25 hover:scale-[1.02]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
