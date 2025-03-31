
import React from 'react';
import { Bot } from './types';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MyBotsListProps {
  bot: Bot;
  viewType: 'grid' | 'list';
}

export const MyBotsList: React.FC<MyBotsListProps> = ({ bot, viewType }) => {
  const navigate = useNavigate();

  const handleConfigure = () => {
    navigate('/bot-builder');
  };

  return (
    <div className="bg-[#222222] border border-[#333333] rounded-lg overflow-hidden hover:border-[#444444] transition-colors">
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: bot.iconBgColor }}
            >
              {bot.icon}
            </div>
            <div>
              <h3 className="font-medium">{bot.name}</h3>
              <div className="text-xs text-[#999999]">
                {bot.ownerName}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-[#1A1A1A] rounded-lg">
          <svg className="w-16 h-16 text-[#555555] mb-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <div className="text-lg font-medium">Draft</div>
          <div className="text-sm text-[#999999] text-center mt-1">Click to configure this bot</div>
        </div>
      </div>
      
      <div className="p-3 border-t border-[#333333] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#999999]"></span>
          <span className="text-xs text-[#999999]">Stopped</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-[#333333] hover:bg-[#333333] text-xs"
          onClick={handleConfigure}
        >
          CONFIGURE
        </Button>
      </div>
    </div>
  );
};
