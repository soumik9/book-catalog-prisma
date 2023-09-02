import express from 'express'
import GetProfile from '../controllers/auth/GetProfile';
import auth from '../middlewares/auth';
import { ENUM_USER_ROLE } from '../../utils/constatnts';
const router = express.Router();

//routes
router.get('/', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER), GetProfile);

export default router;