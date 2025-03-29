
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { MobileMenu } from "./MobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  accountMenuItems: Array<{
    title: string;
    url: string;
    icon: React.ComponentType<any>;
  }>;
  onSignOut: () => void;
}

export function DashboardHeader({ accountMenuItems, onSignOut }: DashboardHeaderProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getPageTitle = () => {
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/strategies") return "Trading Strategies";
    if (location.pathname === "/settings") return "Settings";
    if (location.pathname === "/profile") return "Your Profile";
    if (location.pathname.startsWith("/strategies/")) return "Strategy Details";
    return "";
  };

  return (
    <header className="flex items-center h-16 px-4 border-b gap-4 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
      <SidebarTrigger />
      <div className="text-base font-medium">
        {getPageTitle()}
      </div>
      <div className="ml-auto flex items-center gap-2">
        {isMobile && (
          <MobileMenu 
            isOpen={mobileMenuOpen} 
            setIsOpen={setMobileMenuOpen} 
            accountMenuItems={accountMenuItems}
            onSignOut={onSignOut}
          />
        )}
        
        <Button variant="outline" size="sm" className="hidden md:flex">
          <Wallet className="h-4 w-4 mr-2" />
          <span>Connect Exchange</span>
        </Button>
      </div>
    </header>
  );
}
