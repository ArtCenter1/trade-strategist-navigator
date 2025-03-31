
import React from "react";
import { NavLink } from "react-router-dom";
import { clsx } from "clsx";
import { LucideIcon } from "lucide-react";

interface DashboardNavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  currentPath: string;
}

export function DashboardNavItem({ to, icon: Icon, label, currentPath }: DashboardNavItemProps) {
  return (
    <NavLink
      to={to}
      className={clsx(
        "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
        currentPath === to
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-primary/5"
      )}
    >
      <Icon
        className={clsx(
          "mr-3 flex-shrink-0 h-6 w-6",
          currentPath === to
            ? "text-primary"
            : "text-muted-foreground group-hover:text-foreground"
        )}
      />
      {label}
    </NavLink>
  );
}
