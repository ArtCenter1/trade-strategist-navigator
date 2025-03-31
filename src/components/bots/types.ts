
import { ReactNode } from 'react';

export interface Bot {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  iconBgColor: string;
  successRate: number;
  activeUsers: number;
  isPopular?: boolean;
  isNew?: boolean;
  status?: 'active' | 'stopped' | 'draft';
  ownerName?: string;
  category: string; // Added the category property
}

export interface BotStrategy {
  name: string;
  description: string;
  language: string;
  code: string;
  timeframe: string;
  symbol: string;
  exchange: string;
  initialCapital: number;
  stopLoss?: number;
  takeProfit?: number;
}
