import express from 'express'
import auth from '../middlewares/auth';
import { ENUM_USER_ROLE } from '../../utils/constatnts';
import createOrder from '../controllers/order/CreateOrder';
import GetOrders from '../controllers/order/GetOrders';
const router = express.Router();

//routes

router.get('/', auth(ENUM_USER_ROLE.ADMIN), GetOrders);
router.post('/create-order', auth(ENUM_USER_ROLE.CUSTOMER), createOrder);


export default router;