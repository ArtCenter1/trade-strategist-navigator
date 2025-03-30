
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Strategy } from "@/components/Strategy";

// Generate mock performance data for the comparison chart
const generatePerformanceData = (strategies: Strategy[]) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  return monthNames.map((month, index) => {
    const dataPoint: Record<string, any> = { month };
    
    strategies.forEach(strategy => {
      // Generate semi-random performance data that somewhat follows the risk profile
      const riskMultiplier = strategy.riskLevel === "high" ? 1.5 : 
                            strategy.riskLevel === "medium" ? 1 : 0.7;
      
      // Base performance value + some randomness
      // Fix: Convert winRate to a number with Number() before arithmetic operations
      const basePerformance = 
        (Number(strategy.performanceMetrics.winRate.replace('%', '')) / 100) * (index + 1) * riskMultiplier;
      
      // Add some randomness to the data
      const randomFactor = Math.random() * 5 - 2.5; // Random between -2.5 and 2.5
      
      dataPoint[strategy.id] = +(basePerformance + randomFactor).toFixed(2);
    });
    
    return dataPoint;
  });
};

// Generate a unique color based on the strategy id
const getLineColor = (index: number) => {
  const colors = ["#2563eb", "#16a34a", "#dc2626", "#9333ea", "#ea580c"];
  return colors[index % colors.length];
};

interface ComparisonChartProps {
  strategies: Strategy[];
}

export function ComparisonChart({ strategies }: ComparisonChartProps) {
  const performanceData = generatePerformanceData(strategies);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis 
                label={{ value: 'Return %', angle: -90, position: 'insideLeft' }} 
              />
              <Tooltip />
              <Legend />
              {strategies.map((strategy, index) => (
                <Line
                  key={strategy.id}
                  type="monotone"
                  dataKey={strategy.id}
                  name={strategy.name}
                  stroke={getLineColor(index)}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
