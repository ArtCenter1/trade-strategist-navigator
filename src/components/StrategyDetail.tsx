
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { StrategyHeader } from "@/components/strategy/StrategyHeader";
import { StrategyInfoCard } from "@/components/strategy/StrategyInfoCard";
import { StrategyOverviewTab } from "@/components/strategy/tabs/StrategyOverviewTab";
import { StrategyPerformanceTab } from "@/components/strategy/tabs/StrategyPerformanceTab";
import { StrategyConfigurationTab } from "@/components/strategy/tabs/StrategyConfigurationTab";
import { getStrategyById } from "@/components/strategy/StrategyDetailData";
import { useToast } from "@/hooks/use-toast";

export function StrategyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Fetch strategy data
  const strategy = id ? getStrategyById(id) : null;
  
  // Authentication check
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);
  
  // Non-existent strategy check
  useEffect(() => {
    if (!loading && !strategy) {
      navigate("/strategies");
      toast({
        title: "Strategy not found",
        description: "The requested strategy does not exist.",
        variant: "destructive"
      });
    }
  }, [strategy, loading, navigate, toast]);
  
  if (loading || !strategy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-trading-navy border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div>
      <StrategyHeader strategy={strategy} />
      <StrategyInfoCard strategy={strategy} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <StrategyOverviewTab strategy={strategy} />
        </TabsContent>
        
        <TabsContent value="performance">
          <StrategyPerformanceTab strategy={strategy} />
        </TabsContent>
        
        <TabsContent value="configuration">
          <StrategyConfigurationTab 
            strategy={strategy} 
            onSaveConfiguration={handleSaveConfiguration} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
