import { Strategy } from "@/components/Strategy";
import { StrategyFormValues } from "@/components/strategy/builder/form/BasicSettingsTab";
import { PineScriptStrategy } from "@/components/strategy/pine/PineScriptTypes";

// Mock historical price data for backtesting (in a real app, this would come from an API)
export interface HistoricalPrice {
  time: string;
  open: number;
  high: number;
  close: number;
  low: number;
  volume: number;
}

export interface Trade {
  entryTime: string;
  entryPrice: number;
  exitTime: string;
  exitPrice: number;
  profit: number;
  profitPercentage: number;
  type: 'long' | 'short';
}

export interface BacktestResult {
  strategy: string;
  symbol: string;
  timeframe: string;
  startDate: string;
  endDate: string;
  initialCapital: number;
  finalCapital: number;
  totalProfit: number;
  totalProfitPercentage: number;
  winRate: number;
  trades: Trade[];
  equityCurve: { time: string; value: number }[];
  drawdowns: { time: string; value: number }[];
  maxDrawdown: number;
  sharpeRatio: number;
  annualizedReturn: number;
}

// Generate mock historical price data
const generateMockPriceData = (
  symbol: string,
  timeframe: string,
  days: number
): HistoricalPrice[] => {
  const data: HistoricalPrice[] = [];
  let basePrice = 100 + Math.random() * 900; // Random starting price between 100 and 1000
  
  const priceVolatility = 0.01; // 1% volatility per period
  const now = new Date();
  
  // Number of periods per day based on timeframe
  const periodsPerDay = timeframe === "1m" ? 1440 :
                        timeframe === "5m" ? 288 :
                        timeframe === "15m" ? 96 :
                        timeframe === "30m" ? 48 :
                        timeframe === "1h" ? 24 :
                        timeframe === "4h" ? 6 : 1; // Default to 1 for daily
  
  const totalPeriods = days * periodsPerDay;
  
  // Generate random walk price data
  for (let i = 0; i < totalPeriods; i++) {
    const periodTime = new Date(now.getTime() - (totalPeriods - i) * (24 * 60 * 60 * 1000 / periodsPerDay));
    
    // Generate random price movement
    const priceChange = basePrice * priceVolatility * (Math.random() * 2 - 1);
    basePrice += priceChange;
    
    // Generate high, low, open, close
    const range = basePrice * 0.005; // 0.5% range for high/low
    const high = basePrice + Math.random() * range;
    const low = basePrice - Math.random() * range;
    const open = low + Math.random() * (high - low);
    const close = low + Math.random() * (high - low);
    
    data.push({
      time: periodTime.toISOString(),
      open,
      high,
      low,
      close,
      volume: Math.floor(10000 + Math.random() * 90000)
    });
  }
  
  return data;
};

