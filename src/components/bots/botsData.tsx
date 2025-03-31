
import React from 'react';
import { 
  BarChart2, 
  RefreshCcw, 
  Copy, 
  TrendingUp,
  Bot as BotIcon, 
  Activity, 
  BarChart4, 
  Repeat
} from 'lucide-react';
import { Bot } from './types';

export const popularStrategies: Bot[] = [
  {
    id: 'accumulator',
    name: 'Accumulator',
    description: 'Incrementally builds larger positions over time through a systematic buying approach with predefined intervals. This strategy enhances your dollar-cost averaging to build long-term positions.',
    icon: <RefreshCcw className="h-5 w-5" />,
    iconBgColor: '#4CAF50',
    successRate: 93,
    activeUsers: 8432,
    isPopular: true
  },
  {
    id: 'grid-trader',
    name: 'Grid Trader',
    description: 'Capitalize on sideways markets with a simple system for buying at support and selling at resistance. Creates a grid of buy/sell orders within a range to capture profits from price movements.',
    icon: <BarChart2 className="h-5 w-5" />,
    iconBgColor: '#FF9800',
    successRate: 89,
    activeUsers: 5644,
    isPopular: true
  },
  {
    id: 'portfolio-rebalancer',
    name: 'Portfolio Rebalancer',
    description: 'Automatically maintains your desired asset allocation by periodically rebalancing your portfolio. Removes emotion and keeps your long-term strategy intact even during market volatility.',
    icon: <RefreshCcw className="h-5 w-5" />,
    iconBgColor: '#2196F3',
    successRate: 94,
    activeUsers: 4566
  },
  {
    id: 'copy-trader',
    name: 'Copy Trader',
    description: 'Follow successful traders and automatically replicate their trades in your account. Popular feature for newcomers to learn from experienced traders while potentially profiting.',
    icon: <Copy className="h-5 w-5" />,
    iconBgColor: '#E91E63',
    successRate: 86,
    activeUsers: 9238,
    isNew: true
  }
];

export const smartTradingBots: Bot[] = [
  {
    id: 'cozy-ai',
    name: 'Cozy AI',
    description: 'Intelligence meets reliability in this market-adaptive AI bot. Designed to adjust trading strategies based on current market conditions, it learns from past results to optimize for your specific needs.',
    icon: <BotIcon className="h-5 w-5" />,
    iconBgColor: '#9C27B0',
    successRate: 92,
    activeUsers: 3356,
    isNew: true
  },
  {
    id: 'smart-order',
    name: 'Smart Order',
    description: 'Advanced order management with intelligent execution. Optimizes entry and exit points based on multiple market factors. Takes the stress out of timing your trades with automated precision.',
    icon: <BarChart4 className="h-5 w-5" />,
    iconBgColor: '#FFC107',
    successRate: 90,
    activeUsers: 2889
  },
  {
    id: 'market-maker',
    name: 'Market Maker',
    description: 'Simulates professional market-making on exchange pairs of your choice. Creates liquidity while targeting small profitable spreads. Utilizes advanced discovery methods based on liquidity gaps, including proprietary approach to spread assessment.',
    icon: <Activity className="h-5 w-5" />,
    iconBgColor: '#F44336',
    successRate: 88,
    activeUsers: 1876
  }
];

export const signalBots: Bot[] = [
  {
    id: 'tradingview-bot',
    name: 'TradingView Bot',
    description: 'Seamlessly integrate your TradingView indicators into real-time trading signals. Buy and sell exactly when the TradingView Bot identifies triggers based on your custom indicators. Execute signals manually or automatically based on your preferences.',
    icon: <TrendingUp className="h-5 w-5" />,
    iconBgColor: '#673AB7',
    successRate: 87,
    activeUsers: 6542
  }
];

export const technicalAnalysisBots: Bot[] = [
  {
    id: 'macd',
    name: 'MACD',
    description: 'Utilize the MACD indicator to detect momentum shifts in markets. The MACD bot automatically executes trades based on crossovers in the MACD line and signal line, capturing potential trend changes and continuation patterns.',
    icon: <TrendingUp className="h-5 w-5" />,
    iconBgColor: '#FF5722',
    successRate: 85,
    activeUsers: 3421
  },
  {
    id: 'dmi',
    name: 'DMI+',
    description: 'Leverages the power of the Directional Movement Indicator, a flagship indicator from Welles Wilder. DMI+ bot monitors trend strength and direction to help determine optimal entry and exit points for trending markets.',
    icon: <TrendingUp className="h-5 w-5" />,
    iconBgColor: '#9C27B0',
    successRate: 83,
    activeUsers: 2576
  },
  {
    id: 'bollinger-bands',
    name: 'Bollinger Bands',
    description: 'A volatility-based system that adapts to current market conditions. This bot buys when the price bands contract and sells as they expand, allowing you to capitalize on volatility expansion and contraction cycles.',
    icon: <Activity className="h-5 w-5" />,
    iconBgColor: '#4CAF50',
    successRate: 88,
    activeUsers: 4124
  },
  {
    id: 'mean-reversion',
    name: 'Mean Reversion',
    description: 'Based on the statistical principle that prices tend to revert to the mean over time. This bot identifies extreme deviations and takes contrarian positions, betting on the return to normal market conditions.',
    icon: <Repeat className="h-5 w-5" />,
    iconBgColor: '#00BCD4',
    successRate: 84,
    activeUsers: 2819
  }
];
