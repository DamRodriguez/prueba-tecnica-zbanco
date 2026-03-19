import { useTranslation } from "react-i18next";
import BaseContainer from "../../../../other/BaseContainer";
import useTransfer from "../../../redux/transfer/useTransfer";
import { formatMoney } from "../../../../utils/formatMoney";
import { formatDate } from "../../../../utils/formatDate";
import "../../../../styles/scrollbarHorizontal.css"
import "../../../../styles/scrollbarVertical.css"
import { useState } from "react";
import InputFilter from "./filters/InputFilter";
import AmountFilter from "./filters/AmountFilter";
import TableTitle from "../../../../other/TableTitle";
import Cell from "../../../../other/Cell";

const TransferHistorySection = () => {
  const { t } = useTranslation();
  const { transactions } = useTransfer();
  const [textFiltered, setTextFiltered] = useState(transactions);
  const [displayTransactions, setDisplayTransactions] = useState(transactions);

  return (
    <BaseContainer title={t("pages.home.transferHistory.title")}>

      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mb-6">
        <div className="flex-1">
          <InputFilter
            transactions={transactions}
            onFilter={setTextFiltered}
          />
        </div>

        <div className="flex-1">
          <AmountFilter
            transactions={textFiltered}
            onFilter={setDisplayTransactions}
          />
        </div>
      </div>

      <div className="border border-soft-gray rounded-md scrollbarHorizontal scrollbarCustom lg:h-[20rem] ">
        <div className="min-h-[13rem] grid grid-rows-4 grid-flow-col lg:grid-cols-4 lg:grid-flow-row min-w-max lg:min-w-full">

          <div className="contents lg:grid lg:grid-cols-4 lg:col-span-4 h-[2rem]">
            <TableTitle
              title={t("pages.home.transferHistory.table.titles.originAccount")}
            />
            <TableTitle
              title={t("pages.home.transferHistory.table.titles.destinationAccount")}
            />
            <TableTitle
              title={t("pages.home.transferHistory.table.titles.ammount")}
            />
            <TableTitle
              title={t("pages.home.transferHistory.table.titles.date")}
            />
          </div>

          {displayTransactions.map((item, index) => (
            <div key={index} className="contents lg:grid lg:grid-cols-4 lg:col-span-4">
              <Cell>
                <img
                  src={item.originAccount.image}
                  alt={item.originAccount.name}
                  className="w-8 rounded-full aspect-square flex-shrink-0"
                />
                <p className="text-black text-xs sm:text-base font-semibold truncate">
                  {item.originAccount.name}
                </p>
              </Cell>
              <Cell>
                <img
                  src={item.destinationAccount.image}
                  alt={item.destinationAccount.name}
                  className="w-8 rounded-full aspect-square flex-shrink-0"
                />
                <p className="text-black text-xs sm:text-base font-semibold truncate">
                  {item.destinationAccount.name}
                </p>
              </Cell>
              <Cell>
                <p className="text-black text-xs sm:text-base font-semibold">
                  {formatMoney(item.amount)}
                </p>
              </Cell>
              <Cell>
                <p className="text-black text-xs sm:text-base font-semibold">
                  {formatDate(item.date)}
                </p>
              </Cell>
            </div>
          ))}
          {displayTransactions.length === 0 && (
            <p className="flex justify-center items-center p-4 col-span-4 row-span-full lg:row-span-1 lg:pt-7 text-xs sm:text-base text-medium-gray">
              {t("pages.home.transferHistory.table.emptyTable")}
            </p>
          )}
        </div>
      </div>
    </BaseContainer>
  );
};

export default TransferHistorySection;