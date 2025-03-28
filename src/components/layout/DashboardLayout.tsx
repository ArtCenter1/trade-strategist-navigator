
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Settings, 
  User, 
  LogOut, 
  LineChart, 
  Wallet,
  Globe,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const getInitials = (email: string) => {
    return email?.substring(0, 2).toUpperCase() || "U";
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar variant="sidebar" collapsible={isMobile ? "offcanvas" : "icon"}>
          <SidebarHeader className="pb-2">
            <div className="flex items-center gap-2 px-3 pt-4">
              <div className="h-8 w-8 rounded-md bg-trading-navy text-white flex items-center justify-center shadow-md">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <span className="font-semibold text-lg">OmniBot</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        tooltip={item.title}
                        isActive={location.pathname === item.url}
                      >
                        <a href={item.url} className="relative">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant="outline" 
                              className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary/10 text-primary text-[10px] px-1 py-0"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {accountMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        tooltip={item.title}
                        isActive={location.pathname === item.url}
                      >
                        <a href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Sign out</span>
            </Button>
            
            {user && (
              <div className="px-4 py-3 mt-2 bg-secondary/50 rounded-md">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {getInitials(user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-medium truncate">{user.email}</div>
                    <div className="text-xs text-muted-foreground">Free Plan</div>
                  </div>
                </div>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center h-16 px-4 border-b gap-4 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger />
            <div className="text-base font-medium">
              {location.pathname === "/dashboard" ? "Dashboard" :
               location.pathname === "/strategies" ? "Trading Strategies" :
               location.pathname === "/settings" ? "Settings" :
               location.pathname === "/profile" ? "Your Profile" : ""}
            </div>
            <div className="ml-auto flex items-center gap-2">
              {isMobile && (
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="md:hidden">
                      <User className="h-4 w-4 mr-2" />
                      <span>Account</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[280px] p-0">
                    <div className="p-6 border-b">
                      <h2 className="text-lg font-semibold mb-1">Your Account</h2>
                      {user && <p className="text-sm text-muted-foreground">{user.email}</p>}
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {accountMenuItems.map((item) => (
                          <a 
                            key={item.title} 
                            href={item.url}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-md w-full text-sm transition-colors",
                              location.pathname === item.url 
                                ? "bg-primary/10 text-primary font-medium" 
                                : "hover:bg-secondary"
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                          </a>
                        ))}
                        
                        <Separator />
                        
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-destructive hover:bg-destructive/10"
                          onClick={() => {
                            handleSignOut();
                            setMobileMenuOpen(false);
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
              
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Wallet className="h-4 w-4 mr-2" />
                <span>Connect Exchange</span>
              </Button>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto">
            <div className="container max-w-7xl mx-auto p-4 md:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
