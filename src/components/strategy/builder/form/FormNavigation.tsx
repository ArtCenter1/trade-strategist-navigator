
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
  return (
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
  );
}