// Run a backtest based on a strategy
export const runBacktest = async (
  strategy: Strategy | StrategyFormValues | PineScriptStrategy,
  symbol = "BTC/USD",
  timeframe = "1h",
  days = 365,
  initialCapital = 10000
): Promise<BacktestResult> => {
  // Get mock historical data
  const historicalData = generateMockPriceData(symbol, timeframe, days);
  
  // List of trades executed during the backtest
  const trades: Trade[] = [];
  
  // Equity curve over time
  const equityCurve: { time: string; value: number }[] = [];
  
  // Keep track of current position
  let inPosition = false;
  let entryPrice = 0;
  let entryTime = "";
  let currentCapital = initialCapital;
  let positionType: 'long' | 'short' = 'long';
  
  // Initial equity curve point
  equityCurve.push({ 
    time: historicalData[0].time, 
    value: currentCapital 
  });
  
  // Simple strategy simulation based on strategy type and parameters
  for (let i = 20; i < historicalData.length; i++) { // Start at 20 to have enough data for indicators
    const current = historicalData[i];
    const previous = historicalData[i-1];
    
    // Calculate some basic indicators
    // Simple Moving Average (SMA) - 20 periods
    let sma20 = 0;
    for (let j = i - 20; j < i; j++) {
      sma20 += historicalData[j].close;
    }
    sma20 /= 20;
    
    // SMA - 50 periods
    let sma50 = 0;
    for (let j = i - Math.min(50, i); j < i; j++) {
      sma50 += historicalData[j].close;
    }
    sma50 /= Math.min(50, i);
    
    // Implement strategy logic based on strategy type
    const strategyType = 'type' in strategy ? strategy.type : 'trend';
    
    // If not in position, check for entry signals
    if (!inPosition) {
      let enterLong = false;
      let enterShort = false;
      
      if (strategyType === 'trend') {
        // Trend following strategy: Enter long when price crosses above SMA20
        enterLong = previous.close < sma20 && current.close > sma20;
      } else if (strategyType === 'reversal') {
        // Reversal strategy: Enter long when price is oversold (simple simulation)
        enterLong = current.close < sma50 * 0.95; // 5% below SMA50
        enterShort = current.close > sma50 * 1.05; // 5% above SMA50
      } else if (strategyType === 'breakout') {
        // Breakout strategy: Enter when price breaks recent high
        let highestHigh = 0;
        for (let j = i - 10; j < i; j++) {
          if (historicalData[j].high > highestHigh) {
            highestHigh = historicalData[j].high;
          }
        }
        enterLong = current.close > highestHigh;
      }
      
      // Enter position if signal is generated
      if (enterLong) {
        inPosition = true;
        entryPrice = current.close;
        entryTime = current.time;
        positionType = 'long';
      } else if (enterShort) {
        inPosition = true;
        entryPrice = current.close;
        entryTime = current.time;
        positionType = 'short';
      }
    } 
    // If in position, check for exit signals
    else {
      let exitSignal = false;
      
      // Stop loss - 5% loss
      const stopLossLevel = positionType === 'long' ? 
        entryPrice * 0.95 : entryPrice * 1.05;
      
      // Take profit - 10% gain
      const takeProfitLevel = positionType === 'long' ? 
        entryPrice * 1.1 : entryPrice * 0.9;
      
      // Check for stop loss or take profit
      if (positionType === 'long') {
        if (current.low <= stopLossLevel) {
          exitSignal = true;
        } else if (current.high >= takeProfitLevel) {
          exitSignal = true;
        }
      } else { // short position
        if (current.high >= stopLossLevel) {
          exitSignal = true;
        } else if (current.low <= takeProfitLevel) {
          exitSignal = true;
        }
      }
      
      // Exit based on strategy type
      if (strategyType === 'trend' && current.close < sma20 && positionType === 'long') {
        exitSignal = true;
      } else if (strategyType === 'reversal') {
        if ((positionType === 'long' && current.close > sma50) ||
            (positionType === 'short' && current.close < sma50)) {
          exitSignal = true;
        }
      }
      
      // Exit position if signal is generated
      if (exitSignal) {
        const exitPrice = current.close;
        
        // Calculate profit
        const profit = positionType === 'long' ? 
          exitPrice - entryPrice : entryPrice - exitPrice;
        const profitPercentage = (profit / entryPrice) * 100 * (positionType === 'long' ? 1 : -1);
        
        // Update capital
        currentCapital += (currentCapital * profitPercentage) / 100;
        
        // Record trade
        trades.push({
          entryTime,
          entryPrice,
          exitTime: current.time,
          exitPrice,
          profit,
          profitPercentage,
          type: positionType
        });
        
        // Reset position
        inPosition = false;
      }
    }
    
    // Update equity curve
    equityCurve.push({
      time: current.time,
      value: currentCapital
    });
  }
  
  // Calculate performance metrics
  const winningTrades = trades.filter(trade => trade.profit > 0);
  const winRate = trades.length > 0 ? winningTrades.length / trades.length : 0;
  
  // Calculate drawdowns
  const drawdowns: { time: string; value: number }[] = [];
  let maxDrawdown = 0;
  let peak = initialCapital;
  
  for (const point of equityCurve) {
    if (point.value > peak) {
      peak = point.value;
    }
    
    const drawdown = (peak - point.value) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
    
    drawdowns.push({
      time: point.time,
      value: drawdown * 100 // Convert to percentage
    });
  }
  
  // Calculate Sharpe ratio (simplified)
  const returns: number[] = [];
  for (let i = 1; i < equityCurve.length; i++) {
    const returnPct = (equityCurve[i].value - equityCurve[i-1].value) / equityCurve[i-1].value;
    returns.push(returnPct);
  }
  
  const avgReturn = returns.reduce((sum, val) => sum + val, 0) / returns.length;
  const stdDev = Math.sqrt(
    returns.reduce((sum, val) => sum + Math.pow(val - avgReturn, 2), 0) / returns.length
  );
  
  const sharpeRatio = stdDev === 0 ? 0 : avgReturn / stdDev * Math.sqrt(252); // Annualized
  
  // Calculate annualized return
  const totalDays = days;
  const totalReturn = (currentCapital - initialCapital) / initialCapital;
  const annualizedReturn = Math.pow(1 + totalReturn, 365 / totalDays) - 1;
  
  // Return backtest results
  return {
    strategy: 'name' in strategy ? strategy.name : 'Custom Strategy',
    symbol,
    timeframe,
    startDate: historicalData[0].time,
    endDate: historicalData[historicalData.length - 1].time,
    initialCapital,
    finalCapital: currentCapital,
    totalProfit: currentCapital - initialCapital,
    totalProfitPercentage: ((currentCapital - initialCapital) / initialCapital) * 100,
    winRate: winRate * 100,
    trades,
    equityCurve,
    drawdowns,
    maxDrawdown: maxDrawdown * 100,
    sharpeRatio,
    annualizedReturn: annualizedReturn * 100
  };
};
