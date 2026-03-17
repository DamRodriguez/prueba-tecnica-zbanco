import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import useFormError from "../../../hooks/useFormError";
import Form from "../../../components/ui/form/Form";
import { useTranslation } from "react-i18next";
import { TransferSchema, TransferSchemaFieldNames, type TransferSchemaType } from "../schemas/TransferSchema";
import accountsData from "../../../data/accounts.json";
import { mapUsersToOptions } from "../../../utils/mapUsersToOptions";
import Button from "../../../components/ui/buttons/Button";
import showToast from "../../../components/toast/showToast";
import { parseDestinationAccounts } from "../../../utils/parseDestinationAccounts";
import useTransfer from "../../../components/redux/transfer/useTransfer";
import { useState } from "react";

const TransferForm = () => {
  const { t } = useTranslation();
  const { addTransfer } = useTransfer();
  const methods = useForm<TransferSchemaType>({
    defaultValues: {
      originAccount: undefined,
      destinationAccount: undefined,
      amountToTransfer: ""
    },
    resolver: zodResolver(TransferSchema),
    mode: "onSubmit",
    criteriaMode: "all",
    shouldFocusError: false,
    reValidateMode: "onSubmit",
  });
  const { apiErrorMessage } = useFormError(methods.formState);

  const users = accountsData.users;
  const allAccounts = mapUsersToOptions(users);
  const mainOriginAccountId = "a1";
  const otherOriginAccountId = "a2";
  const destinationAccounts = allAccounts.filter(
    a => a.id !== mainOriginAccountId && a.id !== otherOriginAccountId
  );
  const originAccountOptions = allAccounts.filter(
    a =>
      (a.id === mainOriginAccountId || a.id === otherOriginAccountId)
  );

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: TransferSchemaType) => {
    setIsLoading(true);
    setTimeout(() => {
      addTransfer(data.originAccount, data.destinationAccount, data.amountToTransfer);
      const destinationName = data.destinationAccount?.name;
      showToast("success", `${t("toast.transfer.success")} ${destinationName}`);
      // methods.reset();
      setIsLoading(false)
    }, 2000);
  };

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={onSubmit}
        methods={methods}
        className="flex flex-col gap-[1.5rem]"
      >
        <div className="flex flex-col gap-[1.5rem]">
          <Form.InputCombobox
            label={t("pages.home.transfer.labels.originAccount")}
            name={TransferSchemaFieldNames.originAccount}
            placeholder={t("pages.home.transfer.placeholders.selectAccount")}
            options={originAccountOptions}
            error={apiErrorMessage !== undefined}
            errorMessage={apiErrorMessage}
            isLastErrorMessageField={false}
          />
          <Form.InputCombobox
            label={t("pages.home.transfer.labels.destinationAccount")}
            name={TransferSchemaFieldNames.destinationAccount}
            placeholder={t("pages.home.transfer.placeholders.selectAccount")}
            options={parseDestinationAccounts(destinationAccounts)}
            error={apiErrorMessage !== undefined}
            errorMessage={apiErrorMessage}
            isLastErrorMessageField={false}
          />
          <Form.InputNumber
            label={t("pages.home.transfer.labels.amountToTransfer")}
            name={TransferSchemaFieldNames.amountToTransfer}
            placeholder={t("pages.home.transfer.placeholders.selectAmmount")}
            error={apiErrorMessage !== undefined}
            errorMessage={apiErrorMessage}
            leftItem={<span>$</span>}
            isLastErrorMessageField={false}
          />
        </div>
        <Button
          variant="primary"
          type="submit"
          isLoading={isLoading}
        >
          {t("pages.home.transfer.buttons.makeTransfer")}
        </Button>
      </Form>
    </FormProvider>
  );
};

export default TransferForm;
