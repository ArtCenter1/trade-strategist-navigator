
import React from "react";
import { User, LogOut, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  accountMenuItems: Array<{
    title: string;
    url: string;
    icon: React.ComponentType<any>;
  }>;
  onSignOut: () => void;
}

export function MobileMenu({ isOpen, setIsOpen, accountMenuItems, onSignOut }: MobileMenuProps) {
  const location = useLocation();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden">
          <User className="h-4 w-4 mr-2" />
          <span>Account</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] p-0">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-1">Your Account</h2>
          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
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
                onClick={() => setIsOpen(false)}
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
                onSignOut();
                setIsOpen(false);
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
