
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Bot } from './types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MyBotsList } from './MyBotsList';
import { CreateBotButton } from './CreateBotButton';
import { BotEmptyState } from './BotEmptyState';
import { Wrench, Bot as BotIcon } from 'lucide-react';

const draftBots: Bot[] = [
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
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<string>('all');
  const [myBots, setMyBots] = useState<Bot[]>(draftBots);

  const hasBots = myBots.length > 0;

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="container py-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Bots</h1>
              <p className="text-muted-foreground">
                Manage your trading bots and strategies
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <span className="text-sm mr-2">Type</span>
                <select className="border border-border rounded-md px-3 py-1 bg-background text-sm">
                  <option value="all">All</option>
                  <option value="ai">AI</option>
                  <option value="signal">Signal</option>
                  <option value="technical">Technical</option>
                </select>
              </div>
              
              <div className="flex border rounded-md">
                <button 
                  className={`p-2 ${viewType === 'list' ? 'bg-primary/10' : ''}`}
                  onClick={() => setViewType('list')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                  </svg>
                </button>
                <button 
                  className={`p-2 ${viewType === 'grid' ? 'bg-primary/10' : ''}`}
                  onClick={() => setViewType('grid')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                </button>
              </div>
              
              <Button className="gap-2">
                FIND A BOT
                <BotIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {hasBots ? (
            <>
              <div className="flex flex-col space-y-2">
                <div className="text-sm text-muted-foreground">
                  {myBots.length} DRAFTS
                </div>
                <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-4`}>
                  {myBots.map((bot) => (
                    <MyBotsList key={bot.id} bot={bot} viewType={viewType} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <BotEmptyState />
          )}
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
