
import React from 'react';
import { CheckCircle, Users, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot } from './types';

interface BotCardProps {
  bot: Bot;
}

export const BotCard: React.FC<BotCardProps> = ({ bot }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:border-primary/50 transition-colors">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: bot.iconBgColor }}
            >
              {bot.icon}
            </div>
            <div>
              <h3 className="font-medium text-lg">{bot.name}</h3>
              {bot.isPopular && (
                <Badge variant="outline" className="text-xs font-normal border-amber-500 text-amber-500">
                  POPULAR
                </Badge>
              )}
              {bot.isNew && (
                <Badge variant="outline" className="text-xs font-normal border-green-500 text-green-500">
                  NEW
                </Badge>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{bot.description}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span>{bot.successRate}% Success</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{bot.activeUsers} Active</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t flex justify-center">
        <Button variant="ghost" size="sm" className="w-full text-xs gap-1 hover:bg-primary/10">
          <span>Subscribe Now</span>
          <ArrowUpRight className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};
