import { model, Schema } from 'mongoose';

import { IGameModel } from './game.interface';
import {
  CategorySuggestion,
  CreateGame,
  GAME_STATUS,
  GameSlider,
  GameUpsell,
} from './game.validation';

export const categorySuggestionSchema = new Schema<CategorySuggestion>(
  {
    value: { type: String || Number || Symbol || null, required: true },
    label: { type: String, required: true },
  },
  {
    _id: false,
  },
);

const gameSchema = new Schema<CreateGame>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    bannerUrl: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    showInMenu: {
      type: Boolean,
      required: true,
    },
    isFeatured: {
      type: Boolean,
    },
    status: {
      type: String,
      enum: Object.values(GAME_STATUS),
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    upsell: new Schema<GameUpsell>({
      title: { type: String },
      imageUrl: { type: String },
      description: { type: String },
    }),
    // 'upsell:title': {
    //   type: String,
    // },
    // 'upsell:description': {
    //   type: String,
    // },
    // 'upsell:imageUrl': {
    //   type: String,
    // },
    sliders: [
      new Schema<GameSlider>({
        createdAt: { type: Date, required: true },
        heading: { type: String, required: true },
        imageUrl: { type: String, required: true },
        videoUrl: { type: String },
      }),
    ],
    categories: [categorySuggestionSchema],
  },
  { timestamps: true },
);

gameSchema.statics.isExistingGame = async function (
  title: string,
): Promise<CreateGame | null> {
  const game = GameModel.findOne({ title });
  return game;
};

const GameModel = model<CreateGame, IGameModel>('Game', gameSchema);
export default GameModel;
