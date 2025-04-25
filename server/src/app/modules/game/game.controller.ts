import { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';

import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { PAGINATION_FIELDS } from '../../helpers/pagination';
import { GAME_FILTER_FIELDS } from './game.constant';
import { GameService } from './game.service';
import { CreateGame } from './game.validation';

const createGame = catchAsync(async (req: Request, res: Response) => {
  const game = await GameService.createGame(req.body);
  const responseData = {
    statusCode: httpStatus.CREATED,
    data: game,
    message: 'Game created successfully',
  };
  sendSuccessResponse(res, responseData);
});

// const getAllGame = catchAsync(async (req: Request, res: Response) => {
//   const paginationOption: IPaginationOption = pick(req.query, paginationFields);

//   const result = await GameService.getAllGame(paginationOption);

//   const responseData = {
//     statusCode: httpStatus.OK,
//     meta: result.meta || {},
//     data: result.data || [],
//     message: 'All games fetched successfully',
//   };

//   sendSuccessResponse<CreateGame[]>(res, responseData);
// });
const getAllGame = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, GAME_FILTER_FIELDS);
  const paginationOptions = pick(req.query, PAGINATION_FIELDS);

  const result = await GameService.getAllGame(filters, paginationOptions);

  sendSuccessResponse<CreateGame[]>(res, {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All games fetched successfully 2',
  });
});

const getGame = catchAsync(async (req: Request, res: Response) => {
  const result = await GameService.getGame(req.params.uid);

  const responseData = {
    statusCode: httpStatus.OK,
    data: result.data || {},
    message: 'Game fetched successfully',
  };

  sendSuccessResponse<CreateGame>(res, responseData);
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await GameService.getCategories();

  const responseData = {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Categories fetched successfully',
  };

  sendSuccessResponse<typeof result>(res, responseData);
});

const deleteGame = catchAsync(async (req: Request, res: Response) => {
  const responseData = await GameService.deleteGame(req.params.uid);

  sendSuccessResponse(res, responseData);
});

const updateGame = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedGame = await GameService.updateGame(id, req.body);
  
  const responseData = {
    statusCode: httpStatus.OK,
    data: updatedGame,
    message: 'Game updated successfully',
  };
  
  sendSuccessResponse(res, responseData);
});

export const GameController: { [key: string]: RequestHandler } = {
  createGame,
  getGame,
  getAllGame,
  getCategories,
  // getAllGame2,
  deleteGame,
  updateGame,
};
