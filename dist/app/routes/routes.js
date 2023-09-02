"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("../routers/authRouter"));
const profileRouter_1 = __importDefault(require("../routers/profileRouter"));
const userRouter_1 = __importDefault(require("../routers/userRouter"));
const categoryRouter_1 = __importDefault(require("../routers/categoryRouter"));
const bookRouter_1 = __importDefault(require("../routers/bookRouter"));
const orderRouter_1 = __importDefault(require("../routers/orderRouter"));
const router = express_1.default.Router();
const apiRoutes = [
    {
        path: '/auth',
        route: authRouter_1.default,
    },
    {
        path: '/profile',
        route: profileRouter_1.default,
    },
    {
        path: '/users',
        route: userRouter_1.default,
    },
    {
        path: '/categories',
        route: categoryRouter_1.default,
    },
    {
        path: '/books',
        route: bookRouter_1.default,
    },
    {
        path: '/orders',
        route: orderRouter_1.default,
    },
];
apiRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
