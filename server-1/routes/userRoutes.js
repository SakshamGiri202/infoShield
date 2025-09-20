import express from 'express';
const router = express.Router();
import { getAllUsers } from '../controllers/userController.js';

router.get('/', getAllUsers);

export default router;
