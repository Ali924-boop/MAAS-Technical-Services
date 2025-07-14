import connectDB from '../../middleware/mongodb';
import Conversation from '../../models/Conversation';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    await connectDB();

    const { conversationId, sender, name, email, message } = req.body;

    if (!conversationId || !sender || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMessage = { sender, name, email, message };

    let convo = await Conversation.findOne({ conversationId });

    if (convo) {
      convo.messages.push(newMessage);
      // Optional: add participant if not already there
      if (!convo.participants.includes(email)) {
        convo.participants.push(email);
      }
      await convo.save();
    } else {
      convo = new Conversation({
        conversationId,
        participants: [email],
        messages: [newMessage],
      });
      await convo.save();
    }

    res.status(200).json({ success: true, conversation: convo });
  } catch (error) {
    console.error('Conversation API Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
