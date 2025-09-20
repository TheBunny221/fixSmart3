/**
 * Utility functions for consistent status colors across the application
 * All colors are theme-aware and work in both light and dark modes
 */

export const getStatusColor = (status: string): string => {
  switch (status?.toUpperCase()) {
    case "REGISTERED":
      return "bg-muted text-muted-foreground";
    case "ASSIGNED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "RESOLVED":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "CLOSED":
      return "bg-muted text-muted-foreground";
    case "REOPENED":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority?.toUpperCase()) {
    case "LOW":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "HIGH":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "CRITICAL":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getSLAColor = (sla: string): string => {
  switch (sla?.toUpperCase()) {
    case "ON_TIME":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "WARNING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "OVERDUE":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "COMPLETED":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getRoleColor = (role: string): string => {
  switch (role?.toUpperCase()) {
    case "ADMINISTRATOR":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "WARD_OFFICER":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "MAINTENANCE_TEAM":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "CITIZEN":
      return "bg-muted text-muted-foreground";
    case "GUEST":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    default:
      return "bg-muted text-muted-foreground";
  }
};

/**
 * Generic function to get theme-aware colors for any status type
 */
export const getThemeAwareColor = (
  value: string,
  type: 'status' | 'priority' | 'sla' | 'role' = 'status'
): string => {
  switch (type) {
    case 'status':
      return getStatusColor(value);
    case 'priority':
      return getPriorityColor(value);
    case 'sla':
      return getSLAColor(value);
    case 'role':
      return getRoleColor(value);
    default:
      return "bg-muted text-muted-foreground";
  }
};
