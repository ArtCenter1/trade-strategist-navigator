
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Bot as BotType } from './types';
import { BotEmptyState } from './BotEmptyState';
import { MyBotsList } from './MyBotsList';
import { FAQAccordion } from './FAQAccordion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageTransition } from '@/components/layout/PageTransition';

const draftBots: BotType[] = [
  {
    id: "grid-trader-1",
    name: "Grid Trader",
    description: "Automated grid trading strategy",
    icon: <Wrench className="h-5 w-5" />,
    iconBgColor: "#FF8C00",
    successRate: 65,
    activeUsers: 423,
    status: "stopped",
    ownerName: "quiztical_curran"
  }
];

export default function MyBotsPage() {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<string>('all');
  const [myBots, setMyBots] = useState<BotType[]>(draftBots);

  const hasBots = myBots.length > 0;

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">My Bots</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Type</span>
                <div className="relative">
                  <select 
                    className="appearance-none bg-transparent border border-[#333333] rounded px-3 py-1 pr-8 text-sm"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option>All</option>
                    <option>AI</option>
                    <option>Signal</option>
                  </select>
                  <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="border border-[#333333] rounded-md flex">
                <button onClick={() => setViewType('list')} className={`p-2 ${viewType === 'list' ? 'bg-[#333333]' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                  </svg>
                </button>
                <button onClick={() => setViewType('grid')} className={`p-2 ${viewType === 'grid' ? 'bg-[#333333]' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                </button>
              </div>
              <Button className="flex items-center space-x-1 bg-[#00e676] hover:bg-[#00c853] text-black px-4 py-2 rounded-md"
                onClick={() => navigate('/bots')}
              >
                <span>FIND A BOT</span>
                <Bot className="h-4 w-4" />
              </Button>
            </div>
          </div>

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
            
            <div className="md:col-span-2">
              {hasBots ? (
                <div>
                  <div className="text-sm text-[#999999] mb-3">
                    {myBots.length} DRAFTS
                  </div>
                  <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
                    {myBots.map((bot) => (
                      <MyBotsList key={bot.id} bot={bot} viewType={viewType} />
                    ))}
                  </div>
                </div>
              ) : (
                <BotEmptyState />
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
