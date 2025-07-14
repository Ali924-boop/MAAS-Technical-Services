import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // 'user' or 'admin'
  name: String,
  email: String,
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ConversationSchema = new mongoose.Schema({
  conversationId: { type: String, required: true, unique: true },
  participants: [String], // e.g. ['userEmail', 'admin']
  messages: [MessageSchema],
});

export default mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);
