import clsx from "clsx";
import EmptyValue from "../EmptyValue";
import SmallContainer from "../SmallContainer";
import Title from "../Title";
import StackedBarChart, { type MonthData } from "./StackedBarChart";
import { useTranslation } from "react-i18next";

interface StackedBarCartContainerProps {
  data: MonthData[];
}

const StackedBarCartContainer = ({ data }: StackedBarCartContainerProps) => {
  const { t } = useTranslation();
  const hasData = data.length !== 0;

  return (
    <SmallContainer className={clsx("w-full h-[20rem] xl:h-full flex", {
      "justify-between": hasData
    })}>
      <Title title={t("pages.dashboard.sections.transferSummary.title")} />
      {hasData ? (
        <StackedBarChart
          data={data}
          toolTipText={t("pages.dashboard.sections.transferSummary.toolTipText")}
        />
      ) : (
        <div className="text-center">
          <EmptyValue value="N/A" />
        </div>
      )}
    </SmallContainer>
  );
};

export default StackedBarCartContainer;
