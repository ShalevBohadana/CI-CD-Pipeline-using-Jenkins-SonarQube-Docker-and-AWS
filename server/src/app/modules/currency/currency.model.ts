import { model, Schema } from 'mongoose';

import { ICurrency, ICurrencyModel } from './currency.interface';

const currencySchema = new Schema<ICurrency>(
  {
    base: {
      type: String,
      required: true,
    },
    rates: {
      type: Object,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

currencySchema.statics.isExistCurrency =
  async function (): Promise<ICurrency | null> {
    const currency = await this.findOne();
    return currency;
  };

const CurrencyModel = model<ICurrency, ICurrencyModel>(
  'Currency',
  currencySchema,
);
export default CurrencyModel;
