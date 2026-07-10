import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    subject: { type: String, default: '' },
    message: { type: String, required: true },
    type: { type: String, default: 'contact', enum: ['contact', 'career', 'help'] },
    status: { type: String, default: 'new', enum: ['new', 'read', 'replied', 'closed'] },
    createdAt: { type: Number, default: Date.now }
});

const contactModel = mongoose.models.contact || mongoose.model('contact', contactSchema);

export default contactModel;
