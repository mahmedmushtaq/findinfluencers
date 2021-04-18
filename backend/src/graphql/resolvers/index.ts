import platformResolver from "./platform";
import userResolver from "./user";
import categoryResolver from "./category";
import profileResolver from "./profile";
import settingsResolver from "./settings";
import orderResolver from "./order";
import escrowResolver from "./escrow";
import amountResolver from "./amount";
import notificationResolver from "./notification";

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
];
