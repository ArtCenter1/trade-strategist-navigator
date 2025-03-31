
import React, { useState } from 'react';
import { Search, Bot } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BotSection } from './BotSection';
import { CreateBotButton } from './CreateBotButton';
import { popularStrategies, smartTradingBots, signalBots, technicalAnalysisBots } from './botsData';
import { useNavigate } from 'react-router-dom';

const BotsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFindBot = () => {
    navigate('/bot-builder');
  };

  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Trading Bots for Everyone</h1>
          <p className="text-muted-foreground">
            Automate your strategies with our professionally designed trading algorithms
          </p>
          <p className="text-sm text-muted-foreground max-w-4xl">
            Discover a range of ready-to-use tools that automate your trading strategies to improve and diversify your returns. Whether you're a beginner wanting to explore algorithmic trading or a veteran seeking new strategies, our bots were designed for everyone.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              className="pl-10" 
              placeholder="Search for bots..." 
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <Button className="whitespace-nowrap gap-2" onClick={handleFindBot}>
            FIND A BOT
            <Bot className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 space-y-2">
          <CreateBotButton />
          
          <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
            <div className="p-4 font-medium">Navigation</div>
            <div className="border-t">
              <div className="flex items-center py-2 px-4 bg-primary/10 border-l-2 border-primary">
                <span>Available Bots</span>
              </div>
              <div className="flex items-center py-2 px-4 hover:bg-muted/10 transition-colors">
                <span>My Bots</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
            <div className="p-4 font-medium">FAQs</div>
            <div className="border-t">
              <div className="p-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <h3 className="font-medium">What are bots?</h3>
                    <p className="text-muted-foreground text-xs">Automated trading programs that execute trades based on predefined rules.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">How do I get started?</h3>
                    <p className="text-muted-foreground text-xs">Select a bot, configure it, and connect it to your exchange account.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Can I run multiple bots?</h3>
                    <p className="text-muted-foreground text-xs">Yes, you can run multiple bots simultaneously across different markets.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div className="flex-1">
          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger value="all">ALL BOTS</TabsTrigger>
              <TabsTrigger value="popular">POPULAR STRATEGIES</TabsTrigger>
              <TabsTrigger value="smart">AI & SMART TRADING</TabsTrigger>
              <TabsTrigger value="signal">SIGNAL</TabsTrigger>
              <TabsTrigger value="technical">TECHNICAL ANALYSIS</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-10">
              <BotSection title="POPULAR STRATEGIES" bots={popularStrategies} />
              <BotSection title="AI & SMART TRADING" bots={smartTradingBots} />
              <BotSection title="SIGNAL" bots={signalBots} />
              <BotSection title="TECHNICAL ANALYSIS" bots={technicalAnalysisBots} />
            </TabsContent>

            <TabsContent value="popular" className="space-y-6">
              <BotSection title="POPULAR STRATEGIES" bots={popularStrategies} />
            </TabsContent>

            <TabsContent value="smart" className="space-y-6">
              <BotSection title="AI & SMART TRADING" bots={smartTradingBots} />
            </TabsContent>

            <TabsContent value="signal" className="space-y-6">
              <BotSection title="SIGNAL" bots={signalBots} />
            </TabsContent>

            <TabsContent value="technical" className="space-y-6">
              <BotSection title="TECHNICAL ANALYSIS" bots={technicalAnalysisBots} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BotsPage;
