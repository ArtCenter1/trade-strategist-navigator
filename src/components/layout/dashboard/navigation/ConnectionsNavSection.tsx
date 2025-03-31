
import React from "react";
import { Link } from "lucide-react";
import { DashboardNavItem } from "./DashboardNavItem";

interface ConnectionsNavSectionProps {
  currentPath: string;
}

export function ConnectionsNavSection({ currentPath }: ConnectionsNavSectionProps) {
  return (
    <div className="space-y-1">
      <DashboardNavItem 
        to="/exchange-connection" 
        icon={Link} 
        label="Exchange Connections" 
        currentPath={currentPath} 
      />
    </div>
  );
}
