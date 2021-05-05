import { ApolloError } from "apollo-server-errors";
import { Escrow, Order, User } from "../../../models";
import { EscrowStatus } from "../../../models/escrow";
import { OrderStatus } from "../../../models/order";
import { contextType } from "../../../types/apolloContextType";
import { refundAmount } from "../escrowController";
import { sendNotification } from "../notification";

const addAmountInEscrow = async (order: any, context: contextType) => {
  const escrow = await Escrow.build({
    orderId: order.id,
    status: EscrowStatus.company_holds,
    ownerId: order.ownerId,
    workingUserId: order.workingUserId,
  });
  await escrow.save();
  // deduct and add amount in escorw

  const user = await User.findById(context.user.id);

  await sendNotification(
    context.user.id,
    order.ownerId.toString(),
    `${user?.full_name} starts working`,
    `orders/${order.id}`
  );

  return true;
};

export const orderStatusControllerInfluencer = async (
  input: any,
  context: contextType
) => {
  const { orderId, status } = input;
  const order = await Order.findOne({
    workingUserId: context.user.id,
    _id: orderId,
  });
  if (!order) return {};

  if (order.status === status) {
    return order;
  }

  // status proceedures
  if (status === OrderStatus.working) {
    if (order.status === OrderStatus.rejected) {
      throw new ApolloError("You have already rejected the order");
    }

    const isAmountAdded = await addAmountInEscrow(order, context);
    if (!isAmountAdded) {
      throw new ApolloError(
        "User has not enough money. Contact our team about this issue"
      );
    }
  } else if (status === OrderStatus.rejected) {
    if (order.status === OrderStatus.working) {
      throw new ApolloError("You have already accepted the order");
    }
    // return amount to user again
    await refundAmount(order!.chargeId!);
    // ========
  } else if (status === OrderStatus.cancelled) {
    if (
      order.status === OrderStatus.working ||
      order.status === OrderStatus.submit_for_payment
    ) {
      throw new ApolloError(
        "You cannot Cancel Running Contract. Kindly Contact Our Team For This Problem"
      );
    }
  }

  order.status = status;
  await order.save();

  // send notification
  // deduct amount from a particular user card

  return order;
};

export const orderStatusControllerBuyer = async (
  input: any,
  context: contextType
) => {
  const { orderId, status } = input;
  const order = await Order.findOne({
    ownerId: context.user.id,
    _id: orderId,
  });
  if (!order) return {};

  order.status = status;
  await order.save();

  if (order.status === OrderStatus.completed) {
    // sent notification to the user that his amount will added to his account after 5 days
    const escrow = await Escrow.findOne({ orderId: order.id });
    if (escrow) {
      escrow.status = EscrowStatus.company_holds_for_five_days;
      await escrow?.save();
    }
  }

  // send notification
  // deduct amount from a particular user card

  return order;
};
