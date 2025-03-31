
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, ArrowDownRight, Percent, DollarSign, Calendar, BarChart2 } from 'lucide-react';

export const BacktestResultsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold text-green-500">+24.6%</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                <span>+5.8% vs. Market</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profit Factor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">1.85</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                <span>Profitable</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold text-red-500">-12.3%</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <ArrowDownRight className="h-4 w-4 mr-1 text-red-500" />
                <span>-3.5% vs. Market</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <Percent className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Win Rate</span>
                </div>
                <div className="font-medium">63.8%</div>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Average Win</span>
                </div>
                <div className="font-medium">$45.28</div>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Average Loss</span>
                </div>
                <div className="font-medium">$28.75</div>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Test Period</span>
                </div>
                <div className="font-medium">90 days</div>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Sharpe Ratio</span>
                </div>
                <div className="font-medium">1.65</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Equity Curve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
              <span className="text-muted-foreground">Equity curve visualization would be shown here</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Trades</TabsTrigger>
              <TabsTrigger value="winning">Winning</TabsTrigger>
              <TabsTrigger value="losing">Losing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-3 text-sm font-medium">
                  <div>Date & Time</div>
                  <div>Type</div>
                  <div>Entry Price</div>
                  <div>Exit Price</div>
                  <div>Size</div>
                  <div className="text-right">P/L</div>
                </div>
                
                <div className="divide-y">
                  <div className="grid grid-cols-6 p-3 text-sm">
                    <div>2023-06-12 14:32</div>
                    <div className="text-green-500">BUY</div>
                    <div>$26,450.23</div>
                    <div>$27,120.58</div>
                    <div>0.05 BTC</div>
                    <div className="text-right text-green-500">+$33.52</div>
                  </div>
                  
                  <div className="grid grid-cols-6 p-3 text-sm">
                    <div>2023-06-11 09:15</div>
                    <div className="text-red-500">SELL</div>
                    <div>$26,890.47</div>
                    <div>$26,330.12</div>
                    <div>0.08 BTC</div>
                    <div className="text-right text-green-500">+$44.83</div>
                  </div>
                  
                  <div className="grid grid-cols-6 p-3 text-sm">
                    <div>2023-06-10 22:05</div>
                    <div className="text-green-500">BUY</div>
                    <div>$26,220.35</div>
                    <div>$25,980.79</div>
                    <div>0.03 BTC</div>
                    <div className="text-right text-red-500">-$7.19</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="winning">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-3 text-sm font-medium">
                  <div>Date & Time</div>
                  <div>Type</div>
                  <div>Entry Price</div>
                  <div>Exit Price</div>
                  <div>Size</div>
                  <div className="text-right">P/L</div>
                </div>
                
                <div className="divide-y">
                  <div className="grid grid-cols-6 p-3 text-sm">
                    <div>2023-06-12 14:32</div>
                    <div className="text-green-500">BUY</div>
                    <div>$26,450.23</div>
                    <div>$27,120.58</div>
                    <div>0.05 BTC</div>
                    <div className="text-right text-green-500">+$33.52</div>
                  </div>
                  
                  <div className="grid grid-cols-6 p-3 text-sm">
                    <div>2023-06-11 09:15</div>
                    <div className="text-red-500">SELL</div>
                    <div>$26,890.47</div>
                    <div>$26,330.12</div>
                    <div>0.08 BTC</div>
                    <div className="text-right text-green-500">+$44.83</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="losing">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-3 text-sm font-medium">
                  <div>Date & Time</div>
                  <div>Type</div>
                  <div>Entry Price</div>
                  <div>Exit Price</div>
                  <div>Size</div>
                  <div className="text-right">P/L</div>
                </div>
                
                <div className="divide-y">
                  <div className="grid grid-cols-6 p-3 text-sm">
                    <div>2023-06-10 22:05</div>
                    <div className="text-green-500">BUY</div>
                    <div>$26,220.35</div>
                    <div>$25,980.79</div>
                    <div>0.03 BTC</div>
                    <div className="text-right text-red-500">-$7.19</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
