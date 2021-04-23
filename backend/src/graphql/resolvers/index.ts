import platformResolver from "./platform";
import userResolver from "./user";
import categoryResolver from "./category";
import profileResolver from "./profile";
import settingsResolver from "./settings";
import orderResolver from "./order";
import escrowResolver from "./escrow";
import amountResolver from "./amount";
import notificationResolver from "./notification";
import withdrawlResolver from "./withdrawl";

export default [
  userResolver,
  platformResolver,
  categoryResolver,
  profileResolver,
  settingsResolver,
  orderResolver,
  escrowResolver,
  amountResolver,
  notificationResolver,
  withdrawlResolver,
];
