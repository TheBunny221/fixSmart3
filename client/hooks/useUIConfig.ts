import { useTheme } from '../contexts/ThemeContext';
import { combineClasses } from '../config/ui.config';

/**
 * Hook for easier access to UI configuration
 */
export const useUIConfig = () => {
  const { uiConfig, isDarkMode } = useTheme();
  
  return {
    ...uiConfig,
    isDarkMode,
    
    // Utility functions for common patterns
    getButtonClasses: (variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' = 'primary', size: 'default' | 'small' | 'large' | 'icon' = 'default', customClasses?: string) => {
      const baseClasses = uiConfig.components.button[size];
      const variantClasses = uiConfig.colors.button[variant];
      const transitionClasses = uiConfig.transitions.default;
      
      return combineClasses(`${baseClasses} ${variantClasses} ${transitionClasses}`, customClasses);
    },
    
    getCardClasses: (variant: 'default' | 'elevated' | 'bordered' = 'default', customClasses?: string) => {
      const baseClasses = uiConfig.components.card[variant];
      const colorClasses = uiConfig.colors.card;
      
      return combineClasses(`${baseClasses} ${colorClasses}`, customClasses);
    },
    
    getInputClasses: (state: 'default' | 'error' | 'focus' = 'default', customClasses?: string) => {
      const baseClasses = uiConfig.components.input.default;
      const stateClasses = state !== 'default' ? uiConfig.components.input[state] : '';
      
      return combineClasses(`${baseClasses} ${stateClasses}`, customClasses);
    },
    
    getTextClasses: (variant: 'primary' | 'secondary' | 'muted' = 'primary', size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | 'heading' = 'base', customClasses?: string) => {
      const colorClasses = uiConfig.colors.text[variant];
      const sizeClasses = uiConfig.font[size];
      
      return combineClasses(`${colorClasses} ${sizeClasses}`, customClasses);
    },
    
    getSpacingClasses: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md') => {
      return uiConfig.spacing[size];
    },
    
    getBorderRadiusClasses: (size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md') => {
      return uiConfig.borderRadius[size];
    },
    
    getShadowClasses: (size: 'sm' | 'md' | 'lg' | 'xl' = 'md') => {
      return uiConfig.shadow[size];
    },
    
    getTransitionClasses: (speed: 'default' | 'fast' | 'slow' = 'default') => {
      return uiConfig.transitions[speed];
    },
  };
};

export default useUIConfig;
