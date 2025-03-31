
import React from "react";
import { Scale, TrendingUp, BarChartBig, Cpu } from "lucide-react";
import { DashboardNavItem } from "./DashboardNavItem";

interface StrategyNavSectionProps {
  currentPath: string;
}

export function StrategyNavSection({ currentPath }: StrategyNavSectionProps) {
  return (
    <div className="space-y-1">
      <DashboardNavItem 
        to="/strategies" 
        icon={Scale} 
        label="Strategies" 
        currentPath={currentPath} 
      />
      <DashboardNavItem 
        to="/strategy-builder" 
        icon={TrendingUp} 
        label="Strategy Builder" 
        currentPath={currentPath} 
      />
      <DashboardNavItem 
        to="/strategy-comparison" 
        icon={BarChartBig} 
        label="Strategy Comparison" 
        currentPath={currentPath} 
      />
      <DashboardNavItem 
        to="/bots" 
        icon={Cpu} 
        label="Available Bots" 
        currentPath={currentPath} 
      />
    </div>
  );
}
