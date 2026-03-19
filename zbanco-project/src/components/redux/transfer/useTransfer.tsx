import {
  addTransfer as addTransferAction,
} from "./transferSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useMemo } from "react";
import type { MonthData } from "../../pages/dashboard/StackedBarChart/StackedBarChart";
import { useTranslation } from "react-i18next";
import type { AccountOptionData } from "../../../other/AccountOption";

const useTransfer = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.transfer);
  const { t, i18n } = useTranslation();

  const transactions = state.transactions;

  const totalTransactions = transactions.length;

  const totalAmountTransferred = transactions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const mostActiveAccount = useMemo(() => {
    const frequency: Record<string, number> = {};
    transactions.forEach((t) => {
      const id = t.originAccount.id;
      frequency[id] = (frequency[id] || 0) + 1;
    });

    const topId = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a])[0];

    const accountInfo = transactions.find(t => t.originAccount.id === topId)?.originAccount;

    return {
      name: accountInfo?.name,
      image: accountInfo?.image,
      count: frequency[topId]
    };
  }, [transactions]);

  const amountDistribution = useMemo(() => {
    let low = 0;
    let medium = 0;
    let high = 0;

    transactions.forEach((t) => {
      if (t.amount < 10) {
        low++;
      } else if (t.amount <= 100) {
        medium++;
      } else {
        high++;
      }
    });

    return [
      { name: t("pages.dashboard.sections.transferredAmounts.amountTypes.low"), value: low, color: "#94A3B8" },
      { name: t("pages.dashboard.sections.transferredAmounts.amountTypes.medium"), value: medium, color: "#3B82F6" },
      { name: t("pages.dashboard.sections.transferredAmounts.amountTypes.high"), value: high, color: "#1E3A8A" },
    ].filter(item => item.value > 0);
  }, [transactions, t]);

  const monthlyStatus: MonthData[] = useMemo(() => {
    const esMonthNames = [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun",
      "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ];
    const enMonthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const finalMonthNames = i18n.language === "es" ? esMonthNames : enMonthNames;

    if (!transactions || transactions.length === 0) {
      return [];
    }

    const currentYear = new Date().getFullYear();

    const counts: Record<string, number> = {};
    finalMonthNames.forEach(name => { counts[name] = 0; });

    transactions.forEach((t) => {
      const transactionDate = new Date(t.date);

      if (transactionDate.getFullYear() === currentYear) {
        const monthName = finalMonthNames[transactionDate.getMonth()];
        counts[monthName] += 1;
      }
    });

    return finalMonthNames.map(name => ({
      name,
      value: counts[name]
    }));
  }, [transactions, i18n.language]);

  const addTransfer = (
    origin: AccountOptionData,
    destination: AccountOptionData,
    amount: string,
  ) => {
    dispatch(addTransferAction({ origin, destination, amount }));
  };

  return {
    addTransfer,
    transactions,
    totalTransactions,
    totalAmountTransferred,
    mostActiveAccount,
    amountDistribution,
    monthlyStatus
  };
};

export default useTransfer;