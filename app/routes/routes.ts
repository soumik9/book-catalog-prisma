import express from 'express';

import bookRouter from '../routers/bookRouter'

const router = express.Router();

const apiRoutes: { path: string, route: any }[] = [
    {
        path: '/book',
        route: bookRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;