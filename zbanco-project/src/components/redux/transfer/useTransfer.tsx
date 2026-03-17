import {
  addTransfer as addTransferAction,
} from "./transferSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { ComboboxOption } from "../../ui/inputs/InputCombobox";
import { useMemo } from "react";

const useTransfer = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.transfer);

  const transactions = state.transactions;

  const totalTransactions = transactions.length;

  const totalAmountTransferred = transactions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const mostActiveAccount = useMemo(() => {
    if (transactions.length === 0) return null;

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

  const addTransfer = (
    origin: ComboboxOption,
    destination: ComboboxOption,
    amount: string,
  ) => {
    dispatch(addTransferAction({ origin, destination, amount }));
  };

  return {
    addTransfer,
    transactions,
    totalTransactions,
    totalAmountTransferred,
    mostActiveAccount
  };
};

export default useTransfer;