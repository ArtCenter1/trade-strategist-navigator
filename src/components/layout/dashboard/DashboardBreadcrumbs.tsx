
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight, Home } from "lucide-react";

export function DashboardBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Map route paths to readable names
  const getReadableName = (path: string): string => {
    // Handle strategy detail pages
    if (path.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
      return "Strategy Details";
    }
    
    const nameMap: Record<string, string> = {
      "dashboard": "Dashboard",
      "strategies": "Strategies",
      "settings": "Settings",
      "profile": "Profile",
      "performance": "Performance",
      "exchanges": "Exchanges",
      "portfolio": "Portfolio"
    };
    
    return nameMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  // Don't show breadcrumbs on the main dashboard
  if (pathnames.length === 1 && pathnames[0] === "dashboard") {
    return null;
  }

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/dashboard">
              <Home className="h-3.5 w-3.5" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <React.Fragment key={to}>
              <BreadcrumbSeparator>
                <ChevronRight className="h-3.5 w-3.5" />
              </BreadcrumbSeparator>
              
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{getReadableName(value)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to}>{getReadableName(value)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
