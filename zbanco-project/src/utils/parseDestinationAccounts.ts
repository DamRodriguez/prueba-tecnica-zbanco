import type { ComboboxOption } from "../components/ui/inputs/InputCombobox";

export const parseDestinationAccounts = (accounts: ComboboxOption[]): ComboboxOption[] => {
  return accounts.map(acc => ({
    ...acc,
    balance: undefined,
  }));
};