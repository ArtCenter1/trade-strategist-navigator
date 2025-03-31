
import React from "react";
import { User, Settings } from "lucide-react";
import { DashboardNavItem } from "./DashboardNavItem";

interface UserNavSectionProps {
  currentPath: string;
}

export function UserNavSection({ currentPath }: UserNavSectionProps) {
  return (
    <div className="space-y-1">
      <DashboardNavItem 
        to="/profile" 
        icon={User} 
        label="Profile" 
        currentPath={currentPath} 
      />
      <DashboardNavItem 
        to="/settings" 
        icon={Settings} 
        label="Settings" 
        currentPath={currentPath} 
      />
    </div>
  );
}
