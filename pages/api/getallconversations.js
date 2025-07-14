import connectDB from '../../middleware/mongodb';
import Conversation from '../../models/Conversation';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    await connectDB();

    const conversations = await Conversation.find({}).sort({ 'messages.timestamp': -1 });

    res.status(200).json({ success: true, conversations });
  } catch (error) {
    console.error('GetAllConversations API Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
