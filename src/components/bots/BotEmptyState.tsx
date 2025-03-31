
import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateBotButton } from './CreateBotButton';
import { FAQAccordion } from './FAQAccordion';

export const BotEmptyState: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <div className="space-y-4">
          <h2 className="text-xl font-medium">FAQs</h2>
          <FAQAccordion />
          
          <div className="mt-4">
            <Button variant="outline" className="gap-2 text-primary w-full justify-start">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-primary text-xs">?</span>
              Visit Support Center
            </Button>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2 flex flex-col items-center justify-center text-center py-16">
        <div className="bg-primary/10 rounded-full p-6 mb-4">
          <Bot className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-xl font-medium mb-2">Automate your trading with bots!</h2>
        <p className="text-muted-foreground mb-6">Start by selecting a bot</p>
        <Button className="gap-2">
          SELECT A BOT
          <Bot className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
