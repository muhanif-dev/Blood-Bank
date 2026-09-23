const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    fatherName: {
      type: String,
      required: [true, "Father's name is required"],
      trim: true,
      minlength: [2, "Father's name must be at least 2 characters"],
    },
    program: {
      type: String,
      required: [true, "Program is required"],
      enum: ["BS", "MS", "PhD"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    session: {
      type: String,
      required: [true, "Session is required"],
      enum: ["2024-2028", "2025-2029", "2026-2030"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9+\-\s()]{7,15}$/, "Please enter a valid phone number"],
    },
    alternatePhone: {
      type: String,
      trim: true,
      match: [
        /^[0-9+\-\s()]{7,15}$/,
        "Please enter a valid alternate phone number",
      ],
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for fast search
donorSchema.index({ bloodGroup: 1 });
donorSchema.index({ department: "text", name: "text", fatherName: "text" });
donorSchema.index({ name: 1 });
donorSchema.index({ department: 1 });

const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
