
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BotConfigurationTab } from '@/components/bots/builder/BotConfigurationTab';
import { StrategyEditorTab } from '@/components/bots/builder/StrategyEditorTab';
import { BacktestResultsTab } from '@/components/bots/builder/BacktestResultsTab';
import { Bot, BotIcon } from 'lucide-react';

export default function BotBuilder() {
  const [activeTab, setActiveTab] = useState("configure");
  
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="container py-6 space-y-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 text-white">
                  <span className="text-xl font-bold">C</span>
                </div>
                <h1 className="text-2xl font-bold">Cody AI</h1>
                <div className="bg-muted/30 text-muted-foreground h-6 px-2 rounded-full flex items-center text-xs">
                  <span className="mr-1 h-1.5 w-1.5 rounded-full bg-muted-foreground"></span>
                  Stopped
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">BACKTEST</Button>
              <Button>START BOT</Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="border-b w-full rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="configure"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent data-[state=active]:bg-transparent py-2 font-medium"
              >
                Configure Bot
              </TabsTrigger>
              <TabsTrigger 
                value="backtest"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent data-[state=active]:bg-transparent py-2 font-medium"
              >
                Backtest Report
              </TabsTrigger>
              <TabsTrigger 
                value="performance"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent data-[state=active]:bg-transparent py-2 font-medium"
              >
                Live Performance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="configure">
              <BotConfigurationTab />
            </TabsContent>
            
            <TabsContent value="backtest">
              <BacktestResultsTab />
            </TabsContent>
            
            <TabsContent value="performance">
              <div className="flex flex-col items-center justify-center p-10 text-center">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Live Performance Data</h3>
                <p className="text-muted-foreground mb-4">
                  Start the bot to begin collecting performance data
                </p>
                <Button>START BOT</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
