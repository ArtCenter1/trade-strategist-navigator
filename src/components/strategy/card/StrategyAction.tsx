
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type StrategyActionProps = {
  onSelect: () => void;
  isPremium: boolean;
};

export function StrategyAction({ onSelect, isPremium }: StrategyActionProps) {
  return (
    <Button 
      onClick={onSelect} 
      className="w-full"
      variant={isPremium ? "outline" : "default"}
    >
      <span>View Details</span>
      <ChevronRight className="h-4 w-4 ml-1" />
    </Button>
  );
}
