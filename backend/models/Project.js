import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'on_hold', 'completed'],
      default: 'planning',
    },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const Project = mongoose.model('Project', projectSchema);

export default Project;
