import express from 'express'
import GetUsers from '../controllers/user/GetUsers';
import auth from '../middlewares/auth';
import { ENUM_USER_ROLE } from '../../utils/constatnts';
const router = express.Router();

//routes
router.get('/', auth(ENUM_USER_ROLE.ADMIN), GetUsers);

export default router;