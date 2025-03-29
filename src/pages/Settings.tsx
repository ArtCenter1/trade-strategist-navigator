
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationSettings } from "@/components/settings/NotificationSettings";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API & Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-4">
          <div className="text-lg font-medium">Account Settings</div>
          <p className="text-muted-foreground">
            Your account settings will be available here. This includes profile information, 
            security settings, and account management options.
          </p>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4">
          <div className="text-lg font-medium">Preferences</div>
          <p className="text-muted-foreground">
            Your trading preferences and UI settings will be available here.
          </p>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <div className="text-lg font-medium">API & Integration</div>
          <p className="text-muted-foreground">
            Manage your API keys and third-party integrations here.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
