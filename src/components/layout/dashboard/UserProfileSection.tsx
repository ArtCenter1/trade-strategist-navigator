
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface UserProfileSectionProps {
  onSignOut: () => void;
}

export function UserProfileSection({ onSignOut }: UserProfileSectionProps) {
  const { user } = useAuth();

  const getInitials = (email: string) => {
    return email?.substring(0, 2).toUpperCase() || "U";
  };

  return (
    <>
      <Button 
        variant="ghost" 
        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={onSignOut}
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
    </>
  );
}
