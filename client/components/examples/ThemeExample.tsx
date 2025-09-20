import React from 'react';
import { useUIConfig } from '../../hooks/useUIConfig';
import { ThemedButton } from '../ui/themed-button';
import { ThemedCard, ThemedCardContent, ThemedCardDescription, ThemedCardHeader, ThemedCardTitle } from '../ui/themed-card';
import { cn } from '../../lib/utils';

/**
 * Example component demonstrating the centralized UI configuration system
 * This shows how components can use the theme-aware UI config for consistent styling
 */
export const ThemeExample: React.FC = () => {
  const {
    colors,
    getButtonClasses,
    getCardClasses,
    getTextClasses,
    getSpacingClasses,
    getBorderRadiusClasses,
    getShadowClasses,
    isDarkMode,
  } = useUIConfig();

  return (
    <div className={cn("space-y-6", getSpacingClasses('lg'))}>
      <div className={getTextClasses('primary', 'heading')}>
        Theme Configuration Example
      </div>
      
      <div className={getTextClasses('secondary', 'base')}>
        Current mode: {isDarkMode ? 'Dark' : 'Light'}
      </div>

      {/* Button Examples */}
      <ThemedCard variant="default">
        <ThemedCardHeader>
          <ThemedCardTitle>Button Variants</ThemedCardTitle>
          <ThemedCardDescription>
            All buttons automatically adapt to the current theme
          </ThemedCardDescription>
        </ThemedCardHeader>
        <ThemedCardContent>
          <div className="flex flex-wrap gap-4">
            <ThemedButton variant="primary" size="default">
              Primary Button
            </ThemedButton>
            <ThemedButton variant="secondary" size="default">
              Secondary Button
            </ThemedButton>
            <ThemedButton variant="outline" size="default">
              Outline Button
            </ThemedButton>
            <ThemedButton variant="ghost" size="default">
              Ghost Button
            </ThemedButton>
            <ThemedButton variant="destructive" size="default">
              Destructive Button
            </ThemedButton>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <ThemedButton variant="primary" size="small">
              Small
            </ThemedButton>
            <ThemedButton variant="primary" size="default">
              Default
            </ThemedButton>
            <ThemedButton variant="primary" size="large">
              Large
            </ThemedButton>
          </div>
        </ThemedCardContent>
      </ThemedCard>

      {/* Card Examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ThemedCard variant="default">
          <ThemedCardHeader>
            <ThemedCardTitle>Default Card</ThemedCardTitle>
            <ThemedCardDescription>
              Standard card with default styling
            </ThemedCardDescription>
          </ThemedCardHeader>
          <ThemedCardContent>
            <p className={getTextClasses('primary', 'sm')}>
              This card uses the default variant and adapts to the current theme automatically.
            </p>
          </ThemedCardContent>
        </ThemedCard>

        <ThemedCard variant="elevated">
          <ThemedCardHeader>
            <ThemedCardTitle>Elevated Card</ThemedCardTitle>
            <ThemedCardDescription>
              Card with enhanced shadow
            </ThemedCardDescription>
          </ThemedCardHeader>
          <ThemedCardContent>
            <p className={getTextClasses('primary', 'sm')}>
              This card has an elevated appearance with a larger shadow.
            </p>
          </ThemedCardContent>
        </ThemedCard>

        <ThemedCard variant="bordered">
          <ThemedCardHeader>
            <ThemedCardTitle>Bordered Card</ThemedCardTitle>
            <ThemedCardDescription>
              Card with emphasized border
            </ThemedCardDescription>
          </ThemedCardHeader>
          <ThemedCardContent>
            <p className={getTextClasses('primary', 'sm')}>
              This card has a thicker border for emphasis.
            </p>
          </ThemedCardContent>
        </ThemedCard>
      </div>

      {/* Text Examples */}
      <ThemedCard>
        <ThemedCardHeader>
          <ThemedCardTitle>Typography Examples</ThemedCardTitle>
          <ThemedCardDescription>
            Different text styles that adapt to the theme
          </ThemedCardDescription>
        </ThemedCardHeader>
        <ThemedCardContent>
          <div className="space-y-2">
            <div className={getTextClasses('primary', 'heading')}>
              Heading Text (Primary)
            </div>
            <div className={getTextClasses('primary', 'lg')}>
              Large Text (Primary)
            </div>
            <div className={getTextClasses('primary', 'base')}>
              Base Text (Primary)
            </div>
            <div className={getTextClasses('secondary', 'base')}>
              Base Text (Secondary)
            </div>
            <div className={getTextClasses('muted', 'sm')}>
              Small Muted Text
            </div>
          </div>
        </ThemedCardContent>
      </ThemedCard>

      {/* Manual Usage Example */}
      <ThemedCard>
        <ThemedCardHeader>
          <ThemedCardTitle>Manual Configuration Usage</ThemedCardTitle>
          <ThemedCardDescription>
            Examples of using the UI config directly for custom components
          </ThemedCardDescription>
        </ThemedCardHeader>
        <ThemedCardContent>
          <div className="space-y-4">
            {/* Custom button using manual classes */}
            <button 
              className={getButtonClasses('primary', 'default', 'w-full')}
            >
              Custom Button with Manual Classes
            </button>
            
            {/* Custom card using manual classes */}
            <div className={getCardClasses('elevated', 'p-4')}>
              <div className={getTextClasses('primary', 'base')}>
                Custom card content using manual configuration
              </div>
            </div>
            
            {/* Status indicators */}
            <div className="flex flex-wrap gap-2">
              <span className={cn(
                getBorderRadiusClasses('full'),
                getSpacingClasses('sm'),
                colors.success,
                'text-xs font-medium'
              )}>
                Success Status
              </span>
              <span className={cn(
                getBorderRadiusClasses('full'),
                getSpacingClasses('sm'),
                colors.warning,
                'text-xs font-medium'
              )}>
                Warning Status
              </span>
              <span className={cn(
                getBorderRadiusClasses('full'),
                getSpacingClasses('sm'),
                colors.danger,
                'text-xs font-medium'
              )}>
                Error Status
              </span>
            </div>
          </div>
        </ThemedCardContent>
      </ThemedCard>
    </div>
  );
};

export default ThemeExample;
