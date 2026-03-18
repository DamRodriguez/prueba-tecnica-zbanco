import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartTooltip from "../PieChart/ChartTooltip";

export interface MonthData {
  name: string;
  value: number;
}

interface StackedBarChartProps {
  data: MonthData[];
  toolTipText?: string;
}

const StackedBarChart = ({ data, toolTipText }: StackedBarChartProps) => {
  const toolTipFinalText = toolTipText ? `${toolTipText}: ` : "";
  return (
    <div style={{ height: "29rem" }}>
      <ResponsiveContainer height="100%" width="100%" className="-ml-8">
        <BarChart
          data={data}
        >
          <CartesianGrid
            strokeDasharray="10 7"
            vertical={false}
            stroke="#eaeaea"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tickFormatter={tick => String(tick.slice(0, 3))}
            tick={{ fill: "#86929E", fontSize: "0.75rem" }}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#86929E", fontSize: "0.75rem", dy: -2 }}
          />
          <Tooltip
            content={({ payload }) => {
              if (payload.length > 0) {
                const { name, value } = payload[0].payload;
                return (
                  <ChartTooltip
                    title={name}
                    subtitle={`${toolTipFinalText}${String(value)}`}
                  />
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="value"
            fill="var(--color-blue)"
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;
