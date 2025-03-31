
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiKeyForm } from "@/components/exchange/ApiKeyForm";
import { ExchangeConnectionCard } from "@/components/exchange/ExchangeConnectionCard";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function ExchangeConnection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [connections, setConnections] = useState([]);
  const [activeTab, setActiveTab] = useState("connections");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user connections when component mounts
  useEffect(() => {
    async function fetchConnections() {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('exchange_connections')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        // Transform the data to match our component's expected format
        const formattedConnections = data.map(conn => ({
          id: conn.id,
          exchangeId: conn.exchange_name.toLowerCase(),
          exchangeName: conn.exchange_name,
          label: conn.label || conn.exchange_name,
          isConnected: conn.is_active,
          lastTested: conn.last_checked || new Date().toISOString(),
          permissions: ["READ"], // Default to READ permission
          balances: [], // We'll load these separately if needed
        }));
        
        setConnections(formattedConnections);
      } catch (error) {
        console.error("Error fetching connections:", error);
        toast({
          title: "Failed to load connections",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchConnections();
  }, [user, toast]);

  return (
    <div className="container max-w-7xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Exchange Connections</h1>
        <p className="text-muted-foreground">
          Connect your exchange accounts to enable trading and portfolio monitoring.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="connections">My Connections</TabsTrigger>
          <TabsTrigger value="add">Add Connection</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connections" className="space-y-6">
          {isLoading ? (
            <Card>
              <CardContent className="flex items-center justify-center py-10">
                <p className="text-center text-muted-foreground">Loading connections...</p>
              </CardContent>
            </Card>
          ) : connections.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-center text-muted-foreground">
                  You don't have any exchange connections yet. Add one to get started.
                </p>
                <button
                  className="mt-4 text-primary hover:underline"
                  onClick={() => setActiveTab("add")}
                >
                  Connect an Exchange
                </button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {connections.map((connection) => (
                <ExchangeConnectionCard 
                  key={connection.id} 
                  connection={connection} 
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="add">
          <ApiKeyForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
