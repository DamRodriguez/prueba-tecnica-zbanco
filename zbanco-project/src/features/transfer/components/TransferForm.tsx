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
import useTransfer from "../../../components/redux/transfer/useTransfer";
import { useState } from "react";
import MotionStagger from "../../../components/motion/MotionStagger";
import AccountOption, { type AccountOptionData } from "../../../other/AccountOption";
import type { BaseOption } from "../../../components/ui/inputs/InputCombobox";

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
  const [isLoading, setIsLoading] = useState(false);
  const allAccounts = mapUsersToOptions(accountsData.users);

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedOrigin = methods.watch(TransferSchemaFieldNames.originAccount);
  const selectedDestination = methods.watch(TransferSchemaFieldNames.destinationAccount);

  const originOptions = allAccounts.filter(
    (acc) => acc.id !== selectedDestination?.id
  );
  const destinationOptions = allAccounts.filter(
    (acc) => acc.id !== selectedOrigin?.id
  );

  const onSubmit = async (data: TransferSchemaType) => {
    setIsLoading(true);
    setTimeout(() => {
      addTransfer(data.originAccount, data.destinationAccount, data.amountToTransfer);
      const destinationName = data.destinationAccount?.name;
      showToast("success", `${t("toast.transfer.success")} ${destinationName}`);
      methods.reset();
      setIsLoading(false)
    }, 2000);
  };

  const inputCommonProps = {
    error: apiErrorMessage !== undefined,
    errorMessage: apiErrorMessage,
  };

  const renderAccountOption = (option: BaseOption) => {
    const account = option as AccountOptionData;
    return <AccountOption option={account} />;
  };

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={onSubmit}
        methods={methods}
        className="flex flex-col justify-between gap-[3rem] h-full"
      >
        <MotionStagger className="flex flex-col gap-[1.5rem]">
          <Form.InputCombobox
            {...inputCommonProps}
            label={t("pages.home.transfer.labels.originAccount")}
            name={TransferSchemaFieldNames.originAccount}
            placeholder={t("pages.home.transfer.placeholders.selectAccount")}
            options={originOptions}
            renderOption={renderAccountOption}
          />
          <Form.InputCombobox
            {...inputCommonProps}
            label={t("pages.home.transfer.labels.destinationAccount")}
            name={TransferSchemaFieldNames.destinationAccount}
            placeholder={t("pages.home.transfer.placeholders.selectAccount")}
            options={destinationOptions}
            renderOption={renderAccountOption}
          />
          <Form.InputNumber
            {...inputCommonProps}
            label={t("pages.home.transfer.labels.amountToTransfer")}
            name={TransferSchemaFieldNames.amountToTransfer}
            placeholder={t("pages.home.transfer.placeholders.selectAmmount")}
            leftItem={<span>$</span>}
          />
        </MotionStagger>
        <Button
          variant="primary"
          type="submit"
          full
          isLoading={isLoading}
        >
          {t("pages.home.transfer.buttons.makeTransfer")}
        </Button>
      </Form>
    </FormProvider>
  );
};

export default TransferForm;
