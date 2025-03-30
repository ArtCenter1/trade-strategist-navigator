
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StrategyComparisonTool } from "@/components/strategy/comparison/StrategyComparisonTool";
import { useState } from "react";

export default function StrategyComparison() {
  const [activeTab, setActiveTab] = useState("visual");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Strategy Comparison</h2>
      </div>
      
      <p className="text-muted-foreground">
        Compare different trading strategies to find the one that best fits your investment goals and risk tolerance.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="visual">Visual Comparison</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visual">
          <StrategyComparisonTool />
        </TabsContent>
        
        <TabsContent value="detailed">
          <div className="bg-muted rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Advanced Analysis Coming Soon</h3>
            <p className="text-muted-foreground">
              Our advanced statistical analysis tools for deeper strategy comparison will be available soon.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
