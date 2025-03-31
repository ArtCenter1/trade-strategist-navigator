
import React from 'react';
import { Bot } from './types';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';

interface MyBotsListProps {
  bot: Bot;
  viewType: 'grid' | 'list';
}

export const MyBotsList: React.FC<MyBotsListProps> = ({ bot, viewType }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:border-primary/50 transition-colors">
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
              <div className="text-xs text-muted-foreground">
                {bot.ownerName}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-background/50 rounded-lg">
          <Wrench className="h-10 w-10 mb-2 text-muted-foreground" />
          <div className="text-lg font-medium">Draft</div>
          <div className="text-sm text-muted-foreground">Click to configure this bot</div>
        </div>
      </div>
      
      <div className="p-3 border-t flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
          <span className="text-xs text-muted-foreground">Stopped</span>
        </div>
        <Button variant="outline" size="sm">CONFIGURE</Button>
      </div>
    </div>
  );
};
