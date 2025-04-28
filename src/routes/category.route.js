
import express from 'express';

import {
  getAllCategory
} from '../controllers/category.controller.js';

const categoryRouter = express.Router();
categoryRouter.get('/categories', getAllCategory);

export default categoryRouter;