import express from "express"
import {
  getCommentsByTaskId,
  createComment,
  deleteComment
} from "../controllers/commentController.js"

import { authenticate } from "../middlewares/authMiddleware.js"
import { authorizeRoles } from "../middlewares/roleMiddleware.js"

const router = express.Router()

router.get("/task/:taskId", authenticate, getCommentsByTaskId)
router.post("/task/:taskId", authenticate, createComment)
router.delete("/:id", authenticate, authorizeRoles("admin", "manager"), deleteComment)

export default router
