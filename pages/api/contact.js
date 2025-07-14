import connectDB from '../../middleware/mongodb';
import Contact from '../../models/Contact';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await connectDB();

    const { name, email, phone, service, message } = req.body;

    if (!name || !phone || !message || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newContact = new Contact({ name, email, phone, service, message });
    await newContact.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'maastechnicalcleaningservices@gmail.com',
        pass: 'halyktrsovojwhsk',
      },
    });

    const mailOptions = {
      from: 'maastechnicalcleaningservices@gmail.com',
      to: 'maastechnicalcleaningservices@gmail.com',
      subject: 'Customer Submit Message from Contact',
      html: `
        <h3>Contact Form Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service || 'N/A'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Message submitted successfully and email sent!' });

  } catch (error) {
    console.error('❌ Contact API Error:', error);
    return res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
}
