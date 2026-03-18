import { Cell, Pie, PieChart as PieChartComponent, Tooltip } from "recharts";
import ChartTooltip from "./ChartTooltip";

export type PieChartDataType = {
  name: string;
  value: number;
  color: string;
};

interface PieChartProps {
  data: PieChartDataType[];
  toolTipText?: string;
}

interface RenderLabelProps {
  cx: number;
  cy: number;
  midAngle?: number;
  innerRadius: number;
  outerRadius: number;
  percent?: number;
  index?: number;
  data: PieChartDataType[];
}

const renderLabel = ({
  cx,
  cy,
  midAngle = 0,
  innerRadius,
  outerRadius,
  percent = 0,
  index = 0,
  data,
}: RenderLabelProps) => {
  const radius = innerRadius + ((outerRadius - innerRadius) / 2);
  const x = cx + (radius * Math.cos(-midAngle * (Math.PI / 180)));
  const y = cy + (radius * Math.sin(-midAngle * (Math.PI / 180)));
  const text = `${(percent * 100).toFixed(0)}%`;
  const fillColor = data[index]?.color || "black";
  if (text === "0%") return null;

  return (
    <>
      <rect
        x={x - 26}
        y={y - 13}
        width={52}
        height={26}
        rx={13}
        fill="#edfbff"
        style={{ pointerEvents: "none" }}
      />
      <text
        x={x}
        y={y}
        fill={fillColor}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
        style={{ pointerEvents: "none" }}
      >
        {text}
      </text>
    </>
  );
};

const PieChart = ({ data, toolTipText }: PieChartProps) => {
  const toolTipFinalText = toolTipText ? `${toolTipText}: ` : "";
  return (
    <div className="flex flex-col w-fit items-center gap-[0.9rem]">
      <PieChartComponent width={200} height={200} className="drop-shadow-lg">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
          label={props => renderLabel({ ...props, data })}
          labelLine={false}
          tabIndex={-1}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${String(index)}`} fill={entry.color} stroke="none" />
          ))}
        </Pie>
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
      </PieChartComponent>
      <div className="grid grid-cols-2 gap-[0.5rem]">
        {data.map((entry, index) => (
          <div className="flex items-center gap-[0.5rem]" key={index}>
            <div
              className="w-[0.5rem] sm:w-[1rem] rounded-full aspect-square"
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-xs sm:text-base">{entry.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
