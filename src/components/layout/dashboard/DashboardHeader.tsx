
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, CreditCard, Gift, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { MobileMenu } from "./MobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

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
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex items-center h-16 px-4 border-b gap-4 bg-[#111111] backdrop-blur-sm sticky top-0 z-10 border-[#333333] text-white">
      <SidebarTrigger />
      
      <div className="hidden md:flex items-center gap-6 text-sm">
        <div className="font-medium">Dashboard</div>
        <div className="text-[#999999] cursor-pointer hover:text-white transition-colors">Terminal</div>
        <div className="text-[#999999] cursor-pointer hover:text-white transition-colors">Bots</div>
        <div className="text-[#999999] cursor-pointer hover:text-white transition-colors">Earn</div>
        <div className="text-[#999999] cursor-pointer hover:text-white transition-colors">Markets</div>
      </div>
      
      <div className="ml-auto flex items-center gap-3">
        {/* Warning notification */}
        <div className="hidden lg:flex items-center">
          <Badge className="bg-yellow-600 text-black py-1 px-2 rounded-sm text-xs font-normal">
            <span className="mr-1">⚠️</span> UPGRADE
          </Badge>
        </div>
        
        {/* Deposit to earn notification */}
        <div className="hidden lg:flex items-center">
          <div className="bg-[#9F7AEA] text-white px-4 py-1.5 rounded-md text-xs flex items-center">
            <Gift className="h-3.5 w-3.5 mr-1.5" />
            <span>Deposit & Earn 20% APY</span>
          </div>
        </div>
        
        {/* Notifications */}
        <Button variant="outline" size="icon" className="relative h-9 w-9 border-[#333333] bg-transparent hover:bg-[#222222]">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        
        {/* User profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 flex items-center gap-1.5 text-sm hover:bg-[#222222]">
              <Avatar className="h-7 w-7 border border-[#444444]">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-[#333333] text-[10px]">JD</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">Vincent</span>
              <ChevronDown className="h-4 w-4 text-[#999999]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#222222] border-[#333333] text-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#333333]" />
            {accountMenuItems.map((item) => (
              <DropdownMenuItem 
                key={item.title}
                className="hover:bg-[#333333] cursor-pointer"
                onClick={() => navigate(item.url)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-[#333333]" />
            <DropdownMenuItem 
              className="hover:bg-[#333333] cursor-pointer text-[#FF3B30]" 
              onClick={onSignOut}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Connect Exchange button - visible on larger screens */}
        <Button variant="default" size="sm" className="hidden md:flex bg-[#9F7AEA] hover:bg-[#8B5CF6] text-white">
          <Wallet className="h-4 w-4 mr-2" />
          <span>Connect Exchange</span>
        </Button>
        
        {isMobile && (
          <MobileMenu 
            isOpen={mobileMenuOpen} 
            setIsOpen={setMobileMenuOpen} 
            accountMenuItems={accountMenuItems}
            onSignOut={onSignOut}
          />
        )}
      </div>
    </header>
  );
}
