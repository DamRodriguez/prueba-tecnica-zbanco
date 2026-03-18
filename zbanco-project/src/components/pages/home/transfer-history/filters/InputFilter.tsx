import { useMemo, useState, useEffect } from "react";
import Input from "../../../../ui/inputs/input/Input";
import type { Transaction } from "../../../../redux/transfer/transferSlice";
import { useTranslation } from "react-i18next";

type InputFilterProps = {
  transactions: Transaction[];
  onFilter: (data: Transaction[]) => void;
}

const InputFilter = ({ transactions, onFilter }: InputFilterProps) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return transactions;

    return transactions.filter((item) =>
      item.originAccount.name.toLowerCase().includes(term) ||
      item.destinationAccount.name.toLowerCase().includes(term)
    );
  }, [searchTerm, transactions]);

  useEffect(() => {
    onFilter(filteredTransactions);
  }, [filteredTransactions, onFilter]);

  return (
    <div className="mb-4">
      <Input
        placeholder={t("pages.home.transferHistory.table.filters.byAccount")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default InputFilter;