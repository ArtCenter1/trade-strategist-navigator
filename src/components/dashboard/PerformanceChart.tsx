
import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { themeColors } from "@/lib/theme-config";
import { Card } from "@/components/ui/card";

// Mock data for the chart
const generateChartData = () => {
  // Generate a decreasing trend line that resembles the image
  const data = [];
  let value = 50000;
  
  for (let i = 0; i < 60; i++) {
    const change = Math.random() * 1000 - 600; // More likely to decrease
    value = Math.max(40000, value + change); // Don't go below 40000
    
    data.push({
      timestamp: new Date(2023, 0, 1, 9).getTime() + i * 1000 * 60 * 60,
      value,
    });
  }
  
  return data;
};

const data = generateChartData();

export function PerformanceChart() {
  const formatXAxis = (tickItem: number) => {
    return new Date(tickItem).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatYAxis = (tickItem: number) => {
    return `$${Math.round(tickItem / 1000)}k`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="bg-[#222222] border-[#333333] p-2 text-white text-xs">
          <div>
            {new Date(payload[0].payload.timestamp).toLocaleString([], {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="font-bold">${payload[0].value.toLocaleString()}</div>
        </Card>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF3B30" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#FF3B30" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="timestamp"
          tickFormatter={formatXAxis}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#999999", fontSize: 10 }}
          type="number"
          domain={["dataMin", "dataMax"]}
        />
        <YAxis
          tickFormatter={formatYAxis}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#999999", fontSize: 10 }}
          width={30}
          domain={["dataMin - 2000", "dataMax + 2000"]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#FF3B30"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorValue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
