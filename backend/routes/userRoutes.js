import express from 'express'
import { authenticate } from '../middlewares/authMiddleware.js'
import { authorizeRoles } from '../middlewares/roleMiddleware.js'
import { getAllUsers, updateUser, createUser, deleteUser } from '../controllers/userController.js'
import { body } from 'express-validator'

const router = express.Router()

router.get('/', authenticate, authorizeRoles('admin'), getAllUsers)

router.post(
  '/',
  authenticate,
  authorizeRoles('admin'),
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').isIn(['admin', 'member']).withMessage('Invalid role'),
  ],
  createUser
)

router.put(
  '/:id/role',
  authenticate,
  authorizeRoles('admin'),
  [body('role').isIn(['admin', 'member']).withMessage('Invalid role')],
  updateUser
)

router.delete('/:id', authenticate, authorizeRoles('admin'), deleteUser)

export default router
