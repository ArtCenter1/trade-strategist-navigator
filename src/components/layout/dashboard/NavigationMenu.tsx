
import React from "react";
import { useLocation } from "react-router-dom";
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NavigationItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  badge?: string;
}

interface NavigationMenuProps {
  mainMenuItems: NavigationItem[];
  accountMenuItems: NavigationItem[];
}

export function NavigationMenu({ mainMenuItems, accountMenuItems }: NavigationMenuProps) {
  const location = useLocation();

  return (
    <>
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
    </>
  );
}
