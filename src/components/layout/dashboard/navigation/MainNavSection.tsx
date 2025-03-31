
import React from "react";
import { LayoutDashboard, Terminal, Bot, DollarSign, BarChart } from "lucide-react";
import { DashboardNavItem } from "./DashboardNavItem";

interface MainNavSectionProps {
  currentPath: string;
}

export function MainNavSection({ currentPath }: MainNavSectionProps) {
  return (
    <div className="space-y-1">
      <DashboardNavItem 
        to="/dashboard" 
        icon={LayoutDashboard} 
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
        icon={Bot} 
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
