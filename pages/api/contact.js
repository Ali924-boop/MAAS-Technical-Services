import connectDB from '../../middleware/mongodb';
import Contact from '../../models/Contact';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Connect to MongoDB
    await connectDB();

    const { name, phone, service, message } = req.body;

    // Check if all required fields are provided
    if (!name || !phone || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save the contact details in the database
    const newContact = new Contact({ name, phone, service, message });
    await newContact.save();

    // Set up Nodemailer transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'najeebullah2515@gmail.com', 
        pass: 'vslowvfsplxhrmlw', 
      },
    });

    // Email content
    const mailOptions = {
      from: 'your-email@gmail.com', // Replace with your Gmail
      to: 'recipient-email@gmail.com', // Replace with the recipient's email (your email or admin's)
      subject: 'Customer Submit Message from Contact',
      html: `
        <h3>Contact Form Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service || 'N/A'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond with success
    return res.status(200).json({ success: true, message: 'Message submitted successfully and email sent!' });

  } catch (error) {
    console.error('❌ Contact API Error:', error);
    return res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
}
