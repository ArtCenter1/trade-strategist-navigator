
import React, { useState } from 'react';
import { BotCard } from './BotCard';
import { BotSection } from './BotSection';
import { popularStrategies, smartTradingBots, signalBots, technicalAnalysisBots } from './botsData';
import { BotEmptyState } from './BotEmptyState';
import { CreateBotButton } from './CreateBotButton';
import { FAQAccordion } from './FAQAccordion';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BotsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Combine all bot data arrays
  const botsData = [
    ...popularStrategies,
    ...smartTradingBots,
    ...signalBots,
    ...technicalAnalysisBots
  ];
  
  // Filter bots based on selected category
  const filteredBots = selectedCategory === 'all'
    ? botsData
    : botsData.filter(bot => bot.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Bots' },
    { id: 'ai', name: 'AI Bots' },
    { id: 'signal', name: 'Signal Bots' },
    { id: 'grid', name: 'Grid Trading' },
    { id: 'dca', name: 'DCA' },
  ];

  const hasBots = botsData.length > 0;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="space-y-4">
            <CreateBotButton />
            
            <div className="bg-[#222222] rounded-lg p-4 space-y-4">
              <h2 className="text-xl font-medium">Bot Categories</h2>
              <div className="space-y-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="bg-[#222222] rounded-lg p-4 space-y-4">
              <h2 className="text-xl font-medium">FAQs</h2>
              <FAQAccordion />
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="gap-2 text-[#00e676] w-full justify-start border-[#333333] hover:bg-[#222222] hover:border-[#444444]"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-[#00e676] text-xs">?</span>
                  Visit Support Center
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {hasBots ? (
            <>
              <h1 className="text-2xl font-bold mb-6">Available Bots</h1>
              
              {filteredBots.length > 0 ? (
                <div className="space-y-8">
                  {Object.entries(
                    filteredBots.reduce((acc, bot) => {
                      if (!acc[bot.category]) {
                        acc[bot.category] = [];
                      }
                      acc[bot.category].push(bot);
                      return acc;
                    }, {} as Record<string, typeof botsData>)
                  ).map(([category, bots]) => (
                    <BotSection key={category} title={category} bots={bots as any} />
                  ))}
                </div>
              ) : (
                <div className="bg-[#222222] p-6 rounded-lg text-center">
                  <p className="text-gray-400">No bots found for this category.</p>
                </div>
              )}
            </>
          ) : (
            <BotEmptyState />
          )}
        </div>
      </div>
    </div>
  );
}
