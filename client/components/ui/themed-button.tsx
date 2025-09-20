import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useUIConfig } from "../../hooks/useUIConfig";
import { cn } from "../../lib/utils";

const themedButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        outline: "",
        ghost: "",
        destructive: "",
      },
      size: {
        default: "",
        small: "",
        large: "",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ThemedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof themedButtonVariants> {
  asChild?: boolean;
}

const ThemedButton = React.forwardRef<HTMLButtonElement, ThemedButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const { getButtonClasses } = useUIConfig();
    const Comp = asChild ? Slot : "button";
    
    const buttonClasses = getButtonClasses(variant || "primary", size || "default", className);
    
    return (
      <Comp
        className={buttonClasses}
        ref={ref}
        {...props}
      />
    );
  },
);
ThemedButton.displayName = "ThemedButton";

export { ThemedButton, themedButtonVariants };
