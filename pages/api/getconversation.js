import connectDB from '../../middleware/mongodb';
import Conversation from '../../models/Conversation';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    await connectDB();

    const { id } = req.query;

    if (!id) return res.status(400).json({ error: 'Missing conversation id' });

    const conversation = await Conversation.findOne({ conversationId: id });

    if (!conversation) return res.status(404).json({ error: 'Conversation not found' });

    res.status(200).json({ success: true, conversation });
  } catch (error) {
    console.error('GetConversation API Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
