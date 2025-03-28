
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and settings
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifs" className="flex flex-col gap-1">
                  <span>Email Notifications</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Receive trade alerts and important updates via email
                  </span>
                </Label>
                <Switch id="email-notifs" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="trade-alerts" className="flex flex-col gap-1">
                  <span>Trade Alerts</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Get notified when trades are executed
                  </span>
                </Label>
                <Switch id="trade-alerts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="market-news" className="flex flex-col gap-1">
                  <span>Market News</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Receive updates about market events
                  </span>
                </Label>
                <Switch id="market-news" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Customize the appearance of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex flex-col gap-1">
                  <span>Dark Mode</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Switch between light and dark themes
                  </span>
                </Label>
                <Switch id="dark-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-view" className="flex flex-col gap-1">
                  <span>Compact View</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Use a more condensed layout
                  </span>
                </Label>
                <Switch id="compact-view" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage API keys and access tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Your API key provides access to your account via external applications. 
                Keep it secure and never share your API credentials.
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Generate New API Key
                </Button>
                <Button variant="outline" size="sm">
                  Revoke All Keys
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-destructive border-dashed">
            <CardHeader className="text-destructive">
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Deleting your account will remove all your data and cannot be undone. 
                Make sure to export any data you want to keep before proceeding.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
