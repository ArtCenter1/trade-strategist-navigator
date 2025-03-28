
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getStrategyById } from "@/components/strategy/StrategyDetailData";
import { useToast } from "@/hooks/use-toast";

// Get only the basic strategy info for the list
const strategies = [
  { id: 'rsi', name: 'RSI Strategy' },
  { id: 'bollinger', name: 'Bollinger Bands' },
  { id: 'macd', name: 'MACD Strategy' },
];

// Mock data for exchanges
const exchanges = [
  { id: '1', name: 'Binance' },
  { id: '2', name: 'Coinbase' },
];

// Mock data for trading pairs
const tradingPairs = [
  { id: 'btc-usdt', name: 'BTC/USDT' },
  { id: 'eth-usdt', name: 'ETH/USDT' },
  { id: 'xrp-usdt', name: 'XRP/USDT' },
  { id: 'ada-usdt', name: 'ADA/USDT' },
];

export function DeployStrategy() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [selectedExchange, setSelectedExchange] = useState<string>("");
  const [selectedPair, setSelectedPair] = useState<string>("");
  const [allocationPercent, setAllocationPercent] = useState<number[]>([10]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const viewAllStrategies = () => {
    navigate('/strategies');
  };
  
  const handleDeploy = () => {
    // In a real app, this would call an API to deploy the strategy
    toast({
      title: "Strategy Deployed",
      description: `Successfully deployed ${strategies.find(s => s.id === selectedStrategy)?.name} on ${exchanges.find(e => e.id === selectedExchange)?.name} for ${tradingPairs.find(p => p.id === selectedPair)?.name} with ${allocationPercent[0]}% allocation.`,
    });
    setIsDialogOpen(false);
  };
  
  const strategyDetails = selectedStrategy ? getStrategyById(selectedStrategy) : null;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Deploy Strategy</h2>
        <Button variant="outline" size="sm" onClick={viewAllStrategies}>
          View All Strategies
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Deploy</CardTitle>
          <CardDescription>
            Select a strategy to deploy to your connected exchange
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {strategies.map((strategy) => {
              const details = getStrategyById(strategy.id);
              return (
                <Card key={strategy.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="px-6 py-4">
                      <h3 className="font-semibold">{strategy.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {details?.description || "A trading strategy"}
                      </p>
                    </div>
                    <div className="px-6 py-4 bg-muted/50 flex justify-end">
                      <Dialog open={isDialogOpen && selectedStrategy === strategy.id} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (open) setSelectedStrategy(strategy.id);
                      }}>
                        <DialogTrigger asChild>
                          <Button size="sm">Deploy</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Deploy {strategy.name}</DialogTitle>
                            <DialogDescription>
                              Configure deployment settings for this strategy
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="exchange">Exchange</Label>
                              <Select value={selectedExchange} onValueChange={setSelectedExchange}>
                                <SelectTrigger id="exchange">
                                  <SelectValue placeholder="Select exchange" />
                                </SelectTrigger>
                                <SelectContent>
                                  {exchanges.map((exchange) => (
                                    <SelectItem key={exchange.id} value={exchange.id}>{exchange.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pair">Trading Pair</Label>
                              <Select value={selectedPair} onValueChange={setSelectedPair}>
                                <SelectTrigger id="pair">
                                  <SelectValue placeholder="Select trading pair" />
                                </SelectTrigger>
                                <SelectContent>
                                  {tradingPairs.map((pair) => (
                                    <SelectItem key={pair.id} value={pair.id}>{pair.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Capital Allocation ({allocationPercent[0]}%)</Label>
                              <Slider
                                value={allocationPercent}
                                min={1}
                                max={100}
                                step={1}
                                onValueChange={setAllocationPercent}
                              />
                              <p className="text-xs text-muted-foreground">
                                Percentage of your available balance to allocate to this strategy
                              </p>
                            </div>
                            {strategyDetails && (
                              <div className="bg-muted p-3 rounded-md">
                                <h4 className="text-sm font-medium mb-1">Strategy Parameters</h4>
                                <div className="space-y-1">
                                  {Object.entries(strategyDetails.parameters).map(([key, value]) => (
                                    <p key={key} className="text-xs flex justify-between">
                                      <span className="text-muted-foreground">{key}:</span>
                                      <span className="font-medium">{value}</span>
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button 
                              onClick={handleDeploy}
                              disabled={!selectedExchange || !selectedPair}
                            >
                              Deploy Strategy
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t px-6 py-4">
          <Button variant="outline" onClick={viewAllStrategies}>
            Browse All Available Strategies
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
