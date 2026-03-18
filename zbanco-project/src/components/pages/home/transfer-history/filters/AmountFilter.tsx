import { useState, useMemo, useEffect } from "react";
import type { Transaction } from "../../../../redux/transfer/transferSlice";
import { InputNumber } from "../../../../ui/inputs/InputNumber";
import { useTranslation } from "react-i18next";
import IconContainer from "../../../../../other/IconContainer";
import { AmountIcon } from "../../../../../icons/transferHistoryTable";

type AmountFilterProps = {
  transactions: Transaction[];
  onFilter: (data: Transaction[]) => void;
};

const AmountFilter = ({ transactions, onFilter }: AmountFilterProps) => {
  const { t } = useTranslation();
  const [minAmount, setMinAmount] = useState("");

  const filtered = useMemo(() => {
    const min = parseFloat(minAmount);
    if (isNaN(min)) return transactions;

    return transactions.filter((item) => item.amount >= min);
  }, [minAmount, transactions]);

  useEffect(() => {
    onFilter(filtered);
  }, [filtered, onFilter]);

  return (
    <div className="flex justify-center items-center gap-3">
      <IconContainer>
        <AmountIcon />
      </IconContainer>
      <div className="w-full">
        <InputNumber
          placeholder={t("pages.home.transferHistory.table.filters.byAmmount")}
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          leftItem={<span>$</span>}
        />
      </div>
    </div>
  );
};

export default AmountFilter;