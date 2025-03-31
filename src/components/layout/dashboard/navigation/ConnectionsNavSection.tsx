
import React from "react";
import { DashboardNavItem } from "./DashboardNavItem";

interface ConnectionsNavSectionProps {
  currentPath: string;
}

export function ConnectionsNavSection({ currentPath }: ConnectionsNavSectionProps) {
  return (
    <div className="space-y-1">
      <DashboardNavItem 
        to="/exchange-connection" 
        icon={LinkIcon} 
        label="Exchange Connections" 
        currentPath={currentPath} 
      />
    </div>
  );
}

// Custom link icon component
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
