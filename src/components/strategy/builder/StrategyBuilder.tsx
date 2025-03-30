
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { IndicatorSelector } from "./IndicatorSelector";
import { RuleBuilder } from "./RuleBuilder";

// Form schema
const strategyFormSchema = z.object({
  name: z.string().min(3, { message: "Strategy name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Please provide a description of at least 10 characters" }),
  type: z.enum(["trend", "momentum", "reversal", "volatility", "custom"]),
  riskLevel: z.enum(["low", "medium", "high"]),
  timeframe: z.enum(["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"]),
  allocatePercentage: z.number().min(1).max(100),
  enableStopLoss: z.boolean(),
  stopLossPercentage: z.number().min(0.1).max(20).optional(),
  enableTakeProfit: z.boolean(),
  takeProfitPercentage: z.number().min(0.1).max(100).optional(),
});

type StrategyFormValues = z.infer<typeof strategyFormSchema>;

export function StrategyBuilder() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);
  const [rules, setRules] = useState<any[]>([]);
  
  // Default form values
  const defaultValues: Partial<StrategyFormValues> = {
    name: "",
    description: "",
    type: "trend",
    riskLevel: "medium",
    timeframe: "1h",
    allocatePercentage: 10,
    enableStopLoss: true,
    stopLossPercentage: 5,
    enableTakeProfit: true,
    takeProfitPercentage: 10,
  };
  
  const form = useForm<StrategyFormValues>({
    resolver: zodResolver(strategyFormSchema),
    defaultValues,
  });
  
  const onSubmit = (data: StrategyFormValues) => {
    // In a real app, you would save the strategy to the database
    console.log("Strategy data:", data);
    console.log("Selected indicators:", selectedIndicators);
    console.log("Trading rules:", rules);
    
    toast({
      title: "Strategy Created",
      description: `Your '${data.name}' strategy has been created successfully.`,
    });
  };
  
  // Watch for stop loss and take profit toggle changes
  const enableStopLoss = form.watch("enableStopLoss");
  const enableTakeProfit = form.watch("enableTakeProfit");
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Strategy Builder</CardTitle>
        <CardDescription>
          Create a custom trading strategy with your own rules and parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="basic">Basic Settings</TabsTrigger>
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
            <TabsTrigger value="rules">Trading Rules</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <TabsContent value="basic" className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Strategy Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Custom Strategy" {...field} />
                      </FormControl>
                      <FormDescription>
                        Choose a descriptive name for your strategy
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe how your strategy works" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Strategy Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select strategy type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="trend">Trend Following</SelectItem>
                            <SelectItem value="momentum">Momentum</SelectItem>
                            <SelectItem value="reversal">Reversal</SelectItem>
                            <SelectItem value="volatility">Volatility</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="riskLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Risk Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select risk level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeframe</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1m">1 Minute</SelectItem>
                          <SelectItem value="5m">5 Minutes</SelectItem>
                          <SelectItem value="15m">15 Minutes</SelectItem>
                          <SelectItem value="30m">30 Minutes</SelectItem>
                          <SelectItem value="1h">1 Hour</SelectItem>
                          <SelectItem value="4h">4 Hours</SelectItem>
                          <SelectItem value="1d">1 Day</SelectItem>
                          <SelectItem value="1w">1 Week</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="allocatePercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capital Allocation ({field.value}%)</FormLabel>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          min={1}
                          max={100}
                          step={1}
                          onValueChange={(values) => field.onChange(values[0])}
                        />
                      </FormControl>
                      <FormDescription>
                        Percentage of your available balance to allocate to this strategy
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="enableStopLoss"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable Stop Loss</FormLabel>
                          <FormDescription>
                            Automatically sell if price drops below threshold
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {enableStopLoss && (
                    <FormField
                      control={form.control}
                      name="stopLossPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stop Loss Percentage ({field.value}%)</FormLabel>
                          <FormControl>
                            <Slider
                              value={[field.value || 5]}
                              min={0.1}
                              max={20}
                              step={0.1}
                              onValueChange={(values) => field.onChange(values[0])}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <FormField
                    control={form.control}
                    name="enableTakeProfit"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable Take Profit</FormLabel>
                          <FormDescription>
                            Automatically sell if price rises above threshold
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {enableTakeProfit && (
                    <FormField
                      control={form.control}
                      name="takeProfitPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Take Profit Percentage ({field.value}%)</FormLabel>
                          <FormControl>
                            <Slider
                              value={[field.value || 10]}
                              min={0.1}
                              max={100}
                              step={0.1}
                              onValueChange={(values) => field.onChange(values[0])}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="indicators">
                <IndicatorSelector 
                  selectedIndicators={selectedIndicators}
                  setSelectedIndicators={setSelectedIndicators}
                />
              </TabsContent>
              
              <TabsContent value="rules">
                <RuleBuilder
                  rules={rules}
                  setRules={setRules}
                  selectedIndicators={selectedIndicators}
                />
              </TabsContent>
              
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (activeTab === "basic") {
                      setActiveTab("indicators");
                    } else if (activeTab === "indicators") {
                      setActiveTab("rules");
                    }
                  }}
                  disabled={activeTab === "rules"}
                >
                  Next
                </Button>
                
                <Button 
                  type="submit"
                  disabled={activeTab !== "rules" || selectedIndicators.length === 0 || rules.length === 0}
                >
                  Create Strategy
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
