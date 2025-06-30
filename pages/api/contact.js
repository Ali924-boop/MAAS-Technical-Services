// pages/api/contact.js
import connectDB from '../../middleware/mongodb';
import Contact from '../../models/Contact';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await connectDB();

    const { name, phone, service, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newContact = new Contact({ name, phone, service, message });
    await newContact.save();

    return res.status(200).json({ success: true, message: 'Message submitted successfully!' });

  } catch (error) {
    console.error('❌ Contact API Error:', error);
    return res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
}
