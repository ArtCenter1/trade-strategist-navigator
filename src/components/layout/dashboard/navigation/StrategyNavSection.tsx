
import React from "react";
import { Scale, TrendingUp, BarChartBig, Cpu, Bot } from "lucide-react";
import { DashboardNavItem } from "./DashboardNavItem";

interface StrategyNavSectionProps {
  currentPath: string;
}

export function StrategyNavSection({ currentPath }: StrategyNavSectionProps) {
  return (
    <div className="space-y-1">
      <DashboardNavItem 
        to="/my-bots" 
        icon={Bot} 
        label="My Bots" 
        currentPath={currentPath} 
      />
      <DashboardNavItem 
        to="/bots" 
        icon={Cpu} 
        label="Available Bots" 
        currentPath={currentPath} 
      />
      <DashboardNavItem 
        to="/bot-builder" 
        icon={TrendingUp} 
        label="Bot Builder" 
        currentPath={currentPath} 
      />
      <DashboardNavItem 
        to="/strategy-comparison" 
        icon={BarChartBig} 
        label="Bot Comparison" 
        currentPath={currentPath} 
      />
    </div>
  );
}
