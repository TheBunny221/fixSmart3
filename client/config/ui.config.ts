/**
 * Centralized UI Configuration
 * 
 * This file defines all UI styles, colors, spacing, and component variants
 * for both light and dark modes. All components should use these values
 * to ensure consistent theming across the application.
 */

export interface UIConfig {
  colors: {
    primary: string;
    secondary: string;
    danger: string;
    success: string;
    warning: string;
    info: string;
    background: string;
    card: string;
    border: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    button: {
      primary: string;
      secondary: string;
      outline: string;
      ghost: string;
      destructive: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadow: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  font: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    heading: string;
  };
  transitions: {
    default: string;
    fast: string;
    slow: string;
  };
  components: {
    button: {
      default: string;
      small: string;
      large: string;
      icon: string;
    };
    card: {
      default: string;
      elevated: string;
      bordered: string;
    };
    input: {
      default: string;
      error: string;
      focus: string;
    };
    modal: {
      overlay: string;
      content: string;
    };
  };
}

/**
 * Generate UI configuration based on dark mode state
 */
export const UI_CONFIG = (isDark: boolean): UIConfig => ({
  colors: {
    primary: isDark 
      ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
      : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
    secondary: isDark 
      ? 'bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600' 
      : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300',
    danger: isDark 
      ? 'bg-red-700 hover:bg-red-800 text-white border-red-700' 
      : 'bg-red-600 hover:bg-red-700 text-white border-red-600',
    success: isDark 
      ? 'bg-green-700 hover:bg-green-800 text-white border-green-700' 
      : 'bg-green-600 hover:bg-green-700 text-white border-green-600',
    warning: isDark 
      ? 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-600' 
      : 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500',
    info: isDark 
      ? 'bg-cyan-700 hover:bg-cyan-800 text-white border-cyan-700' 
      : 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600',
    background: isDark 
      ? 'bg-gray-900 text-white' 
      : 'bg-white text-gray-900',
    card: isDark 
      ? 'bg-gray-800 text-gray-100 border-gray-700' 
      : 'bg-white text-gray-900 border-gray-200',
    border: isDark 
      ? 'border-gray-700' 
      : 'border-gray-200',
    text: {
      primary: isDark ? 'text-white' : 'text-gray-900',
      secondary: isDark ? 'text-gray-300' : 'text-gray-600',
      muted: isDark ? 'text-gray-400' : 'text-gray-500',
    },
    button: {
      primary: isDark 
        ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
        : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
      secondary: isDark 
        ? 'bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300',
      outline: isDark 
        ? 'bg-transparent hover:bg-gray-800 text-gray-300 border-gray-600 hover:text-white' 
        : 'bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300 hover:text-gray-900',
      ghost: isDark 
        ? 'bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white' 
        : 'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900',
      destructive: isDark 
        ? 'bg-red-700 hover:bg-red-800 text-white border-red-700' 
        : 'bg-red-600 hover:bg-red-700 text-white border-red-600',
    },
  },
  spacing: {
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  },
  borderRadius: {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  },
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },
  font: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    heading: 'text-xl font-semibold',
  },
  transitions: {
    default: 'transition duration-200 ease-in-out',
    fast: 'transition duration-150 ease-in-out',
    slow: 'transition duration-300 ease-in-out',
  },
  components: {
    button: {
      default: 'h-10 px-4 py-2 rounded-md font-medium',
      small: 'h-8 px-3 py-1 rounded-md text-sm font-medium',
      large: 'h-12 px-6 py-3 rounded-lg text-lg font-medium',
      icon: 'h-10 w-10 rounded-md',
    },
    card: {
      default: 'rounded-lg border shadow-sm',
      elevated: 'rounded-lg border shadow-lg',
      bordered: 'rounded-lg border-2',
    },
    input: {
      default: 'h-10 px-3 py-2 rounded-md border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      error: 'border-red-500 focus:ring-red-500',
      focus: 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    },
    modal: {
      overlay: isDark 
        ? 'fixed inset-0 bg-black/80 backdrop-blur-sm' 
        : 'fixed inset-0 bg-black/50 backdrop-blur-sm',
      content: isDark 
        ? 'bg-gray-800 border-gray-700 text-gray-100' 
        : 'bg-white border-gray-200 text-gray-900',
    },
  },
});

/**
 * Utility function to get responsive classes
 */
export const getResponsiveClasses = (
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
): string => {
  const classes = [base];
  if (sm) classes.push(`sm:${sm}`);
  if (md) classes.push(`md:${md}`);
  if (lg) classes.push(`lg:${lg}`);
  if (xl) classes.push(`xl:${xl}`);
  return classes.join(' ');
};

/**
 * Utility function to combine UI config classes with custom classes
 */
export const combineClasses = (configClasses: string, customClasses?: string): string => {
  if (!customClasses) return configClasses;
  return `${configClasses} ${customClasses}`;
};

/**
 * Status colors that work in both light and dark modes
 */
export const getStatusColor = (status: string, isDark: boolean): string => {
  const statusColors = {
    success: isDark ? 'bg-green-700 text-green-100' : 'bg-green-100 text-green-800',
    warning: isDark ? 'bg-yellow-700 text-yellow-100' : 'bg-yellow-100 text-yellow-800',
    error: isDark ? 'bg-red-700 text-red-100' : 'bg-red-100 text-red-800',
    info: isDark ? 'bg-blue-700 text-blue-100' : 'bg-blue-100 text-blue-800',
    pending: isDark ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800',
    registered: isDark ? 'bg-gray-600 text-gray-100' : 'bg-gray-200 text-gray-700',
    assigned: isDark ? 'bg-blue-600 text-blue-100' : 'bg-blue-200 text-blue-800',
    progress: isDark ? 'bg-yellow-600 text-yellow-100' : 'bg-yellow-200 text-yellow-800',
    resolved: isDark ? 'bg-green-600 text-green-100' : 'bg-green-200 text-green-800',
    closed: isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-300 text-gray-800',
    reopened: isDark ? 'bg-red-600 text-red-100' : 'bg-red-200 text-red-800',
  };
  
  return statusColors[status as keyof typeof statusColors] || statusColors.pending;
};

/**
 * Default export for easy importing
 */
export default UI_CONFIG;
