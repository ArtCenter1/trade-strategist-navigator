
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info, Link, Shield, XCircle, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useConnectionMonitor } from "@/hooks/useConnectionMonitor";
import { useToast } from "@/hooks/use-toast";

interface Balance {
  asset: string;
  free: number;
  locked: number;
}

interface Connection {
  id: string;
  exchangeId: string;
  exchangeName: string;
  label: string;
  isConnected: boolean;
  lastTested: string;
  permissions: string[];
  balances?: Balance[];
}

interface ExchangeConnectionCardProps {
  connection: Connection;
}

export function ExchangeConnectionCard({ connection }: ExchangeConnectionCardProps) {
  const { toast } = useToast();
  const [lastCheckedText, setLastCheckedText] = useState<string>("");
  
  // Initialize connection monitor
  const { 
    status, 
    isMonitoring, 
    isCheckingNow, 
    checkHealth, 
    startMonitoring, 
    stopMonitoring 
  } = useConnectionMonitor({
    connectionId: connection.id,
    initialStatus: connection.isConnected,
    interval: 300000, // Check every 5 minutes
    onStatusChange: (newStatus) => {
      // Notify user of connection status changes
      if (newStatus.isConnected !== connection.isConnected) {
        toast({
          title: newStatus.isConnected ? "Connection Restored" : "Connection Lost",
          description: newStatus.isConnected 
            ? `Connection to ${connection.exchangeName} is back online.`
            : `Connection to ${connection.exchangeName} has been lost.`,
          variant: newStatus.isConnected ? "default" : "destructive",
        });
      }
    }
  });

  // Start monitoring when component mounts
  useEffect(() => {
    startMonitoring();
    return () => stopMonitoring();
  }, []);

  // Update the last checked text every minute
  useEffect(() => {
    const updateLastCheckedText = () => {
      setLastCheckedText(formatDistanceToNow(status.lastChecked, { addSuffix: true }));
    };
    
    updateLastCheckedText();
    
    const interval = setInterval(updateLastCheckedText, 60000);
    
    return () => clearInterval(interval);
  }, [status.lastChecked]);

  // Handle manual connection test
  const handleTestConnection = () => {
    checkHealth();
    
    toast({
      title: "Testing Connection",
      description: `Checking connection to ${connection.exchangeName}...`,
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{connection.label}</CardTitle>
            <p className="text-sm text-muted-foreground">{connection.exchangeName}</p>
          </div>
          <div className="flex items-center">
            {status.isConnected ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Check className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                <XCircle className="h-3 w-3 mr-1" />
                Disconnected
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Permissions</h4>
            <div className="flex flex-wrap gap-1">
              {connection.permissions.map(permission => (
                <Badge key={permission} variant="secondary" className="text-xs">
                  {permission}
                </Badge>
              ))}
            </div>
          </div>
          
          {connection.balances && (
            <div>
              <h4 className="text-sm font-medium mb-1">Balances</h4>
              <div className="space-y-1 text-sm">
                {connection.balances.slice(0, 3).map(balance => (
                  <div key={balance.asset} className="flex justify-between">
                    <span className="font-medium">{balance.asset}</span>
                    <span>{balance.free + balance.locked} {balance.asset}</span>
                  </div>
                ))}
                {connection.balances.length > 3 && (
                  <div className="text-xs text-muted-foreground text-right mt-1">
                    +{connection.balances.length - 3} more assets
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>
              {status.latency 
                ? `Last checked ${lastCheckedText} (${status.latency}ms)` 
                : `Last checked ${lastCheckedText}`}
            </span>
            {status.message && (
              <span className="ml-1 italic">
                {status.message}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs"
          onClick={handleTestConnection}
          disabled={isCheckingNow}
        >
          {isCheckingNow ? (
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
          ) : (
            <Shield className="h-3 w-3 mr-1" />
          )}
          {isCheckingNow ? "Testing..." : "Test Connection"}
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          <Link className="h-3 w-3 mr-1" />
          Manage
        </Button>
      </CardFooter>
    </Card>
  );
}
