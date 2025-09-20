# Centralized UI Configuration System

This document describes the centralized UI configuration system that provides consistent theming and dark/light mode support across the entire application.

## Overview

The UI configuration system centralizes all styling decisions including colors, spacing, typography, and component variants. It supports both light and dark modes with automatic theme switching.

## Key Features

- ✅ **Centralized Configuration**: All UI styles defined in one place
- ✅ **Dark/Light Mode**: Automatic theme switching with user preference persistence
- ✅ **Theme-Aware Components**: All components automatically adapt to the current theme
- ✅ **Consistent Design System**: Unified spacing, colors, typography, and component variants
- ✅ **Easy Customization**: Simple configuration changes affect the entire application
- ✅ **TypeScript Support**: Full type safety for all configuration options
- ✅ **Responsive Design**: Built-in support for responsive breakpoints

## Architecture

### Core Files

1. **`client/config/ui.config.ts`** - Main configuration file
2. **`client/contexts/ThemeContext.tsx`** - Theme provider and state management
3. **`client/hooks/useUIConfig.ts`** - Utility hook for easy access to UI config
4. **`client/components/ui/themed-*.tsx`** - Theme-aware UI components

### File Structure

```
client/
├── config/
│   └── ui.config.ts              # Main UI configuration
├── contexts/
│   └── ThemeContext.tsx          # Theme provider
├── hooks/
│   └── useUIConfig.ts            # UI config hook
├── components/
│   ├── ui/
│   │   ├── themed-button.tsx     # Theme-aware button
│   │   ├── themed-card.tsx       # Theme-aware card
│   │   └── switch.tsx            # Dark mode toggle
│   └── examples/
│       └── ThemeExample.tsx      # Usage examples
└── App.tsx                       # Theme provider setup
```

## Usage Guide

### 1. Basic Setup

The theme system is automatically available throughout the app via the `ThemeProvider` in `App.tsx`:

```tsx
<ThemeProvider>
  <YourApp />
</ThemeProvider>
```

### 2. Using the Theme Hook

```tsx
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { isDarkMode, toggleDarkMode, uiConfig } = useTheme();
  
  return (
    <div className={uiConfig.colors.background}>
      <button onClick={toggleDarkMode}>
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};
```

### 3. Using the UI Config Hook

```tsx
import { useUIConfig } from '../hooks/useUIConfig';

const MyComponent = () => {
  const { 
    getButtonClasses, 
    getCardClasses, 
    getTextClasses,
    colors 
  } = useUIConfig();
  
  return (
    <div className={getCardClasses('elevated')}>
      <h1 className={getTextClasses('primary', 'heading')}>
        My Title
      </h1>
      <button className={getButtonClasses('primary', 'large')}>
        Click Me
      </button>
    </div>
  );
};
```

### 4. Using Themed Components

```tsx
import { ThemedButton } from '../components/ui/themed-button';
import { ThemedCard, ThemedCardContent, ThemedCardHeader, ThemedCardTitle } from '../components/ui/themed-card';

const MyComponent = () => {
  return (
    <ThemedCard variant="elevated">
      <ThemedCardHeader>
        <ThemedCardTitle>My Card</ThemedCardTitle>
      </ThemedCardHeader>
      <ThemedCardContent>
        <ThemedButton variant="primary" size="large">
          Action Button
        </ThemedButton>
      </ThemedCardContent>
    </ThemedCard>
  );
};
```

## Configuration Options

### Colors

```tsx
colors: {
  primary: string;      // Primary brand color
  secondary: string;    // Secondary color
  danger: string;       // Error/destructive actions
  success: string;      // Success states
  warning: string;      // Warning states
  info: string;         // Information states
  background: string;   // Page background
  card: string;         // Card background
  border: string;       // Border color
  text: {
    primary: string;    // Primary text
    secondary: string;  // Secondary text
    muted: string;      // Muted text
  };
  button: {
    primary: string;    // Primary button
    secondary: string;  // Secondary button
    outline: string;    // Outline button
    ghost: string;      // Ghost button
    destructive: string; // Destructive button
  };
}
```

### Component Variants

#### Buttons
- **Variants**: `primary`, `secondary`, `outline`, `ghost`, `destructive`
- **Sizes**: `default`, `small`, `large`, `icon`

#### Cards
- **Variants**: `default`, `elevated`, `bordered`

#### Text
- **Variants**: `primary`, `secondary`, `muted`
- **Sizes**: `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `heading`

### Spacing & Layout

```tsx
spacing: {
  xs: 'p-1',    // Extra small padding
  sm: 'p-2',    // Small padding
  md: 'p-4',    // Medium padding
  lg: 'p-6',    // Large padding
  xl: 'p-8',    // Extra large padding
}

borderRadius: {
  sm: 'rounded-sm',    // Small radius
  md: 'rounded-md',    // Medium radius
  lg: 'rounded-lg',    // Large radius
  xl: 'rounded-xl',    // Extra large radius
  full: 'rounded-full', // Full radius
}

