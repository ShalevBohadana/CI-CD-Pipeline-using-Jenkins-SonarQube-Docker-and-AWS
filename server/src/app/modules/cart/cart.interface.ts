/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

import { Cart } from './cart.validation';

// export interface IServiceItem {
//   serviceId: Types.ObjectId;
//   executionOption: {
//     title: string;
//     price: number;
//   };
//   additionalOption: {
//     title: string;
//     price: number;
//   };
// }

// export type ICart = {
//   userId: Types.ObjectId;
//   items: CartItem[];
// };

export type ICartModel = Model<Cart>;
