import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    member_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "member",
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Member = mongoose.model("Member", memberSchema);
export default Member;
