
import React from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import { NavigationMenu } from "./NavigationMenu";
import { UserProfileSection } from "./UserProfileSection";

interface DashboardSidebarProps {
  onSignOut: () => void;
}

export function DashboardSidebar({ onSignOut }: DashboardSidebarProps) {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="pb-2">
        <div className="flex items-center gap-2 px-3 pt-4">
          <div className="h-8 w-8 rounded-md bg-trading-navy text-white flex items-center justify-center shadow-md">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <span className="font-semibold text-lg">OmniTrade</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <NavigationMenu />
      </SidebarContent>
      
      <SidebarFooter>
        <UserProfileSection onSignOut={onSignOut} />
      </SidebarFooter>
    </Sidebar>
  );
}
