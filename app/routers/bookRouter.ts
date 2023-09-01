import express from 'express'
const router = express.Router();

import CreateBook from '../controllers/book/CreateBook';

//routes
router.post('/', CreateBook);
// router.get('/:id', GetBook);
// router.get('/', GetBooks);
// router.patch('/:id', auth(), UpdateBook);
// router.delete('/:id', auth(), DeleteBook);

export default router;