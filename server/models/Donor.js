const mongoose = require('mongoose');

const VALID_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    fatherName: {
      type: String,
      required: [true, "Father's name is required"],
      trim: true,
      minlength: [2, "Father's name must be at least 2 characters"],
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: {
        values: VALID_BLOOD_GROUPS,
        message: 'Invalid blood group. Must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-',
      },
    },
    place: {
      type: String,
      required: [true, 'City / Place is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[0-9+\-\s()]{7,15}$/, 'Please enter a valid phone number'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
      default: '',
    },
    age: {
      type: Number,
      min: [16, 'Donor must be at least 16 years old'],
      max: [65, 'Donor must be 65 years or younger'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', ''],
      default: '',
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    lastDonationDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast search
donorSchema.index({ bloodGroup: 1 });
donorSchema.index({ place: 'text', name: 'text', fatherName: 'text' });
donorSchema.index({ name: 1 });
donorSchema.index({ place: 1 });

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;
