import { z } from "zod";

const noSelectAccount = "pages.home.transfer.formErrors.noSelectAccount";
const noSelectAmount = "pages.home.transfer.formErrors.noSelectAmmount";
const insufficientFunds = "pages.home.transfer.formErrors.insufficientFunds";
const greaterThan0 = "pages.home.transfer.formErrors.greaterThan0";

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
  .superRefine((data, ctx) => {
    const amount = Number(data.amountToTransfer);

    if (amount === 0) {
      ctx.addIssue({
        code: "custom",
        message: greaterThan0,
        path: ["amountToTransfer"],
      });
    }

    if (data.originAccount) {
      const balance = Number(data.originAccount.balance);

      if (amount > balance) {
        ctx.addIssue({
          code: "custom",
          message: insufficientFunds,
          path: ["amountToTransfer"],
        });
      }
    }
  });

export const TransferSchemaFieldNames = TransferSchema.keyof().enum;

export type TransferSchemaType = z.infer<typeof TransferSchema>;