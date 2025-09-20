import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useSystemConfig } from "../contexts/SystemConfigContext";
import { logout } from "../store/slices/authSlice";
import { setLanguage } from "../store/slices/languageSlice";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { ThemeSwitch } from "./ui/theme-switch";
import { Logo } from "./ui/logo";
import { useTheme } from "../contexts/ThemeContext";
import { cn } from "../lib/utils";
import {
  BarChart3,
  Bell,
  ChevronDown,
  Database,
  FileText,
  Globe,
  Home,
  LogOut,
  MapPin,
  Menu,
  Moon,
  Shield,
  Sun,
  TrendingUp,
  User,
  Users,
  Wrench,
  X,
} from "lucide-react";

type UserRole =
  | "CITIZEN"
  | "WARD_OFFICER"
  | "MAINTENANCE_TEAM"
  | "ADMINISTRATOR"
  | "GUEST";

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
  badge?: number;
}

const Navigation: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { translations, currentLanguage } = useAppSelector(
    (state) => state.language,
  );
  const { notifications } = useAppSelector((state) => state.ui);
  const { appName, appLogoUrl, appLogoSize } = useSystemConfig();
  const { isDarkMode, toggleDarkMode, uiConfig } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Close mobile menu on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = e.target as Element;
        const nav = target.closest("nav");
        if (!nav) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const navigationItems: NavigationItem[] = [
    {
      label: translations.nav.home,
      path: "/",
      icon: <Home className="h-4 w-4" />,
      roles: [
        "CITIZEN",
        "WARD_OFFICER",
        "MAINTENANCE_TEAM",
        "ADMINISTRATOR",
        "GUEST",
      ],
    },
    {
      label: translations.nav.dashboard,
      path: "/dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
      roles: ["CITIZEN", "WARD_OFFICER", "MAINTENANCE_TEAM", "ADMINISTRATOR"],
    },
    {
      label: translations.nav.complaints,
      path: "/complaints",
      icon: <FileText className="h-4 w-4" />,
      roles: ["CITIZEN", "WARD_OFFICER", "MAINTENANCE_TEAM", "ADMINISTRATOR"],
    },
    // {
    //   label: translations?.dashboard?.pendingTasks || "My Tasks",
    //   path: "/tasks",
    //   icon: <Calendar className="h-4 w-4" />,
    //   roles: ["WARD_OFFICER", "MAINTENANCE_TEAM"],
    // },
    {
      label: translations?.nav?.ward || "Ward Management",
      path: "/ward",
      icon: <MapPin className="h-4 w-4" />,
      roles: ["WARD_OFFICER"],
    },
    {
      label: translations?.nav?.maintenance || "Maintenance",
      path: "/maintenance",
      icon: <Wrench className="h-4 w-4" />,
      roles: ["MAINTENANCE_TEAM"],
    },
    // {
    //   label: translations?.messages?.complaintRegistered || "Communication",
    //   path: "/messages",
    //   icon: <MessageSquare className="h-4 w-4" />,
    //   roles: ["WARD_OFFICER", "MAINTENANCE_TEAM"],
    // },
    {
      label: translations.nav.reports,
      path: "/reports",
      icon: <TrendingUp className="h-4 w-4" />,
      roles: ["WARD_OFFICER", "ADMINISTRATOR", "MAINTENANCE_TEAM"],
    },
    {
      label: translations.nav.users,
      path: "/admin/users",
      icon: <Users className="h-4 w-4" />,
      roles: ["ADMINISTRATOR"],
    },
    {
      label: translations?.settings?.generalSettings || "System Config",
      path: "/admin/config",
      icon: <Database className="h-4 w-4" />,
      roles: ["ADMINISTRATOR"],
    },
    // {
    //   label: translations?.nav?.languages || "Languages",
    //   path: "/admin/languages",
    //   icon: <Globe className="h-4 w-4" />,
    //   roles: ["ADMINISTRATOR"],
    // },
    // {
    //   label: translations?.nav?.settings || "Settings",
    //   path: "/settings",
    //   icon: <Settings className="h-4 w-4" />,
    //   roles: ["CITIZEN", "WARD_OFFICER", "MAINTENANCE_TEAM", "ADMINISTRATOR"],
    // },
  ];

  const filteredNavItems = navigationItems.filter((item) => {
    if (!user) return false;

    if (item.path === "/" && user) {
      return false;
    }

    // For MAINTENANCE_TEAM users, show only Dashboard and Complaints
    if (user.role === "MAINTENANCE_TEAM") {
      return item.path === "/dashboard" || item.path === "/complaints";
    }

    return item.roles.includes(user.role as UserRole);
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLanguageChange = (language: "en" | "hi" | "ml") => {
    dispatch(setLanguage(language));
  };

  const getUnreadNotificationCount = () => {
    return notifications.filter((n) => !n.isRead).length;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
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

  if (!isAuthenticated) {
    return (
      <nav className={cn("shadow-sm border-b fixed top-0 left-0 right-0 z-50", uiConfig.colors.card)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Logo
                logoUrl={appLogoUrl}
                appName={appName}
                size={appLogoSize}
                context="nav"
                to="/"
                responsive
                fallbackIcon={Shield}
              />
            </div>

            {/* Mobile menu button for unauthenticated users */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 relative"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="flex items-center justify-center w-5 h-5">
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 transition-all duration-200" />
                  ) : (
                    <Menu className="h-5 w-5 transition-all duration-200" />
                  )}
                </div>
              </Button>
            </div>

            {/* Desktop Navigation for unauthenticated users */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {/* Dark Mode Toggle */}
              <ThemeSwitch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
              />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-1 lg:mr-2" />
                    <span className="hidden lg:inline">
                      {currentLanguage.toUpperCase()}
                    </span>
                    <span className="lg:hidden">{currentLanguage}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange("hi")}>
                    हिंदी
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange("ml")}>
                    മלയാളം
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Link to="/complaint">
                <Button variant="outline" size="sm">
                  <span className="hidden lg:inline">
                    {translations?.complaints?.registerComplaint ||
                      "Register Complaint"}
                  </span>
                  <span className="lg:hidden">Complaint</span>
                </Button>
              </Link> */}
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <span className="hidden lg:inline">
                    {translations.nav.login}
                  </span>
                  <span className="lg:hidden">Login</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  <span className="hidden lg:inline">
                    {translations?.auth?.signUp ||
                      translations.nav.register ||
                      "Sign Up"}
                  </span>
                  <span className="lg:hidden">Sign Up</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Menu for unauthenticated users */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out backdrop-blur-sm ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className={cn("px-4 pt-3 pb-4 space-y-3 border-t shadow-lg backdrop-blur-md", uiConfig.colors.card, uiConfig.colors.border)}>
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Dark Mode</span>
                <ThemeSwitch
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-center mb-3"
                  >
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      <span>{currentLanguage.toUpperCase()}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange("hi")}>
                    हिंदी
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange("ml")}>
                    മലयാळം
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                to="/complaint"
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full">
                  {translations?.complaints?.registerComplaint ||
                    "Register Complaint"}
                </Button>
              </Link>
              <Link
                to="/login"
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full">
                  {translations.nav.login}
                </Button>
              </Link>
              <Link
                to="/register"
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full">
                  {translations?.auth?.signUp ||
                    translations.nav.register ||
                    "Sign Up"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={cn("shadow-sm border-b fixed top-0 left-0 right-0 z-50", uiConfig.colors.card)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo
              logoUrl={appLogoUrl}
              appName={appName}
              size={appLogoSize}
              context="nav"
              to="/"
              responsive
              fallbackIcon={Shield}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center justify-center ">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 relative"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="flex items-center justify-center w-5 h-5">
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 transition-all duration-200" />
                ) : (
                  <Menu className="h-5 w-5 transition-all duration-200" />
                )}
              </div>
            </Button>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {/* Dark Mode Toggle */}
            <ThemeSwitch
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
            />

            {/* Notifications */}
            {false && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    {getUnreadNotificationCount() > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                      >
                        {getUnreadNotificationCount()}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-2">
                    <h3 className="font-semibold text-sm mb-2">
                      {translations?.auth?.notifications || "Notifications"}
                    </h3>
                    {notifications.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        {translations?.common?.noData || "No notifications"}
                      </p>
                    ) : (
                      notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-2 rounded-md mb-2 ${
                            notification.isRead ? "bg-muted/50" : "bg-blue-50 dark:bg-blue-950"
                          }`}
                        >
                          <p className="text-sm font-medium">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="h-4 w-4 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">
                    {currentLanguage.toUpperCase()}
                  </span>
                  <span className="lg:hidden">{currentLanguage}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("hi")}>
                  हिंदी
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("ml")}>
                  മലയാളം
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-3 h-auto py-2 px-3 hover:bg-accent"
                  size="sm"
                >
                  <Avatar className="h-9 w-9 ring-2 ring-border">
                    <AvatarImage src={user?.avatar} alt={user?.fullName} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:flex flex-col items-start min-w-0">
                    <p className="text-sm font-medium text-foreground truncate max-w-32">
                      {user?.fullName || "User"}
                    </p>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${getRoleColor(user?.role || "")}`}
                    >
                      {user?.role?.replace("_", " ") || "User"}
                    </Badge>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {/* User Info Header */}
                <div className="flex items-center space-x-3 p-3 border-b border-border">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.fullName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user?.fullName || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email || "No email"}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-xs mt-1 ${getRoleColor(user?.role || "")}`}
                    >
                      {user?.role?.replace("_", " ") || "User"}
                    </Badge>
                  </div>
                </div>
                
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="h-4 w-4 mr-3" />
                    <span>{translations?.nav?.profile || "Profile"}</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  <span>{translations.nav.logout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out backdrop-blur-sm ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={cn("px-4 pt-3 pb-4 space-y-2 border-t shadow-lg backdrop-blur-md", uiConfig.colors.card, uiConfig.colors.border)}>
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
            <span className="text-sm font-medium text-foreground">Dark Mode</span>
            <ThemeSwitch
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>

          {/* Mobile Navigation Items */}
          <div className="space-y-1 mb-4">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <Badge
                      variant="destructive"
                      className="h-5 w-5 p-0 flex items-center justify-center text-xs ml-auto"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="block w-full px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent">
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4" />
                  <span>Language: {currentLanguage.toUpperCase()}</span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("hi")}>
                हिंदी
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("ml")}>
                മലയാളം
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile user profile section */}
          <div className="border-t border-border pt-4">
            {/* User Info */}
            <div className="flex items-center space-x-3 px-3 py-2 mb-3">
              <Avatar className="h-12 w-12 ring-2 ring-border">
                <AvatarImage src={user?.avatar} alt={user?.fullName} />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.fullName || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || "No email"}
                </p>
                <Badge
                  variant="outline"
                  className={`text-xs mt-1 ${getRoleColor(user?.role || "")}`}
                >
                  {user?.role?.replace("_", " ") || "User"}
                </Badge>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              <Link
                to="/profile"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>{translations?.nav?.profile || "Profile"}</span>
              </Link>
              
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>{translations.nav.logout}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
