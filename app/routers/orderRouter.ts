import express from 'express'
import auth from '../middlewares/auth';
import { ENUM_USER_ROLE } from '../../utils/constatnts';
import createOrder from '../controllers/order/CreateOrder';
import GetOrders from '../controllers/order/GetOrders';
import GetOrder from '../controllers/order/GetOrder';
const router = express.Router();

//routes

router.get('/:orderId', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER), GetOrder);
router.get('/', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER), GetOrders);
router.post('/create-order', auth(ENUM_USER_ROLE.CUSTOMER), createOrder);


export default router;