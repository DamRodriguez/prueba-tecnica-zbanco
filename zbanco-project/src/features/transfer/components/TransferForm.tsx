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
import { MotionOpacity } from "../../../components/motion/MotionOpacity";

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

  const allAccounts = mapUsersToOptions(accountsData.users);

  const selectedOrigin = methods.watch(TransferSchemaFieldNames.originAccount);
  const selectedDestination = methods.watch(TransferSchemaFieldNames.destinationAccount);

  const originOptions = allAccounts.filter(
    (acc) => acc.id !== selectedDestination?.id
  );

  const destinationOptions = allAccounts.filter(
    (acc) => acc.id !== selectedOrigin?.id
  );

  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={onSubmit}
        methods={methods}
        className="flex flex-col justify-between gap-[3rem] h-full"
      >
        <MotionStagger direction="left" className="flex flex-col gap-[1.5rem]">
          <Form.InputCombobox
            label={t("pages.home.transfer.labels.originAccount")}
            name={TransferSchemaFieldNames.originAccount}
            placeholder={t("pages.home.transfer.placeholders.selectAccount")}
            options={originOptions}
            error={apiErrorMessage !== undefined}
            errorMessage={apiErrorMessage}
            isLastErrorMessageField={false}
          />
          <Form.InputCombobox
            label={t("pages.home.transfer.labels.destinationAccount")}
            name={TransferSchemaFieldNames.destinationAccount}
            placeholder={t("pages.home.transfer.placeholders.selectAccount")}
            options={destinationOptions}
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
        </MotionStagger>
        <MotionOpacity>
          <Button
            variant="primary"
            type="submit"
            full
            isLoading={isLoading}
          >
            {t("pages.home.transfer.buttons.makeTransfer")}
          </Button>
        </MotionOpacity>
      </Form>
    </FormProvider>
  );
};

export default TransferForm;
