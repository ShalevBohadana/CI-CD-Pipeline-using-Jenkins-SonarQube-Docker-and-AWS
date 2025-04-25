/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface IExp {
  rating: number;
  exp: number;
}
export interface IExpModel extends Model<IExp> {
  findByRating(rating: number): Promise<IExp>;
}
