import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
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
  },
  connection: {
    type: String,
    require: true,
    unique: false
  },
  profilePicture: {
    type: String,
    require: true,
    unique: false
  }
});

export default mongoose.model("User", userSchema);
