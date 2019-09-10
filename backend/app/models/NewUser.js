import mongoose from "mongoose";

const newUserSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  platform: {
    type: String,
    required: true,
    unique: false
  },
  params: {
    type: Object,
    required: true,
    unique: true
  }
});

export default mongoose.model("NewUser", newUserSchema);
