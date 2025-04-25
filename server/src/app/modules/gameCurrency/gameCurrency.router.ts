import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import { GameCurrencyController } from './gameCurrency.controller';
import { GameCurrencyValidation } from './gameCurrency.validation';

const router = Router();

router.post(
  '/',
  auth(Role.ADMIN),
  validateRequest(GameCurrencyValidation.createGameCurrencyZodSchema),
  GameCurrencyController.createGameCurrency
);

router.get(
  '/',
  GameCurrencyController.getAllGameCurrencies
);

router.get(
  '/:id',
  GameCurrencyController.getGameCurrency
);

router.patch(
  '/:id',
  auth(Role.ADMIN),
  validateRequest(GameCurrencyValidation.updateGameCurrencyZodSchema),
  GameCurrencyController.updateGameCurrency
);

router.delete(
  '/:id',
  auth(Role.ADMIN),
  GameCurrencyController.deleteGameCurrency
);

router.get(
  '/suggestions',
  GameCurrencyController.tagSuggestions
);

export const gameCurrencyRoutes = router;
