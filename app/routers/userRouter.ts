import express from 'express'
import GetUsers from '../controllers/user/GetUsers';
import auth from '../middlewares/auth';
import { ENUM_USER_ROLE } from '../../utils/constatnts';
import GetUser from '../controllers/user/GetUser';
import UpdateUser from '../controllers/user/UpdateUser';
const router = express.Router();

//routes
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), GetUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), GetUsers);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UpdateUser);

export default router;