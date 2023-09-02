import express from 'express'
import Signup from '../controllers/auth/Signup';
import Signin from '../controllers/auth/Signin';
const router = express.Router();

//routes
router.post('/signin', Signin);
router.post('/signup', Signup);

export default router;