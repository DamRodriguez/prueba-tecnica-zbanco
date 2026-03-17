import { z } from "zod";

const noSelectAccount = "pages.home.transfer.formErrors.noSelectAccount";
const noSelectAmount = "pages.home.transfer.formErrors.noSelectAmmount";
const insufficientFunds = "pages.home.transfer.formErrors.insufficientFunds";

export const TransferSchema = z
  .object({
    originAccount: z
      .any()
      .refine((val) => val !== undefined && val !== null, {
        message: noSelectAccount,
      }),
    destinationAccount: z
      .any()
      .refine((val) => val !== undefined && val !== null, {
        message: noSelectAccount,
      }),
    amountToTransfer: z
      .string()
      .min(1, { message: noSelectAmount })
  })
  .refine(
    (data) => {
      const balance = Number(data.originAccount?.balance);
      const amount = Number(data.amountToTransfer);

      if (!data.originAccount) return true;

      return amount <= balance;
    },
    {
      message: insufficientFunds,
      path: ["amountToTransfer"],
    }
  );

export const TransferSchemaFieldNames = {
  originAccount: "originAccount",
  destinationAccount: "destinationAccount",
  amountToTransfer: "amountToTransfer",
} as const;

export type TransferSchemaType = z.infer<typeof TransferSchema>;