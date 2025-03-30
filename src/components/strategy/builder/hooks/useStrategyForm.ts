
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { strategyFormSchema, StrategyFormValues } from "../form/BasicSettingsTab";

export function useStrategyForm() {
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
  
  return {
    form,
    activeTab,
    setActiveTab,
    selectedIndicators,
    setSelectedIndicators,
    rules,
    setRules,
    onSubmit,
    enableStopLoss,
    enableTakeProfit
  };
}
