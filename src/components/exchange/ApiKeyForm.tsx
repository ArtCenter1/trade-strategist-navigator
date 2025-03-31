
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Info, Shield } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Validation schema for API key form
const apiKeyFormSchema = z.object({
  exchange: z.string({
    required_error: "Please select an exchange",
  }),
  apiKey: z.string().min(1, "API key is required"),
  apiSecret: z.string().min(1, "API secret is required"),
  passphrase: z.string().optional(),
  label: z.string().min(1, "A label is required to identify this connection"),
  readOnly: z.boolean().default(true),
});

type ApiKeyFormValues = z.infer<typeof apiKeyFormSchema>;

export function ApiKeyForm() {
  const { toast } = useToast();
  const [showSecret, setShowSecret] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default form values
  const defaultValues: Partial<ApiKeyFormValues> = {
    exchange: "",
    apiKey: "",
    apiSecret: "",
    passphrase: "",
    label: "",
    readOnly: true,
  };

  // Initialize form
  const form = useForm<ApiKeyFormValues>({
    resolver: zodResolver(apiKeyFormSchema),
    defaultValues,
  });

  // Available exchanges
  const exchanges = [
    { id: "binance", name: "Binance" },
    { id: "coinbase", name: "Coinbase Pro" },
    { id: "kraken", name: "Kraken" },
    { id: "kucoin", name: "KuCoin" },
    { id: "ftx", name: "FTX" },
    { id: "bitfinex", name: "Bitfinex" },
  ];

  const onSubmit = async (data: ApiKeyFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would securely send the API credentials to a backend
      console.log("Submitting API key data:", {
        ...data,
        apiSecret: "******" // Mask sensitive data in logs
      });
      
      // Simulate API connection test
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast({
        title: "Exchange connected",
        description: `${data.label} has been successfully connected.`,
      });
      
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error connecting exchange:", error);
      
      toast({
        title: "Connection failed",
        description: "Failed to connect to the exchange. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Connect Exchange</CardTitle>
        <CardDescription>
          Connect your exchange account by providing API credentials. Your keys are encrypted and stored securely.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="exchange"
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
                        {exchanges.map(exchange => (
                          <SelectItem key={exchange.id} value={exchange.id}>
                            {exchange.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the exchange you want to connect.
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
                    <FormLabel>Connection Label</FormLabel>
                    <FormControl>
                      <Input placeholder="Main Trading Account" {...field} />
                    </FormControl>
                    <FormDescription>
                      A friendly name to identify this connection.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your API key" {...field} />
                  </FormControl>
                  <FormDescription>
                    The public API key provided by your exchange.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="apiSecret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Secret</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showSecret ? "text" : "password"} 
                        placeholder="Enter your API secret" 
                        {...field} 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowSecret(!showSecret)}
                      >
                        {showSecret ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showSecret ? "Hide" : "Show"} API secret
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    The private API secret provided by your exchange. This will be encrypted.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="passphrase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passphrase (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter your API passphrase if required" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Some exchanges like KuCoin or Coinbase Pro require a passphrase.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="readOnly"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Read-only access</FormLabel>
                    <FormDescription>
                      Restrict this connection to read-only operations (recommended). Uncheck only if you want to enable trading.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          
            <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">API Key Security</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      For maximum security, create API keys with the minimum required permissions and enable IP restrictions when possible.
                      Never share your API secret with anyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Connecting..." : "Connect Exchange"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
          Your API keys are encrypted and stored securely
        </div>
      </CardFooter>
    </Card>
  );
}
