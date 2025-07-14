import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },       // Added email here
  phone:   { type: String, required: true },
  service: { type: String, required: false },      // optional field
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
