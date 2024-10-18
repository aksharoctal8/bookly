import express from 'express';
import User from './User/_router.js';

const router = express.Router();

router.use('/', User);

export default router;
