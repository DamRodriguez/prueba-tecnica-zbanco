import { useTranslation } from "react-i18next";
import { formatMoney } from "../utils/formatMoney";

export type AccountOptionData = {
  id: string;
  image: string;
  name: string;
  accountType: string;
  accountNumber: string;
  balance: string | undefined;
};

type AccountOptionProps = {
  option: AccountOptionData
}

const AccountOption = ({ option }: AccountOptionProps) => {
  const { t } = useTranslation();

  const accountType =
    option.accountType === "checking"
      ? t("pages.home.transfer.accountTypes.CheckingAccount")
      : t("pages.home.transfer.accountTypes.SavingsAccount");

  return (
    <div className="flex items-center gap-3 sm:gap-4 cursor-pointer">
      <img
        src={option.image}
        alt={`Image of ${option.name}`}
        className="w-8 sm:w-10 rounded-full aspect-square"
      />

      <div className="flex flex-col items-start">
        <span className="text-sm sm:text-lg text-black font-semibold">
          {option.name}
        </span>

        <div className="text-xs text-medium-gray text-start">
          {accountType} • {option.accountNumber} {" "}
          {option.balance && (
            <>
              • {formatMoney(option.balance)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountOption;