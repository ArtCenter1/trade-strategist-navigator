
import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  canSubmit: boolean;
  selectedIndicators: string[];
  rules: any[];
}

export function FormNavigation({ 
  activeTab, 
  setActiveTab, 
  canSubmit, 
  selectedIndicators, 
  rules 
}: FormNavigationProps) {
  const navigateBack = () => {
    if (activeTab === "indicators") {
      setActiveTab("basic");
    } else if (activeTab === "rules") {
      setActiveTab("indicators");
    } else if (activeTab === "backtest") {
      setActiveTab("rules");
    }
  };

  const navigateForward = () => {
    if (activeTab === "basic") {
      setActiveTab("indicators");
    } else if (activeTab === "indicators") {
      setActiveTab("rules");
    } else if (activeTab === "rules") {
      setActiveTab("backtest");
    }
  };

  const getButtonText = () => {
    if (activeTab === "backtest") {
      return "Create Strategy";
    }
    return "Next";
  };

  return (
    <div className="flex justify-between mt-8">
      <Button
        type="button"
        variant="outline"
        onClick={navigateBack}
        disabled={activeTab === "basic"}
      >
        Back
      </Button>
      
      <div className="flex gap-2">
        {activeTab !== "backtest" ? (
          <Button
            type="button"
            onClick={navigateForward}
            disabled={
              (activeTab === "indicators" && selectedIndicators.length === 0) ||
              (activeTab === "rules" && rules.length === 0)
            }
          >
            {getButtonText()}
          </Button>
        ) : (
          <Button 
            type="submit"
            disabled={!canSubmit || selectedIndicators.length === 0 || rules.length === 0}
          >
            Create Strategy
          </Button>
        )}
      </div>
    </div>
  );
}
