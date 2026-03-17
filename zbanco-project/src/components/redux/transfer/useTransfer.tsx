import {
  addTransfer as addTransferAction,
} from "./transferSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { ComboboxOption } from "../../ui/inputs/InputCombobox";

const useTransfer = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.transfer);

  const transactions = state.transactions;

  const totalTransactions = transactions.length;

  const totalAmountTransferred = transactions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

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
    totalAmountTransferred
  };
};

export default useTransfer;