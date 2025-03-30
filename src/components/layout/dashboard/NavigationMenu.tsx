
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface NavigationMenuProps {
  mainMenuItems: Array<{
    title: string;
    url: string;
    icon: React.ComponentType<any>;
    badge?: string;
  }>;
  accountMenuItems: Array<{
    title: string;
    url: string;
    icon: React.ComponentType<any>;
  }>;
}

export function NavigationMenu({ mainMenuItems, accountMenuItems }: NavigationMenuProps) {
  const location = useLocation();
  
  // Add strategy management links
  const strategyMenuItems = [
    {
      title: "Browse Strategies",
      url: "/strategies",
      isActive: location.pathname === "/strategies",
    },
    {
      title: "Compare Strategies",
      url: "/strategy-comparison",
      isActive: location.pathname === "/strategy-comparison",
    },
    {
      title: "Create Custom Strategy",
      url: "/strategy-builder",
      isActive: location.pathname === "/strategy-builder",
    }
  ];
  
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Overview</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {mainMenuItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.url}
                  tooltip={item.title}
                >
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.badge && (
                  <div className="absolute right-1 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium">
                    {item.badge}
                  </div>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarGroup>
        <SidebarGroupLabel>Strategy Management</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {strategyMenuItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  isActive={item.isActive}
                  tooltip={item.title}
                >
                  <Link to={item.url}>
                    <span>{item.title}</span>
                  </Link>
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
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.url}
                  tooltip={item.title}
                >
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
