
import React from 'react';
import { BotCard } from './BotCard';
import { Bot } from './types';

interface BotSectionProps {
  title: string;
  bots: Bot[];
}

export const BotSection: React.FC<BotSectionProps> = ({ title, bots }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
        <div className="h-1 w-1 rounded-full bg-primary"></div>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {bots.map((bot) => (
          <BotCard key={bot.id} bot={bot} />
        ))}
      </div>
    </div>
  );
};