shadow: {
  sm: 'shadow-sm',     // Small shadow
  md: 'shadow-md',     // Medium shadow
  lg: 'shadow-lg',     // Large shadow
  xl: 'shadow-xl',     // Extra large shadow
}
```

## Dark Mode Implementation

### Automatic Detection
The system automatically detects the user's system preference and applies the appropriate theme on first visit.

### Persistence
Theme preferences are saved to `localStorage` and persist across sessions.

### Manual Toggle
Users can manually toggle between light and dark modes using the switch in the navigation bar.

### CSS Classes
The system uses Tailwind's `dark:` classes under the hood, controlled by adding/removing the `dark` class on the document root.

## Customization

### Adding New Colors

1. Update `ui.config.ts`:
```tsx
export const UI_CONFIG = (isDark: boolean) => ({
  colors: {
    // ... existing colors
    brand: isDark 
      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
      : 'bg-purple-500 hover:bg-purple-600 text-white',
  },
  // ...
});
```

2. Update the TypeScript interface:
```tsx
interface UIConfig {
  colors: {
    // ... existing colors
    brand: string;
  };
  // ...
}
```

### Adding New Component Variants

1. Update the configuration:
```tsx
components: {
  button: {
    // ... existing variants
    rounded: 'h-10 px-4 py-2 rounded-full font-medium',
  },
}
```

2. Update the hook:
```tsx
getButtonClasses: (variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'rounded' = 'primary', ...)
```

### Creating Custom Themed Components

```tsx
import { useUIConfig } from '../hooks/useUIConfig';

const MyCustomComponent = ({ variant = 'default', children }) => {
  const { colors, getSpacingClasses, getBorderRadiusClasses } = useUIConfig();
  
  const variantClasses = {
    default: colors.card,
    highlighted: colors.primary,
  };
  
  return (
    <div className={cn(
      variantClasses[variant],
      getSpacingClasses('md'),
      getBorderRadiusClasses('lg')
    )}>
      {children}
    </div>
  );
};
```

## Best Practices

### 1. Always Use the Configuration
```tsx
// ✅ Good - Uses centralized config
const { colors } = useUIConfig();
<div className={colors.card}>Content</div>

// ❌ Bad - Hardcoded colors
<div className="bg-white dark:bg-gray-800">Content</div>
```

### 2. Prefer Themed Components
```tsx
// ✅ Good - Uses themed component
<ThemedButton variant="primary">Click Me</ThemedButton>

// ❌ Bad - Manual styling
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
  Click Me
</button>
```

### 3. Use Utility Functions
```tsx
// ✅ Good - Uses utility functions
const { getButtonClasses } = useUIConfig();
<button className={getButtonClasses('primary', 'large', 'w-full')}>
  Submit
</button>

// ❌ Bad - Manual class construction
<button className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-6 py-3 rounded-lg text-lg font-medium w-full">
  Submit
</button>
```

### 4. Extend, Don't Override
```tsx
// ✅ Good - Extends existing classes
const { getCardClasses } = useUIConfig();
<div className={getCardClasses('elevated', 'max-w-md mx-auto')}>
  Content
</div>

// ❌ Bad - Completely custom styling
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
  Content
</div>
```

## Migration Guide

### From Hardcoded Classes

1. **Identify hardcoded styling**:
```tsx
// Before
<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
    Title
  </h1>
  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
    Action
  </button>
</div>
```

2. **Replace with themed components**:
```tsx
// After
<ThemedCard variant="default">
  <ThemedCardHeader>
    <ThemedCardTitle>Title</ThemedCardTitle>
  </ThemedCardHeader>
  <ThemedCardContent>
    <ThemedButton variant="primary">Action</ThemedButton>
  </ThemedCardContent>
</ThemedCard>
```

### From Existing UI Libraries

1. **Wrap existing components**:
```tsx
const ThemedExistingComponent = ({ children, ...props }) => {
  const { colors } = useUIConfig();
  
  return (
    <ExistingComponent 
      className={colors.card}
      {...props}
    >
      {children}
    </ExistingComponent>
  );
};
```

## Troubleshooting

### Theme Not Applying
- Ensure `ThemeProvider` wraps your app
- Check that components are using the theme hooks
- Verify Tailwind CSS is properly configured

### Dark Mode Not Persisting
- Check browser localStorage permissions
- Ensure the theme context is properly initialized

### TypeScript Errors
- Update interface definitions when adding new configuration options
- Use proper type guards for variant props

## Examples

See `client/components/examples/ThemeExample.tsx` for comprehensive usage examples of all features.

## Contributing

When adding new UI components or modifying existing ones:

1. Always use the centralized UI configuration
2. Support both light and dark modes
3. Add proper TypeScript types
4. Update this documentation
5. Add examples to the ThemeExample component
6. Test in both light and dark modes
