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
import type { Transaction } from "../../../redux/transfer/transferSlice";
import GenericGridTable from "../../../../other/GenericGridTable";

const TransferHistorySection = () => {
  const { t } = useTranslation();
  const { transactions } = useTransfer();
  const [textFiltered, setTextFiltered] = useState(transactions);
  const [displayTransactions, setDisplayTransactions] = useState(transactions);

  const columns = [
    {
      header: t("pages.home.transferHistory.table.titles.originAccount"),
      render: (item: Transaction) => (
        <>
          <img src={item.originAccount.image} className="w-8 rounded-full aspect-square" alt="" />
          <p className="text-black text-xs sm:text-base font-semibold truncate">{item.originAccount.name}</p>
        </>
      )
    },
    {
      header: t("pages.home.transferHistory.table.titles.destinationAccount"),
      render: (item: Transaction) => (
        <>
          <img src={item.destinationAccount.image} className="w-8 rounded-full aspect-square" alt="" />
          <p className="text-black text-xs sm:text-base font-semibold truncate">{item.destinationAccount.name}</p>
        </>
      )
    },
    {
      header: t("pages.home.transferHistory.table.titles.ammount"),
      render: (item: Transaction) => (
        <p className="text-black font-semibold text-xs sm:text-base">{formatMoney(item.amount)}</p>
      )
    },
    {
      header: t("pages.home.transferHistory.table.titles.date"),
      render: (item: Transaction) => (
        <p className="text-black font-semibold text-xs sm:text-base">{formatDate(item.date)}</p>
      )
    }
  ];

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

      <GenericGridTable
        data={displayTransactions}
        columns={columns}
        emptyMessage={t("pages.home.transferHistory.table.emptyTable")}
      />
    </BaseContainer>
  );
};

export default TransferHistorySection;