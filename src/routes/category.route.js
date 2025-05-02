
import express from 'express';

import {
  getAllCategory,
  showCreateForm,
  saveCategory,
  showEditForm,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';

const categoryRouter = express.Router();
categoryRouter.get('/categories', getAllCategory);
categoryRouter.get('/categories/create', showCreateForm);
categoryRouter.post('/categories/create', saveCategory);
categoryRouter.get('/categories/edit/:id', showEditForm);
categoryRouter.post('/categories/edit/:id', updateCategory)
categoryRouter.get('/categories/delete/:id', deleteCategory);

export default categoryRouter;