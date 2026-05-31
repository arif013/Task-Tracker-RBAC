import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    createdBy: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      role: {
        type: String,
        enum: ["admin", "manager"],
        default: "manager",
        required: true,
      },
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model("project", projectSchema);
export default Project;
