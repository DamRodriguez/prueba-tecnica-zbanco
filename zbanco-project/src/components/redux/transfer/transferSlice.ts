import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AccountOptionData } from "../../../other/AccountOption";

export interface Transaction {
  id: string;
  originAccount: AccountOptionData;
  destinationAccount: AccountOptionData;
  amount: number;
  date: string;
}

interface TransferState {
  transactions: Transaction[];
}

const initialState: TransferState = {
  transactions: [],
};

const transferSlice = createSlice({
  name: "transfers",
  initialState,
  reducers: {
    addTransfer: (
      state,
      action: PayloadAction<{
        origin: AccountOptionData;
        destination: AccountOptionData;
        amount: string;
      }>
    ) => {
      const newTransaction: Transaction = {
        id: crypto.randomUUID(),
        originAccount: action.payload.origin,
        destinationAccount: action.payload.destination,
        amount: parseFloat(action.payload.amount),
        date: new Date().toISOString(),
      };
      state.transactions.push(newTransaction);
    },
  },
});

export const { addTransfer } = transferSlice.actions;

export default transferSlice.reducer;