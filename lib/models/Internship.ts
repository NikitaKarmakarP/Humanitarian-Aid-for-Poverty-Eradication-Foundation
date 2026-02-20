import mongoose from 'mongoose';

const InternshipSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide a first name.'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email.'],
    },
    phone: String,
    position: {
        type: String,
        required: [true, 'Please provide a position.'],
    },
    experience: {
        type: String,
        required: [true, 'Please provide experience level.'],
    },
    resumeName: String,
    coverLetter: String,
    portfolio: String,
    source: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Internship || mongoose.model('Internship', InternshipSchema);
