
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar/sidebar-context";
import { MainNavSection } from "./navigation/MainNavSection";
import { StrategyNavSection } from "./navigation/StrategyNavSection";
import { ConnectionsNavSection } from "./navigation/ConnectionsNavSection";
import { UserNavSection } from "./navigation/UserNavSection";

export function NavigationMenu() {
  const { state } = useSidebar();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setIsCollapsed(state === "collapsed");
  }, [state]);

  return (
    <nav className="space-y-4">
      <MainNavSection currentPath={location.pathname} />
      
      <div className="pt-2 border-t border-border/40">
        <StrategyNavSection currentPath={location.pathname} />
      </div>
      
      <div className="pt-2 border-t border-border/40">
        <ConnectionsNavSection currentPath={location.pathname} />
      </div>
      
      <div className="pt-2 border-t border-border/40">
        <UserNavSection currentPath={location.pathname} />
      </div>
    </nav>
  );
}
