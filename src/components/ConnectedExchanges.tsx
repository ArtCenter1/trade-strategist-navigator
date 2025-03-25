
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Exchange = {
  id: string;
  exchange_name: string;
  label: string | null;
  is_active: boolean;
  created_at: string;
};

export function ConnectedExchanges() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exchangeToDelete, setExchangeToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    
    const fetchExchanges = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('exchange_connections')
          .select('id, exchange_name, label, is_active, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setExchanges(data || []);
      } catch (error) {
        console.error('Error fetching exchanges:', error);
        toast({
          variant: "destructive",
          title: "Failed to load exchanges",
          description: "Please try refreshing the page.",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchExchanges();
  }, [user, toast]);
  
  const handleDelete = async () => {
    if (!exchangeToDelete) return;
    
    try {
      const { error } = await supabase
        .from('exchange_connections')
        .delete()
        .eq('id', exchangeToDelete);
        
      if (error) throw error;
      
      setExchanges(prev => prev.filter(exchange => exchange.id !== exchangeToDelete));
      
      toast({
        title: "Exchange removed",
        description: "Your exchange connection has been removed successfully.",
      });
    } catch (error) {
      console.error('Error deleting exchange:', error);
      toast({
        variant: "destructive",
        title: "Failed to remove exchange",
        description: "Please try again.",
      });
    } finally {
      setExchangeToDelete(null);
      setDeleteDialogOpen(false);
    }
  };
  
  const confirmDelete = (id: string) => {
    setExchangeToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  if (loading) {
    return (
      <div className="bg-card p-6 rounded-lg border flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (exchanges.length === 0) {
    return (
      <div className="bg-card p-6 rounded-lg border">
        <div className="text-center py-6">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Exchanges Connected</h3>
          <p className="text-muted-foreground mb-4">
            You haven't connected any exchanges yet. Connect your first exchange to start trading.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Connected Exchanges</h2>
      <div className="space-y-4">
        {exchanges.map((exchange) => (
          <div 
            key={exchange.id} 
            className="flex items-center justify-between p-4 bg-background rounded-md border"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {exchange.label || capitalizeFirstLetter(exchange.exchange_name)}
                </span>
                <Badge variant={exchange.is_active ? "default" : "outline"}>
                  {exchange.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">
                Connected on {new Date(exchange.created_at).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => confirmDelete(exchange.id)}
              >
                <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the exchange connection and stop any active trading strategies on this exchange.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
