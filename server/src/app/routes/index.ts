import express from 'express';
import { AdminRoute } from '../modules/admin/admin.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.route';
import GameRoutes from '../modules/game/game.route';
import { OrderRoute } from '../modules/order/order.route';
import { OrderReviewRouter } from '../modules/orderReview/orderReview.route';
import { TicketRouter } from '../modules/ticket/ticket.route';
import UserRoutes from '../modules/user/user.route';
import { walletRouter } from '../modules/wallet/wallet.route';
import { WithdrawRoute } from '../modules/withdraw/withdraw.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/admin',
    route: AdminRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/game',
    route: GameRoutes,
  },
  {
    path: '/order',
    route: OrderRoute,
  },
  {
    path: '/review',
    route: OrderReviewRouter,
  },
  {
    path: '/ticket',
    route: TicketRouter,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/wallet',
    route: walletRouter,
  },
  {
    path: '/withdraw',
    route: WithdrawRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
