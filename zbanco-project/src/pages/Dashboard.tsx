import { useTranslation } from "react-i18next";
import BaseContainer from "../other/BaseContainer";
import SmallContainer from "../components/pages/dashboard/SmallContainer";
import useTransfer from "../components/redux/transfer/useTransfer";
import { formatMoney } from "../utils/formatMoney";
import PieChartContainer from "../components/pages/dashboard/PieChart/PieChartContainer";
import StackedBarCartContainer from "../components/pages/dashboard/StackedBarChart/StackedBarChartContainer";
import Title from "../components/pages/dashboard/Title";
import EmptyValue from "../components/pages/dashboard/EmptyValue";

const Dashboard = () => {
  const { t } = useTranslation();
  const { totalTransactions, totalAmountTransferred, mostActiveAccount, amountDistribution, monthlyStatus } = useTransfer();

  return (
    <BaseContainer
      title={t("pages.dashboard.title")}
    >
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-10">
        <div className="flex flex-col gap-5 sm:gap-10 items-center">
          <div className="flex flex-col xl:flex-row gap-5 sm:gap-10">
            <div className="flex xl:flex-col gap-5 sm:gap-10">

              <SmallContainer className="w-full flex items-center justify-center">
                <Title title={t("pages.dashboard.sections.totalTransactions.title")} />
                {totalTransactions !== 0 ? (
                  <span className="text-lg sm:text-2xl font-semibold text-black">
                    {totalTransactions}
                  </span>
                ) : (
                  <EmptyValue value={0} />
                )}
              </SmallContainer>

              <SmallContainer className="w-full flex items-center justify-center">
                <Title title={t("pages.dashboard.sections.totalTransferred.title")} />
                {totalAmountTransferred !== 0 ? (
                  <span className="text-lg sm:text-2xl font-semibold text-black">
                    {formatMoney(totalAmountTransferred)}
                  </span>
                ) : (
                  <EmptyValue value={0} />
                )}
              </SmallContainer>
            </div>

            <SmallContainer className="flex items-center justify-center">
              <Title title={t("pages.dashboard.sections.mostActiveAccount.title")} />
              <div className="flex flex-col items-center gap-3">
                {mostActiveAccount.count !== undefined ? (
                  <>
                    <img
                      src={mostActiveAccount.image}
                      alt={mostActiveAccount.name}
                      className="w-20 h-20 rounded-full object-cover shadow-s2"
                    />
                    <span className="text-base sm:text-xl font-semibold text-black">
                      {mostActiveAccount.name}
                    </span>
                    <span className="text-sm sm:text-base font-medium text-black">
                      {t("pages.dashboard.sections.mostActiveAccount.accountData.transfers")}: {mostActiveAccount.count}
                    </span>
                  </>
                ) : (
                  <EmptyValue value="N/A" />
                )}
              </div>
            </SmallContainer>
          </div>

          <div className="w-full sm:w-fit xl:w-full">
            <PieChartContainer data={amountDistribution} />
          </div>
        </div>

        <div className="flex-1">
          <StackedBarCartContainer data={monthlyStatus} />
        </div>
      </div>
    </BaseContainer>
  );
};

export default Dashboard;