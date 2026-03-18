import { useTranslation } from "react-i18next";
import EmptyValue from "../EmptyValue";
import SmallContainer from "../SmallContainer";
import Title from "../Title";
import type { PieChartDataType } from "./PieChart";
import PieChart from "./PieChart";

interface PieChartContainerProps {
  data: PieChartDataType[];
}

const PieChartContainer = ({ data }: PieChartContainerProps) => {
  const { t } = useTranslation();
  const hasData = data.length !== 0;

  return (
    <SmallContainer className="w-full h-full flex items-center justify-center">
      <Title title={t("pages.dashboard.sections.transferredAmounts.title")} />
      {hasData ? (
        <PieChart
          data={data}
          toolTipText={t("pages.dashboard.sections.transferredAmounts.toolTipText")}
        />
      ) : (
        <EmptyValue value="N/A" />
      )}
    </SmallContainer>
  );
};

export default PieChartContainer;
