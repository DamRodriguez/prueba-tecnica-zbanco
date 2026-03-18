type ChartTooltipProps = {
  title?: string;
  subtitle?: string;
};

const ChartTooltip = ({ title, subtitle }: ChartTooltipProps) => {
  return (
    <div className="bg-white shadow-s2 p-[0.5rem] rounded-[0.45rem]">
      <p className="text-base font-medium">{title}</p>
      <p className="text-base">{subtitle}</p>
    </div>
  );
};

export default ChartTooltip;
