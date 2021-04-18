import { Amount, Escrow } from "../../models";
import { EscrowStatus } from "../../models/escrow";
import { contextType } from "../../types/apolloContextType";
import { currentDateDifference } from "../../utils/utils";

const updateAmount = async (escrow: any) => {
  let ownerAmount = await Amount.findOne({
    userId: escrow.ownerId.id,
  });
  if (!ownerAmount) {
    ownerAmount = Amount.build({
      userId: escrow.ownerId.id,
      amount: 0,
      billed: 0,
    });
  }

  ownerAmount.amount = ownerAmount.amount + escrow.orderId.amount!;

  await ownerAmount?.save();

  // for workingUser

  let workingUserAmount = await Amount.findOne({
    //@ts-ignore
    userId: escrow.workingUserId._id,
  });
  if (!workingUserAmount) {
    workingUserAmount = Amount.build({
      //@ts-ignore
      userId: escrow.workingUserId._id,
      amount: 0,
      billed: 0,
    });
  }

  workingUserAmount.amount = workingUserAmount.amount + escrow.orderId.amount!; //@ts-ignore

  await workingUserAmount?.save();
};

export const escrowController = async (context: contextType) => {
  const escrowsDoc = await Escrow.find({
    $and: [
      {
        $or: [{ ownerId: context.user.id }, { workingUserId: context.user.id }],
      },
      {
        $or: [
          { status: EscrowStatus.company_holds },
          { status: EscrowStatus.company_holds_for_five_days },
        ],
      },
    ],
  })
    .populate("ownerId", "id email full_name")
    .populate("workingUserId", "id email full_name")
    .populate("orderId");

  // check escrow time is completed or not

  const escrowsMap = escrowsDoc.map(async (escrow) => {
    if (escrow.status === EscrowStatus.company_holds_for_five_days) {
      const date = currentDateDifference(escrow.updatedAt) / 1000;
      const fiveDaysMillisecond = 5 * 24 * 60 * 60; //432000;

      if (date <= fiveDaysMillisecond) return escrow;

      // const update Escrow status

      await updateAmount(escrow);

      escrow.status = EscrowStatus.paid;
      await escrow.save();
    }
    return escrow;
  });

  const escrows = await Promise.all(escrowsMap);
  let amount = 0,
    billed = 0;

  console.log(escrows);

  const userAmount = await Amount.findOne({ userId: context.user.id });
  if (userAmount) {
    amount = userAmount.amount;
    billed = userAmount.billed;
  }

  console.log("escrows ", escrows);

  return {
    escrows,
    amount,
    billed,
  };
};
