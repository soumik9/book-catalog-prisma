import express from 'express';

import authRouter from '../routers/authRouter'
import userRouter from '../routers/userRouter'

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
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;