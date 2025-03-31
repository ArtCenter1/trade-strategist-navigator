
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Settings, User } from "lucide-react";
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

  const accountMenuItems = [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      onClick: () => navigate("/settings"),
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
      onClick: () => navigate("/profile"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <DashboardHeader 
        accountMenuItems={accountMenuItems}
        onSignOut={handleSignOut}
      />
      
      <MainContent>
        {children}
      </MainContent>
    </div>
  );
}
