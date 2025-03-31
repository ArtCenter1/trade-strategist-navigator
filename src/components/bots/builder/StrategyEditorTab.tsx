
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const StrategyEditorTab: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Edit Strategy</h3>
        <Textarea 
          className="h-96 font-mono"
          placeholder="Enter your strategy code here"
          defaultValue={`// Example strategy
function onTick(data) {
  // Simple moving average strategy
  const shortSMA = data.sma(10);
  const longSMA = data.sma(30);
  
  if (shortSMA > longSMA) {
    // Bullish signal
    return { action: 'BUY', quantity: 0.1 };
  } else if (shortSMA < longSMA) {
    // Bearish signal
    return { action: 'SELL', quantity: 0.1 };
  }
  
  return { action: 'HOLD' };
}`}
        />
        <div className="flex justify-end">
          <Button>Save Strategy</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Strategy Documentation</h3>
        <div className="border rounded-md p-4 h-96 overflow-y-auto">
          <h4 className="font-medium mb-2">Available Functions</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">data.sma(period)</code>
              <p className="text-muted-foreground">Simple Moving Average for the specified period</p>
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">data.ema(period)</code>
              <p className="text-muted-foreground">Exponential Moving Average for the specified period</p>
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">data.rsi(period)</code>
              <p className="text-muted-foreground">Relative Strength Index for the specified period</p>
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">data.macd(shortPeriod, longPeriod, signalPeriod)</code>
              <p className="text-muted-foreground">MACD with customizable parameters</p>
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">data.bbands(period, stdDev)</code>
              <p className="text-muted-foreground">Bollinger Bands with customizable parameters</p>
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">data.atr(period)</code>
              <p className="text-muted-foreground">Average True Range for the specified period</p>
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">data.close</code>
              <p className="text-muted-foreground">Current closing price</p>
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">data.high</code>
              <p className="text-muted-foreground">Current high price</p>
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">data.low</code>
              <p className="text-muted-foreground">Current low price</p>
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">data.volume</code>
              <p className="text-muted-foreground">Current volume</p>
            </li>
          </ul>
          
          <h4 className="font-medium mt-6 mb-2">Return Object</h4>
          <p className="text-sm text-muted-foreground">Your strategy should return an object with:</p>
          <ul className="space-y-2 text-sm mt-2">
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">action</code>: 'BUY', 'SELL', or 'HOLD'
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">quantity</code>: Amount to buy/sell (optional)
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">price</code>: Limit price (optional, market order if omitted)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
