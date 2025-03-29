
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Configure how and when you receive notifications about your trading activities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Trading Notifications</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="trades">Trade Executions</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications when trades are executed
              </p>
            </div>
            <Switch id="trades" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="strategy-status">Strategy Status</Label>
              <p className="text-sm text-muted-foreground">
                Get alerts when strategy status changes (active, paused, error)
              </p>
            </div>
            <Switch id="strategy-status" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="performance">Performance Updates</Label>
              <p className="text-sm text-muted-foreground">
                Receive daily performance summary of your strategies
              </p>
            </div>
            <Switch id="performance" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Account Notifications</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="balance">Balance Changes</Label>
              <p className="text-sm text-muted-foreground">
                Get notifications for significant balance changes
              </p>
            </div>
            <Switch id="balance" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="security">Security Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications about security events
              </p>
            </div>
            <Switch id="security" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="news">Market News</Label>
              <p className="text-sm text-muted-foreground">
                Get updates about relevant market news
              </p>
            </div>
            <Switch id="news" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Methods</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Send notifications to your email
              </p>
            </div>
            <Switch id="email" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="browser">Browser Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Show notifications in your browser when using the platform
              </p>
            </div>
            <Switch id="browser" defaultChecked />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
