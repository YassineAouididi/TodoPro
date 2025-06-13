import Comment from "../models/Comment.js"

export const createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body)
    await comment.save()
    res.status(201).json(comment)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getCommentsByTaskId = async (req, res) => {
  try {
    const comments = await Comment.find({ taskId: req.params.taskId }).populate("authorId", "name")
    res.json(comments)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id)
    res.json({ message: "Comment deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}