import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { GameController } from './game.controller';
import { GameValidation } from './game.validation';
import { Role } from '../../../enums/role';

const router = express.Router();

router.post(
  '/',
  validateRequest(GameValidation.createGameZodSchema),
  auth(Role.OWNER, Role.ADMIN),
  GameController.createGame
);

router.get('/categories', GameController.getCategories);
router.get('/', GameController.getAllGame);
router.get('/:uid', GameController.getGame);

router.patch(
  '/',
  validateRequest(GameValidation.updateGameZodSchema),
  auth(Role.OWNER, Role.ADMIN),
  GameController.updateGame,
);

router.delete(
  '/:uid',
  auth(Role.OWNER, Role.ADMIN),
  GameController.deleteGame,
);

export default router;
