import express from 'express';
import documentRoute from './documentRoute.js';

const router = express.Router();

router.use('/', documentRoute);

export default router;