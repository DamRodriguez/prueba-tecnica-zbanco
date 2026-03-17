import { useTranslation } from "react-i18next";
import BaseContainer from "../../../other/BaseContainer";
import TransferForm from "../../../features/transfer/components/TransferForm";

const TransferSection = () => {
  const { t } = useTranslation();
  return (
    <BaseContainer
      title={t("pages.home.transfer.title")}
    >
      <TransferForm />
    </BaseContainer>
  );
};

export default TransferSection;