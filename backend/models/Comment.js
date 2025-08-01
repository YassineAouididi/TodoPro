import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String
}, { timestamps: true })

export default mongoose.model("Comment", commentSchema)
