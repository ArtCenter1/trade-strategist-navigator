
import React from "react";
import { DashboardIcon, Terminal, Cpu, DollarSign, BarChart } from "lucide-react";
import { DashboardNavItem } from "./DashboardNavItem";

interface MainNavSectionProps {
  currentPath: string;
}

export function MainNavSection({ currentPath }: MainNavSectionProps) {
  return (
    <div className="space-y-1">
      <DashboardNavItem 
        to="/dashboard" 
        icon={DashboardIcon} 
        label="Dashboard" 
        currentPath={currentPath} 
      />
      <DashboardNavItem 
        to="/terminal" 
        icon={Terminal} 
        label="Terminal" 
        currentPath={currentPath} 
      />
      <DashboardNavItem 
        to="/bots" 
        icon={Cpu} 
        label="Bots" 
        currentPath={currentPath} 
      />
      <DashboardNavItem 
        to="/earn" 
        icon={DollarSign} 
        label="Earn" 
        currentPath={currentPath} 
      />
      <DashboardNavItem 
        to="/markets" 
        icon={BarChart} 
        label="Markets" 
        currentPath={currentPath} 
      />
    </div>
  );
}

// Custom Dashboard icon component
function DashboardIcon({ className }: { className?: string }) {
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
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}
