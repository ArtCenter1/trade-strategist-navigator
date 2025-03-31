
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface TradingFormProps {
  tradingPair: string;
}

export function TradingForm({ tradingPair }: TradingFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [price, setPrice] = useState<string>("83855.34");
  const [total, setTotal] = useState<string>("");
  const [sliderValue, setSliderValue] = useState<number[]>([0]);
  
  // Parse the trading pair to get the base and quote currency
  const [baseCurrency, quoteCurrency] = tradingPair.split('/');
  
  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    
    if (price && !isNaN(parseFloat(price)) && !isNaN(parseFloat(value))) {
      const calculatedTotal = (parseFloat(value) * parseFloat(price)).toFixed(2);
      setTotal(calculatedTotal);
    }
  };
  
  // Handle price change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value);
    
    if (amount && !isNaN(parseFloat(amount)) && !isNaN(parseFloat(value))) {
      const calculatedTotal = (parseFloat(amount) * parseFloat(value)).toFixed(2);
      setTotal(calculatedTotal);
    }
  };
  
  // Handle total change
  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTotal(value);
    
    if (price && !isNaN(parseFloat(price)) && !isNaN(parseFloat(value))) {
      const calculatedAmount = (parseFloat(value) / parseFloat(price)).toFixed(8);
      setAmount(calculatedAmount);
    }
  };
  
  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    
    // Calculate amount based on slider percentage (assuming available balance)
    const availableBalance = 0.01797199; // Mock BTC balance
    const calculatedAmount = (availableBalance * (value[0] / 100)).toFixed(8);
    setAmount(calculatedAmount);
    
    if (price && !isNaN(parseFloat(price))) {
      const calculatedTotal = (parseFloat(calculatedAmount) * parseFloat(price)).toFixed(2);
      setTotal(calculatedTotal);
    }
  };
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="limit" className="w-full">
        <TabsList className="bg-[#222222] text-white w-full mb-4">
          <TabsTrigger 
            value="market"
            className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
          >
            Market
          </TabsTrigger>
          <TabsTrigger 
            value="limit"
            className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
          >
            Limit
          </TabsTrigger>
          <TabsTrigger 
            value="stop"
            className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
          >
            Stop
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="market" className="space-y-4">
          {/* Market order form */}
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-xs text-[#999999]">Amount ({baseCurrency})</label>
              <Input 
                type="number" 
                value={amount}
                onChange={handleAmountChange}
                className="bg-[#222222] border-[#444444] text-white"
                placeholder="0.00000000"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs text-[#999999]">Percentage</label>
                <span className="text-xs text-[#999999]">{sliderValue[0]}%</span>
              </div>
              <Slider
                defaultValue={[0]}
                max={100}
                step={1}
                value={sliderValue}
                onValueChange={handleSliderChange}
                className="my-4"
              />
              <div className="flex justify-between">
                <span className="text-xs text-[#999999]">0%</span>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" className="h-6 px-2 bg-[#222222] border-[#444444] text-white hover:bg-[#333333]" onClick={() => handleSliderChange([25])}>25%</Button>
                  <Button variant="outline" size="sm" className="h-6 px-2 bg-[#222222] border-[#444444] text-white hover:bg-[#333333]" onClick={() => handleSliderChange([50])}>50%</Button>
                  <Button variant="outline" size="sm" className="h-6 px-2 bg-[#222222] border-[#444444] text-white hover:bg-[#333333]" onClick={() => handleSliderChange([75])}>75%</Button>
                  <Button variant="outline" size="sm" className="h-6 px-2 bg-[#222222] border-[#444444] text-white hover:bg-[#333333]" onClick={() => handleSliderChange([100])}>100%</Button>
                </div>
                <span className="text-xs text-[#999999]">100%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-[#999999]">Total ({quoteCurrency})</label>
              <Input 
                type="number" 
                value={total}
                onChange={handleTotalChange}
                className="bg-[#222222] border-[#444444] text-white"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button className="w-full bg-[#34C759] hover:bg-[#2A9D8F] text-white">
              Buy {baseCurrency}
            </Button>
            <Button className="w-full bg-[#FF3B30] hover:bg-[#E63946] text-white">
              Sell {baseCurrency}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="limit" className="space-y-4">
          {/* Limit order form */}
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-xs text-[#999999]">Price ({quoteCurrency})</label>
              <Input 
                type="number" 
                value={price}
                onChange={handlePriceChange}
                className="bg-[#222222] border-[#444444] text-white"
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-[#999999]">Amount ({baseCurrency})</label>
              <Input 
                type="number" 
                value={amount}
                onChange={handleAmountChange}
                className="bg-[#222222] border-[#444444] text-white"
                placeholder="0.00000000"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs text-[#999999]">Percentage</label>
                <span className="text-xs text-[#999999]">{sliderValue[0]}%</span>
              </div>
              <Slider
                defaultValue={[0]}
                max={100}
                step={1}
                value={sliderValue}
                onValueChange={handleSliderChange}
                className="my-4"
              />
              <div className="flex justify-between">
                <span className="text-xs text-[#999999]">0%</span>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" className="h-6 px-2 bg-[#222222] border-[#444444] text-white hover:bg-[#333333]" onClick={() => handleSliderChange([25])}>25%</Button>
                  <Button variant="outline" size="sm" className="h-6 px-2 bg-[#222222] border-[#444444] text-white hover:bg-[#333333]" onClick={() => handleSliderChange([50])}>50%</Button>
                  <Button variant="outline" size="sm" className="h-6 px-2 bg-[#222222] border-[#444444] text-white hover:bg-[#333333]" onClick={() => handleSliderChange([75])}>75%</Button>
                  <Button variant="outline" size="sm" className="h-6 px-2 bg-[#222222] border-[#444444] text-white hover:bg-[#333333]" onClick={() => handleSliderChange([100])}>100%</Button>
                </div>
                <span className="text-xs text-[#999999]">100%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-[#999999]">Total ({quoteCurrency})</label>
              <Input 
                type="number" 
                value={total}
                onChange={handleTotalChange}
                className="bg-[#222222] border-[#444444] text-white"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button className="w-full bg-[#34C759] hover:bg-[#2A9D8F] text-white">
              Buy {baseCurrency}
            </Button>
            <Button className="w-full bg-[#FF3B30] hover:bg-[#E63946] text-white">
              Sell {baseCurrency}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="stop" className="space-y-4">
          {/* Stop order form - simplified version */}
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-xs text-[#999999]">Stop Price ({quoteCurrency})</label>
              <Input 
                type="number"
                className="bg-[#222222] border-[#444444] text-white"
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-[#999999]">Limit Price ({quoteCurrency})</label>
              <Input 
                type="number"
                className="bg-[#222222] border-[#444444] text-white"
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-[#999999]">Amount ({baseCurrency})</label>
              <Input 
                type="number"
                className="bg-[#222222] border-[#444444] text-white"
                placeholder="0.00000000"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-[#999999]">Total ({quoteCurrency})</label>
              <Input 
                type="number"
                className="bg-[#222222] border-[#444444] text-white"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button className="w-full bg-[#34C759] hover:bg-[#2A9D8F] text-white">
              Buy {baseCurrency}
            </Button>
            <Button className="w-full bg-[#FF3B30] hover:bg-[#E63946] text-white">
              Sell {baseCurrency}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="pt-2 border-t border-[#333333]">
        <div className="flex justify-between text-xs text-[#999999]">
          <span>Available Balance:</span>
          <div className="text-right">
            <div>0.01797199 BTC</div>
            <div>8.00 USDT</div>
          </div>
        </div>
      </div>
    </div>
  );
}
