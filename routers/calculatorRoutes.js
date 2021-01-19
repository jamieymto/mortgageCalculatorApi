import express from 'express';

import { asyncify } from '../utils/asyncify.js';
import calculatorController from '../controllers/calculatorController.js';

const calculatorRoutes = express.Router();

calculatorRoutes.post('/v1/calculator', asyncify(calculatorController.calculate));

export default calculatorRoutes;