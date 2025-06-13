import mongoose from 'mongoose';


const projectMemberSchema = new mongoose.Schema({
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  role: { type: String, enum: ["owner", "editor", "viewer"], default: "viewer" }
}, { timestamps: true })

export default mongoose.model("ProjectMember", projectMemberSchema)
