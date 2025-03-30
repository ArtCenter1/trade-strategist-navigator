
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Strategy } from "@/components/Strategy";
import { StrategyFormValues } from "@/components/strategy/builder/form/BasicSettingsTab";
import { PineScriptStrategy } from "@/components/strategy/pine/PineScriptTypes";

// Validation schema for backtest configuration
const backtestConfigSchema = z.object({
  symbol: z.string().min(1, "Symbol is required"),
  timeframe: z.enum(["1m", "5m", "15m", "30m", "1h", "4h", "1d"]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  initialCapital: z.coerce.number().min(100, "Initial capital must be at least 100"),
  days: z.coerce.number().min(1, "Backtest period must be at least 1 day").max(3650, "Backtest period cannot exceed 10 years")
});

type BacktestConfigValues = z.infer<typeof backtestConfigSchema>;

interface BacktestConfigProps {
  strategy: Strategy | StrategyFormValues | PineScriptStrategy;
  onRunBacktest: (config: BacktestConfigValues) => void;
  isLoading: boolean;
}

export function BacktestConfig({ strategy, onRunBacktest, isLoading }: BacktestConfigProps) {
  // Default values for the form
  const defaultValues: Partial<BacktestConfigValues> = {
    symbol: "BTC/USD",
    timeframe: "1h",
    initialCapital: 10000,
    days: 365
  };

  // Initialize form
  const form = useForm<BacktestConfigValues>({
    resolver: zodResolver(backtestConfigSchema),
    defaultValues,
  });

  const handleSubmit = (data: BacktestConfigValues) => {
    onRunBacktest(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backtest Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symbol</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      The trading pair to backtest (e.g., BTC/USD)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeframe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeframe</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a timeframe" />
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
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The chart timeframe to use for backtesting
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="initialCapital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Capital</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Starting capital for the backtest
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Test Period (days)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Number of days to backtest
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Running..." : "Run Backtest"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
