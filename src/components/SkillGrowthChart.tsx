import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";

const growthData = [
  { month: "Jan", javascript: 45, systemDesign: 30, communication: 55, dsa: 35 },
  { month: "Feb", javascript: 52, systemDesign: 38, communication: 58, dsa: 42 },
  { month: "Mar", javascript: 58, systemDesign: 42, communication: 60, dsa: 45 },
  { month: "Apr", javascript: 63, systemDesign: 48, communication: 62, dsa: 48 },
  { month: "May", javascript: 68, systemDesign: 55, communication: 65, dsa: 52 },
  { month: "Jun", javascript: 72, systemDesign: 58, communication: 67, dsa: 54 },
  { month: "Jul", javascript: 75, systemDesign: 62, communication: 68, dsa: 56 },
  { month: "Aug", javascript: 78, systemDesign: 65, communication: 70, dsa: 58 },
];

const timeRanges = [
  { label: "3M", months: 3 },
  { label: "6M", months: 6 },
  { label: "1Y", months: 8 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 border border-glass-border">
        <p className="font-mono text-xs text-muted-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="capitalize text-foreground">
              {entry.dataKey.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            <span className="font-mono text-primary">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const SkillGrowthChart = () => {
  const [selectedRange, setSelectedRange] = useState(8);

  const filteredData = growthData.slice(-selectedRange);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Skill Growth Timeline</h3>
            <p className="text-xs text-muted-foreground font-mono">PROGRESSION ANALYSIS</p>
          </div>
        </div>
        <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
          {timeRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setSelectedRange(range.months)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                selectedRange === range.months
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradientJavascript" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(186, 100%, 50%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(186, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientSystemDesign" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(270, 76%, 53%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(270, 76%, 53%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientCommunication" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(115, 100%, 61%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(115, 100%, 61%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientDsa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(340, 100%, 50%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(340, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 30%, 18%)" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12, fontFamily: "JetBrains Mono" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12, fontFamily: "JetBrains Mono" }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 20 }}
              formatter={(value) => (
                <span className="text-xs text-muted-foreground capitalize">
                  {value.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="javascript"
              stroke="hsl(186, 100%, 50%)"
              strokeWidth={2}
              fill="url(#gradientJavascript)"
              dot={{ fill: "hsl(186, 100%, 50%)", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: "hsl(186, 100%, 50%)", stroke: "hsl(186, 100%, 70%)", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="systemDesign"
              stroke="hsl(270, 76%, 53%)"
              strokeWidth={2}
              fill="url(#gradientSystemDesign)"
              dot={{ fill: "hsl(270, 76%, 53%)", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: "hsl(270, 76%, 53%)", stroke: "hsl(270, 76%, 70%)", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="communication"
              stroke="hsl(115, 100%, 61%)"
              strokeWidth={2}
              fill="url(#gradientCommunication)"
              dot={{ fill: "hsl(115, 100%, 61%)", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: "hsl(115, 100%, 61%)", stroke: "hsl(115, 100%, 70%)", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="dsa"
              stroke="hsl(340, 100%, 50%)"
              strokeWidth={2}
              fill="url(#gradientDsa)"
              dot={{ fill: "hsl(340, 100%, 50%)", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: "hsl(340, 100%, 50%)", stroke: "hsl(340, 100%, 70%)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillGrowthChart;
