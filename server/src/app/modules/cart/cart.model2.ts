// import mongoose, { Model, Schema } from 'mongoose';

// // Define a base interface for all types
// type CartItem2 = {
//   type: string;
// };

// // Define the sub-types extending the base interface
// type RegularItem = CartItem2 & {
//   breed: string;
// };

// type CurrencyItem = CartItem2 & {
//   color: string;
// };

// // Define the Mongoose schemas for each sub-type
// const RegularSchema = new Schema<RegularItem>({
//   type: { type: String, default: 'regular' },
//   breed: { type: String, required: true },
// });

// const CurrencySchema = new Schema<CurrencyItem>({
//   type: { type: String, default: 'currency' },
//   color: { type: String, required: true },
// });

// // Define the Discriminator Key
// const CartSchema2 = new Schema<CartItem2>(
//   {
//     type: { type: String, required: true },
//   },
//   { discriminatorKey: 'type' }
// );

// // Define the model as a union of the sub-types
// const CartModel2: Model<CartItem2> = mongoose.model<CartItem2>(
//   'Cart2',
//   CartSchema2
// );
// const RegularModel = CartModel2.discriminator<RegularItem>(
//   'regular',
//   RegularSchema
// );
// const CurrencyModel = CartModel2.discriminator<CurrencyItem>(
//   'currency',
//   CurrencySchema
// );

// // Usage
// const regular = new RegularModel({ breed: 'Labrador' });
// const currency = new CurrencyModel({ color: 'White' });

// regular.save();
// currency.save();
