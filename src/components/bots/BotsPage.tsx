
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { BotSection } from './BotSection';
import { BotCard } from './BotCard';
import { popularStrategies, smartTradingBots, signalBots, technicalAnalysisBots } from './botsData';

const BotsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Trading Bots for Everyone</h1>
        <p className="text-muted-foreground">
          Automate your strategies with our professionally designed trading algorithms
        </p>
        <p className="text-sm text-muted-foreground max-w-4xl">
          Discover a range of ready-to-use tools that automate your trading strategies to improve and diversify your returns. Whether you're a beginner wanting to explore algorithmic trading or a veteran seeking new strategies, our bots were designed for everyone. Take advantage of backtesting to create confidence in your strategy, analyze risk, and optimize for your specific needs.
        </p>
      </div>
      
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          className="pl-10" 
          placeholder="Search for bots..." 
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

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
  );
};

export default BotsPage;
