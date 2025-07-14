// pages/api/Login.js

import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;         // from your .env.local
  const adminPassword = process.env.ADMIN_PASSWORD;   // from your .env.local
  const jwtSecret = process.env.JWT_SECRET;           // set a secret in .env.local

  if (!adminEmail || !adminPassword || !jwtSecret) {
    return res.status(500).json({ success: false, message: 'Server not configured properly' });
  }

  if (email === adminEmail && password === adminPassword) {
    // Generate JWT token with email claim
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });
    return res.status(200).json({ success: true, token });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}
