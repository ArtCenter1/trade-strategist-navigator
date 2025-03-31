
import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FAQAccordion } from './FAQAccordion';

export const BotEmptyState: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectBot = () => {
    navigate('/bots');
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <div className="space-y-4">
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
      
      <div className="md:col-span-2 flex flex-col items-center justify-center text-center py-16">
        <div className="bg-[#333333] rounded-full p-6 mb-4">
          <Bot className="h-10 w-10 text-[#6a0dad]" />
        </div>
        <h2 className="text-xl font-medium mb-2">Automate your trading with bots!</h2>
        <p className="text-[#999999] mb-6">Start by selecting a bot</p>
        <Button 
          className="gap-2 bg-[#00e676] hover:bg-[#00c853] text-black px-4 py-2 rounded-md"
          onClick={handleSelectBot}
        >
          SELECT A BOT
          <Bot className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
