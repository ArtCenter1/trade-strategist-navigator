
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart2, 
  Settings, 
  Info
} from "lucide-react";
import { StrategyHeader } from "./strategy/StrategyHeader";
import { StrategyInfoCard } from "./strategy/StrategyInfoCard";
import { StrategyOverviewTab } from "./strategy/tabs/StrategyOverviewTab";
import { StrategyPerformanceTab } from "./strategy/tabs/StrategyPerformanceTab";
import { StrategyConfigurationTab } from "./strategy/tabs/StrategyConfigurationTab";
import { getStrategyDetails } from "./strategy/StrategyDetailData";
import type { StrategyDetails } from "./strategy/types";

export function StrategyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const strategy = id ? getStrategyDetails(id) : null;

  if (!strategy) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold mb-4">Strategy not found</h1>
        <Button onClick={() => navigate('/strategies')}>
          Back to Strategies
        </Button>
      </div>
    );
  }

  const handleDeployStrategy = () => {
    // Here you would typically integrate with your backend
    // to deploy the strategy with the configured parameters
    console.log("Deploying strategy:", strategy.id);
    
    // Navigate back to dashboard or to a confirmation page
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StrategyHeader strategy={strategy} />

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <StrategyInfoCard strategy={strategy} />

          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-6"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center">
                <BarChart2 className="h-4 w-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="configuration" className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Configuration
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4">
              <StrategyOverviewTab strategy={strategy as StrategyDetails} />
            </TabsContent>
            
            <TabsContent value="performance" className="mt-4">
              <StrategyPerformanceTab strategy={strategy as StrategyDetails} />
            </TabsContent>
            
            <TabsContent value="configuration" className="mt-4">
              <StrategyConfigurationTab 
                strategy={strategy as StrategyDetails} 
                onSaveConfiguration={() => setActiveTab("overview")}
              />
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end">
            <Button 
              size="lg" 
              onClick={handleDeployStrategy}
              disabled={strategy.isPremium}
            >
              {strategy.isPremium ? 'Upgrade to Deploy' : 'Deploy Strategy'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
