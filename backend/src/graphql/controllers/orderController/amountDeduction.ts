import { AmountDeduction } from "../../../models";

export const percentageDeductions = async (amount: number, orderId: string) => {
  const deductionAmount = amount * 0.1;

  await AmountDeduction.build({
    amount: deductionAmount,
    orderId,
    status: "account",
  }).save();

  return amount - amount * 0.1;
};
