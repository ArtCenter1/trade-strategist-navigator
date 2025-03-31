
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info, Link, Shield, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

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
  const lastTestedDate = new Date(connection.lastTested);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{connection.label}</CardTitle>
            <p className="text-sm text-muted-foreground">{connection.exchangeName}</p>
          </div>
          <div className="flex items-center">
            {connection.isConnected ? (
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
          
          <div className="text-xs text-muted-foreground flex items-center">
            <Info className="h-3 w-3 mr-1" />
            Last tested {formatDistanceToNow(lastTestedDate, { addSuffix: true })}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" className="text-xs">
          <Shield className="h-3 w-3 mr-1" />
          Test Connection
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          <Link className="h-3 w-3 mr-1" />
          Manage
        </Button>
      </CardFooter>
    </Card>
  );
}
