
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StrategyBuilder as StrategyBuilderTool } from "@/components/strategy/builder/StrategyBuilder";
import { PineScriptEditor } from "@/components/strategy/pine/PineScriptEditor";

export default function StrategyBuilder() {
  const [activeTab, setActiveTab] = useState("visual");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Strategy Builder</h2>
      </div>
      
      <p className="text-muted-foreground">
        Create a custom trading strategy with your own rules and parameters. Define entry and exit conditions based on technical indicators.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="visual">Visual Builder</TabsTrigger>
          <TabsTrigger value="pine">Pine Script</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visual">
          <StrategyBuilderTool />
        </TabsContent>
        
        <TabsContent value="pine">
          <PineScriptEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
