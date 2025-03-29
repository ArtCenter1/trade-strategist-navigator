
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  LayoutDashboard, 
  Settings, 
  User, 
  LineChart, 
  Wallet,
  Globe,
  Zap
} from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard/DashboardSidebar";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { MainContent } from "./dashboard/MainContent";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const mainMenuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Strategies",
      url: "/strategies",
      icon: Zap,
    },
    {
      title: "Performance",
      url: "/performance",
      icon: LineChart,
    },
    {
      title: "Exchanges",
      url: "/exchanges",
      icon: Globe,
    },
    {
      title: "Portfolio",
      url: "/portfolio",
      icon: Wallet,
      badge: "New",
    },
  ];
  
  const accountMenuItems = [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ];

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar 
          mainMenuItems={mainMenuItems} 
          accountMenuItems={accountMenuItems}
          onSignOut={handleSignOut}
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader 
            accountMenuItems={accountMenuItems}
            onSignOut={handleSignOut}
          />
          
          <MainContent>
            {children}
          </MainContent>
        </div>
      </div>
    </SidebarProvider>
  );
}
