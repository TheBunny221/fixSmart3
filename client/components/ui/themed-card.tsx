import * as React from "react";
import { useUIConfig } from "../../hooks/useUIConfig";
import { cn } from "../../lib/utils";

export interface ThemedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
}

const ThemedCard = React.forwardRef<HTMLDivElement, ThemedCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const { getCardClasses } = useUIConfig();
    
    return (
      <div
        ref={ref}
        className={getCardClasses(variant, className)}
        {...props}
      />
    );
  }
);
ThemedCard.displayName = "ThemedCard";

const ThemedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { getSpacingClasses } = useUIConfig();
  
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", getSpacingClasses('lg'), className)}
      {...props}
    />
  );
});
ThemedCardHeader.displayName = "ThemedCardHeader";

const ThemedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { getTextClasses } = useUIConfig();
  
  return (
    <h3
      ref={ref}
      className={getTextClasses('primary', 'heading', className)}
      {...props}
    />
  );
});
ThemedCardTitle.displayName = "ThemedCardTitle";

const ThemedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { getTextClasses } = useUIConfig();
  
  return (
    <p
      ref={ref}
      className={getTextClasses('muted', 'sm', className)}
      {...props}
    />
  );
});
ThemedCardDescription.displayName = "ThemedCardDescription";

const ThemedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { getSpacingClasses } = useUIConfig();
  
  return (
    <div 
      ref={ref} 
      className={cn(getSpacingClasses('lg'), "pt-0", className)} 
      {...props} 
    />
  );
});
ThemedCardContent.displayName = "ThemedCardContent";

const ThemedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { getSpacingClasses } = useUIConfig();
  
  return (
    <div
      ref={ref}
      className={cn("flex items-center", getSpacingClasses('lg'), "pt-0", className)}
      {...props}
    />
  );
});
ThemedCardFooter.displayName = "ThemedCardFooter";

export { 
  ThemedCard, 
  ThemedCardHeader, 
  ThemedCardFooter, 
  ThemedCardTitle, 
  ThemedCardDescription, 
  ThemedCardContent 
};
