import express from 'express'
import auth from '../middlewares/auth';
import { ENUM_USER_ROLE } from '../../utils/constatnts';
import GetBook from '../controllers/book/GetBook';
import GetBooks from '../controllers/book/GetBooks';
import CreateBook from '../controllers/book/CreateBook';
import UpdateBook from '../controllers/book/UpdateBook';
import DeleteBook from '../controllers/book/DeleteBook';
const router = express.Router();

//routes
router.get('/:id', GetBook);
router.get('/', GetBooks);
router.post('/create-book', auth(ENUM_USER_ROLE.ADMIN), CreateBook);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UpdateBook);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), DeleteBook);

export default router;