import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BacktestDrawdownProps {
  drawdowns: { time: string; value: number }[];
}

export function BacktestDrawdown({ drawdowns }: BacktestDrawdownProps) {
  // Format data for the chart
  const chartData = drawdowns.map(point => {
    return {
      time: new Date(point.time).toLocaleDateString(),
      value: point.value
    };
  });

  // Filter data to reduce points (for better performance)
  const filteredData = chartData.filter((_, index) => {
    // Keep only every nth point depending on the data size
    const interval = Math.ceil(chartData.length / 100);
    return index % interval === 0 || index === chartData.length - 1;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drawdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="time" 
                tickFormatter={(value) => value}
              />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(2)}%`, 'Drawdown']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#ef4444" 
                fill="#ef444480" 
                name="Drawdown"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
