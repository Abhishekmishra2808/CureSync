import express from 'express';
import { registerNewPatient } from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerNewPatient);

export default router;