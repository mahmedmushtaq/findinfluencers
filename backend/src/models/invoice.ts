import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";

interface InvoiceAttrs {
  userId: string;
  //   paymentIntentId: string;
  amount: number;
}

// an interface that describe
//the properties of the usermodel

interface InvoiceModel extends mongoose.Model<InvoiceDoc> {
  build(attrs: InvoiceAttrs): InvoiceDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

interface InvoiceDoc extends mongoose.Document, InvoiceAttrs {}

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    // paymentIntentId: {
    //   type: String,
    //   required: true,
    // },
    amount: {
      type: Number,
      required: true,
    },
  },
  transformMongooseResponse
);

invoiceSchema.statics.build = (attrs: InvoiceAttrs) => {
  return new Invoice(attrs);
};

const Invoice = mongoose.model<InvoiceDoc, InvoiceModel>(
  "invoice",
  invoiceSchema
);

export { Invoice };
