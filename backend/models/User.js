import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  password: String,
  role: { type: String, enum: ["admin", "manager", "member"], default: "member" },
  avatar_url: String,
}, { timestamps: true })

export default mongoose.model("User", userSchema)
