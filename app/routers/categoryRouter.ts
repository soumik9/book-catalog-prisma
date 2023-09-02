import express from 'express'
import auth from '../middlewares/auth';
import { ENUM_USER_ROLE } from '../../utils/constatnts';
import GetCategory from '../controllers/category/GetCategory';
import GetCategories from '../controllers/category/GetCategories';
import UpdateCategory from '../controllers/category/UpdateCategory';
import DeleteCategory from '../controllers/category/DeleteCategory';
import CreateCategory from '../controllers/category/CreateCategory';
const router = express.Router();

//routes
router.get('/:id', GetCategory);
router.get('/', GetCategories);
router.post('/create-category', auth(ENUM_USER_ROLE.ADMIN), CreateCategory);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UpdateCategory);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), DeleteCategory);

export default router;