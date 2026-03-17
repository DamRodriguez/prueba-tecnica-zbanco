import type { ComboboxOption } from "../components/ui/inputs/InputCombobox";

type Account = {
  id: string;
  accountType: string;
  accountNumber: string;
  balance: string;
};

type User = {
  id: string;
  name: string;
  image: string;
  accounts: Account[];
};

export const mapUsersToOptions = (users: User[]): ComboboxOption[] => {
  return users.flatMap((user) =>
    user.accounts.map((acc) => ({
      id: acc.id,
      name: user.name,
      image: user.image,
      accountType: acc.accountType,
      accountNumber: acc.accountNumber,
      balance: acc.balance,
    }))
  );
};