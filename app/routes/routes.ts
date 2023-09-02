import express from 'express';

import authRouter from '../routers/authRouter'
import userRouter from '../routers/userRouter'
import categoryRouter from '../routers/categoryRouter'
import bookRouter from '../routers/bookRouter'
import orderRouter from '../routers/orderRouter'

const router = express.Router();

const apiRoutes: { path: string, route: any }[] = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/users',
        route: userRouter,
    },
    {
        path: '/categories',
        route: categoryRouter,
    },
    {
        path: '/books',
        route: bookRouter,
    },
    {
        path: '/orders',
        route: orderRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;