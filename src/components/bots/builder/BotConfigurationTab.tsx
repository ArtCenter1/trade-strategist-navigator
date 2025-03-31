
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Info, Code, Bot } from 'lucide-react';

export const BotConfigurationTab: React.FC = () => {
  const [strategyText, setStrategyText] = useState("");
  
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">How does the Cody AI bot work?</h3>
          <p className="text-sm text-muted-foreground">
            Transform your trading ideas into actionable strategies with Cody, the AI Strategy Assistant. Describe your strategy in any language, and Cody will convert it into code ready for back-testing and live execution, streamlining your path to trading innovation.
          </p>
          <Button variant="outline" className="gap-2 text-primary">
            <Info className="h-4 w-4" />
            Learn More
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">My Bots</h3>
          <div className="space-y-2">
            <div className="flex items-center p-2 rounded-md bg-primary/5 border">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 text-white text-xs mr-2">
                C
              </div>
              <span className="text-sm font-medium">Cody AI</span>
            </div>
            <div className="flex items-center p-2 rounded-md hover:bg-muted/10">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-orange-500 text-white text-xs mr-2">
                G
              </div>
              <span className="text-sm font-medium">Grid Trader</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>General Settings</Label>
            <div className="space-y-4">
              <div>
                <Label htmlFor="botName" className="text-xs text-muted-foreground">Bot Name</Label>
                <Input id="botName" value="unruffled_brattain" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="frequency" className="text-xs text-muted-foreground">Execution Frequency <Info className="h-3 w-3 inline" /></Label>
                <Select defaultValue="5">
                  <SelectTrigger id="frequency" className="mt-1">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Minute</SelectItem>
                    <SelectItem value="5">5 Minutes</SelectItem>
                    <SelectItem value="15">15 Minutes</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Exchange Settings</Label>
            <div className="space-y-4">
              <div>
                <Label htmlFor="exchange" className="text-xs text-muted-foreground">Exchange Platform <Info className="h-3 w-3 inline" /></Label>
                <Select defaultValue="binance">
                  <SelectTrigger id="exchange" className="mt-1">
                    <SelectValue placeholder="Select exchange" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="binance">Binance</SelectItem>
                    <SelectItem value="coinbase">Coinbase</SelectItem>
                    <SelectItem value="kraken">Kraken</SelectItem>
                    <SelectItem value="kucoin">KuCoin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="symbol" className="text-xs text-muted-foreground">Symbol <Info className="h-3 w-3 inline" /></Label>
                <Select defaultValue="btcusdt">
                  <SelectTrigger id="symbol" className="mt-1">
                    <SelectValue placeholder="Select symbol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btcusdt">BTC/USDT</SelectItem>
                    <SelectItem value="ethusdt">ETH/USDT</SelectItem>
                    <SelectItem value="dogeusdt">DOGE/USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="tradingAccount" className="text-xs text-muted-foreground">Trading Account <Info className="h-3 w-3 inline" /></Label>
          <Select defaultValue="binance1">
            <SelectTrigger id="tradingAccount" className="mt-1">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="binance1">Binance Artcenter1</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="startingCapital" className="text-xs text-muted-foreground">Starting Capital <Info className="h-3 w-3 inline" /></Label>
          <div className="flex items-center mt-1">
            <Input id="startingCapital" value="100" className="rounded-r-none" />
            <div className="bg-muted px-3 py-2 border border-l-0 rounded-r-md text-muted-foreground">
              USDT
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 mb-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">25%</span>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">50%</span>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: '50%' }}></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">75%</span>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">100% Available</span>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="text-sm mb-4">1) Describe your strategy. 2) Generate Code. 3) Run backtest 4) Run live bot.</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium">Type in your strategy and hit "Generate Code"</div>
              <Textarea 
                value={strategyText}
                onChange={(e) => setStrategyText(e.target.value)}
                placeholder="Describe your strategy in plain language"
                className="h-32 resize-none"
              />
              <Button className="gap-2 w-full">
                <Code className="h-4 w-4" />
                GENERATE CODE
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="text-sm font-medium">Or try one of the examples below:</div>
              <div className="space-y-3">
                <Card className="bg-muted/30">
                  <CardContent className="p-3 text-xs">
                    "Buy $50 of BTC every Monday until $1000 have been spent. Sell all if total profit is more than 20%."
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/30">
                  <CardContent className="p-3 text-xs">
                    "Trade 100 DOGE/USDT using a scalping strategy on the 5 minute timeframe with 1% profit target and 2% stop loss."
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/30">
                  <CardContent className="p-3 text-xs">
                    "Buy ETH/USDT using 10% of starting capital. Add an additional 10% of available cash to the position at every 1% drop in price. Sell at 5% profit or 20% loss."
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <Label>Strategy Code</Label>
          <div className="bg-[#1e1e1e] text-white rounded-md h-64 mt-2 p-4 overflow-auto">
            <pre className="text-xs opacity-50">
              <code>// Your strategy code will appear here after generation</code>
            </pre>
          </div>
          <div className="text-xs text-muted-foreground mt-3">
            Need help? Try chatting with <span className="text-green-500 font-medium">CODY</span> on <span className="underline">ChatGPT Plus</span>
          </div>
        </div>
      </div>
    </div>
  );
};
