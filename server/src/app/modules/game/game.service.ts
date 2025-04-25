import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import { IGenericDataWithMeta } from '../../../interfaces/sharedInterface';
import {
  getPaginatedCondition,
  getPaginatedData,
  PaginationOptions,
} from '../../helpers/pagination';
// import { getPaginateddData } from '../../../shared/utilities';
import { GAME_SEARCH_FIELDS } from './game.constant';
import { GameFilters2, IUpdateGame } from './game.interface';
import GameModel from './game.model';
import { CategorySuggestion, CreateGame } from './game.validation';

const createGame = async (gameData: CreateGame): Promise<CreateGame> => {
  const isExistingGame = await GameModel.isExistingGame(gameData.title);
  if (isExistingGame)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Game with this title already exist',
    );

  const game = await GameModel.create(gameData);
  return game;
};

// const getAllGame = async (
//   paginationOption: IPaginationOption
// ): Promise<IGenericDataWithMeta<CreateGame[]>> => {
//   return getPaginateddData<CreateGame>(GameModel, paginationOption);
// };
const getAllGame = async (
  filters: GameFilters2,
  paginationOptions: PaginationOptions,
): Promise<IGenericDataWithMeta<CreateGame[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(filters, paginationOptions, GAME_SEARCH_FIELDS);

  const result = await GameModel.find(whereConditions)
    // .populate('academicSemester')
    // .populate('academicDepartment')
    // .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await GameModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const getGame = async (uid: string) => {
  const game = await GameModel.findOne({ uid });

  if (!game) throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  const resData = {
    data: game,
  };

  return resData;
};
const getCategories = async () => {
  const games = await GameModel.find({})
    .select({
      categories: 1,
      _id: 0,
    })
    .lean();
  if (!games) throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');

  const categoriesMixed = games
    .map(({ categories }) => categories)
    .flat()
    .map(({ value, label }) => ({ value, label }));

  const result: CategorySuggestion[] = [];

  categoriesMixed.forEach((item) => {
    if (!result.find((i) => i.value === item.value)) {
      result.push(item);
    }
  });

  return result;
};
const deleteGame = async (uid: string) => {
  const game = await GameModel.findOneAndDelete({ uid }).lean();

  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }

  const resData = {
    data: {},
    message: 'Game deleted.',
  };

  return resData;
};

const updateGame = async (
  id: string,
  payload: Partial<IUpdateGame>,
): Promise<IUpdateGame | null> => {
  const result = await GameModel.findByIdAndUpdate(id, payload, {
    new: true,
  }).lean();

  if (result) {
    return {
      ...result,
      _id: result._id.toString(),
    };
  }
  return null;
};
export const GameService = {
  createGame,
  getGame,
  getAllGame,
  getCategories,
  // getAllGame2,
  deleteGame,
  updateGame,
};
