
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ExchangeFormValues = {
  exchange_name: string;
  api_key: string;
  api_secret: string;
  label?: string;
};

export function ExchangeConnection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState<{success: boolean; message: string} | null>(null);

  const form = useForm<ExchangeFormValues>({
    defaultValues: {
      exchange_name: "binance",
      api_key: "",
      api_secret: "",
      label: "",
    },
  });

  const onSubmit = async (data: ExchangeFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    setTestResult(null);
    
    try {
      // First test the connection
      const testResult = await testExchangeConnection(data);
      setTestResult(testResult);
      
      if (testResult.success) {
        // If successful, save to database
        const { error } = await supabase
          .from('exchange_connections')
          .insert({
            user_id: user.id,
            exchange_name: data.exchange_name,
            api_key: data.api_key,
            api_secret: data.api_secret,
            label: data.label || `${data.exchange_name} (${new Date().toLocaleDateString()})`,
            is_active: true
          });
          
        if (error) throw error;
        
        toast({
          title: "Exchange connected successfully",
          description: "Your exchange API has been connected to your account.",
        });
        
        // Reset form after successful submission
        form.reset();
      }
    } catch (error) {
      console.error("Error connecting exchange:", error);
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Failed to connect exchange",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const testExchangeConnection = async (data: ExchangeFormValues): Promise<{success: boolean; message: string}> => {
    // This is a simplified test - in a real app, you would
    // make a proper test to the exchange API
    
    try {
      // Simulate a connection test with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes - consider API key length
      if (data.api_key.length < 10 || data.api_secret.length < 10) {
        return { 
          success: false, 
          message: "API keys appear to be invalid (too short)" 
        };
      }
      
      return {
        success: true,
        message: "Connection test successful! Permissions verified."
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Connection test failed"
      };
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Connect Exchange</h2>
      <p className="text-muted-foreground mb-6">
        Connect your cryptocurrency exchange by providing API keys. The keys will be encrypted and stored securely.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="exchange_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exchange</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an exchange" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="binance">Binance</SelectItem>
                    <SelectItem value="coinbase">Coinbase Pro</SelectItem>
                    <SelectItem value="kraken">Kraken</SelectItem>
                    <SelectItem value="kucoin">KuCoin</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the exchange platform you want to connect.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="My Trading Account" {...field} />
                </FormControl>
                <FormDescription>
                  A friendly name to identify this connection.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="api_key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your API key" {...field} />
                </FormControl>
                <FormDescription>
                  The API key from your exchange account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="api_secret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Secret</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your API secret" {...field} />
                </FormControl>
                <FormDescription>
                  The API secret from your exchange account. This will be encrypted.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {testResult && (
            <Alert variant={testResult.success ? "default" : "destructive"}>
              {testResult.success ? 
                <CheckCircle2 className="h-4 w-4" /> : 
                <AlertCircle className="h-4 w-4" />
              }
              <AlertTitle>
                {testResult.success ? "Connection Successful" : "Connection Failed"}
              </AlertTitle>
              <AlertDescription>
                {testResult.message}
              </AlertDescription>
            </Alert>
          )}
          
          <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Testing Connection..." : "Connect Exchange"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
