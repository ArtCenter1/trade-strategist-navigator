import {
  Home,
  LayoutDashboard,
  Settings,
  User,
  BarChartBig,
  Scale,
  TrendingUp,
  LayoutPanelLeft,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar/sidebar-context";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

export function NavigationMenu() {
  const { state } = useSidebar();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setIsCollapsed(state === "collapsed");
  }, [state]);

  return (
    <nav className="space-y-1">
      <NavLink
        to="/dashboard"
        className={clsx(
          "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          location.pathname === "/dashboard"
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-primary/5"
        )}
      >
        <DashboardIcon
          className={clsx(
            "mr-3 flex-shrink-0 h-6 w-6",
            location.pathname === "/dashboard"
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        Dashboard
      </NavLink>
      
      <NavLink
        to="/strategies"
        className={clsx(
          "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          location.pathname === "/strategies"
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-primary/5"
        )}
      >
        <Scale
          className={clsx(
            "mr-3 flex-shrink-0 h-6 w-6",
            location.pathname === "/strategies"
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        Strategies
      </NavLink>
      
      <NavLink
        to="/strategy-builder"
        className={clsx(
          "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          location.pathname === "/strategy-builder"
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-primary/5"
        )}
      >
        <TrendingUp
          className={clsx(
            "mr-3 flex-shrink-0 h-6 w-6",
            location.pathname === "/strategy-builder"
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        Strategy Builder
      </NavLink>
      
      <NavLink
        to="/strategy-comparison"
        className={clsx(
          "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          location.pathname === "/strategy-comparison"
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-primary/5"
        )}
      >
        <BarChartBig
          className={clsx(
            "mr-3 flex-shrink-0 h-6 w-6",
            location.pathname === "/strategy-comparison"
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        Strategy Comparison
      </NavLink>
      
      <NavLink
        to="/exchange-connection"
        className={clsx(
          "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          location.pathname === "/exchange-connection"
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-primary/5"
        )}
      >
        <LinkIcon
          className={clsx(
            "mr-3 flex-shrink-0 h-6 w-6",
            location.pathname === "/exchange-connection"
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        Exchange Connections
      </NavLink>
      
      <NavLink
        to="/profile"
        className={clsx(
          "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          location.pathname === "/profile"
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-primary/5"
        )}
      >
        <User
          className={clsx(
            "mr-3 flex-shrink-0 h-6 w-6",
            location.pathname === "/profile"
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        Profile
      </NavLink>
      
      <NavLink
        to="/settings"
        className={clsx(
          "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          location.pathname === "/settings"
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-primary/5"
        )}
      >
        <Settings
          className={clsx(
            "mr-3 flex-shrink-0 h-6 w-6",
            location.pathname === "/settings"
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        Settings
      </NavLink>
    </nav>
  );
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <LayoutDashboard
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </LayoutDashboard>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
