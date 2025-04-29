
import express from 'express';

import {
    getAllProductsToCatalog
} from '../controllers/product.controller.js';

const productRouter = express.Router();
productRouter.get('/catalog', getAllProductsToCatalog);

export default productRouter;