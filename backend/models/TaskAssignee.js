import mongoose from 'mongoose';



const taskAssigneeSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true })

export default mongoose.model("TaskAssignee", taskAssigneeSchema)
