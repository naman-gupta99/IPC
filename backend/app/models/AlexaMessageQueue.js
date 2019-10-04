import mongoose from "mongoose";

const alexaMessageQueueSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  messageQueue: {
    type: Array,
    required: true,
    unique: false
  }
});

export default mongoose.model("AlexaMessageQueue", alexaMessageQueueSchema);
