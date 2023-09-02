import express from 'express'
import Signup from '../controllers/auth/Signup';
const router = express.Router();

//routes
router.post('/signup', Signup);

export default router;