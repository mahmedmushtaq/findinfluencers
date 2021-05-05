import { Order, Amount, Escrow, User, Invoice } from "../../models";
import { EscrowStatus } from "../../models/escrow";
import { OrderStatus, OrderDoc } from "../../models/order";
import { contextType } from "../../types/apolloContextType";
import { createPaymentIntent, stripe } from "../../utils/stripe";
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

  const userAmount = await Amount.findOne({ userId: context.user.id });
  if (userAmount) {
    amount = userAmount.amount;
    billed = userAmount.billed;
  }

  return {
    escrows,
    amount,
    billed,
  };
};

export const setPaymentIntent = async (
  context: contextType,
  order: OrderDoc
) => {
  try {
    const amount = order.amount * 100;
    const user = await User.findById(context.user.id);
    if (!user) return user;

    if (!user.stripe_customer) {
      try {
        const description = `User ${context.user.email} add amount in escrow`;
        const { id: stripe_customer } = await stripe.customers.create({
          description, //"Added Amount In Escrow",
          // email: context.user.email,
        });
        user.stripe_customer = stripe_customer;
        await user.save();
      } catch (e) {
        throw e;
      }
    }

    // get payment method ( mean, visa, master) and get those payment method id to get
    // List the customer's payment methods to find one to charge
    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripe_customer,
      type: "card",
    });

    const isPaymentMethodPresent = !!paymentMethods.data[0];

    const paymentIntent = await createPaymentIntent({
      amount: amount, // convert into cents
      customer: user.stripe_customer,
      // if users is already saved their card then charge them
      payment_method_id: isPaymentMethodPresent
        ? paymentMethods.data[0].id
        : undefined,
      confirm: !!isPaymentMethodPresent,
    });

    console.log("paymentItnent is  = ", paymentIntent);
    console.log("paymentItnent is  = ", paymentIntent.charges);

    let paymentIsAlreadyDone = false;
    if (
      isPaymentMethodPresent &&
      paymentIntent.charges.data[0].status === "succeeded"
    ) {
      // if payment Method is Present then it is mean that payment is already done and received
      const chargeId = paymentIntent.charges.data[0].id;
      const receipt_url = paymentIntent.charges.data[0].receipt_url;

      paymentIsAlreadyDone = true;
      order.chargeId = chargeId;
      order.status = OrderStatus.needs_approval;
      createInvoice(order!.ownerId!, paymentIntent.amount / 100); // convert from cents
      await order.save();
    }

    const { client_secret, id } = paymentIntent;
    if (id && client_secret) {
      return {
        client_secret,
        id,
        paymentIsAlreadyDone,
      };
    }
  } catch (err) {
    throw err;
  }
};

export const savePaymentIntent = async (input: any, context: contextType) => {
  const { orderId, stripe_payment_intent_id } = input;
  const paymentIntent = await stripe.paymentIntents.retrieve(
    stripe_payment_intent_id
  );

  const order = await Order.findById(orderId);
  if (paymentIntent.status !== "succeeded") return order;

  const chargeId = paymentIntent.charges.data[0].id;
  const receipt_url = paymentIntent.charges.data[0].receipt_url;

  order!.chargeId = chargeId;
  order!.status = OrderStatus.needs_approval;
  order!.amount = paymentIntent.amount / 100; //
  createInvoice(order!.ownerId!, paymentIntent.amount / 100);
  await order?.save();
  return order;
};

const createInvoice = async (userId: string, amount: number) => {
  await Invoice.build({ userId, amount }).save();
};

export const refundAmount = async (chargeId: string) => {
  const refund = await stripe.refunds.create({
    charge: chargeId,
  });
  console.log("refund amount is = ", refund);
  return refund;
};
