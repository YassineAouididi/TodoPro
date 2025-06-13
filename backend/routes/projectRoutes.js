import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Public/Private Routes
router
  .route('/')
  .get(authenticate, getAllProjects)                      // all authenticated users
  .post(authenticate, createProject); // only admin

router
  .route('/:id')
  .get(authenticate, getProjectById)                     // all authenticated users
  .put(authenticate, authorizeRoles('admin'), updateProject)   // only admin
  .delete(authenticate, authorizeRoles('admin'), deleteProject); // only admin

export default router;
