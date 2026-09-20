const Donor = require('../models/Donor');

// ─── GET /api/donors ─────────────────────────────────────────────────────────
// Supports: ?bloodGroup=O%2B&name=Ali&fatherName=Ahmad&place=Lahore&page=1&limit=10
const getDonors = async (req, res, next) => {
  try {
    const { bloodGroup, name, fatherName, place, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (bloodGroup && bloodGroup !== 'ALL' && bloodGroup !== '') {
      filter.bloodGroup = bloodGroup;
    }
    if (name && name.trim() !== '') {
      filter.name = { $regex: name.trim(), $options: 'i' };
    }
    if (fatherName && fatherName.trim() !== '') {
      filter.fatherName = { $regex: fatherName.trim(), $options: 'i' };
    }
    if (place && place.trim() !== '') {
      filter.place = { $regex: place.trim(), $options: 'i' };
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [donors, total] = await Promise.all([
      Donor.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .select('-__v'),
      Donor.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: donors,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/donors/:id ──────────────────────────────────────────────────────
const getDonor = async (req, res, next) => {
  try {
    const donor = await Donor.findById(req.params.id).select('-__v');
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found.' });
    }
    return res.status(200).json({ success: true, data: donor });
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Donor not found.' });
    }
    next(error);
  }
};

// ─── POST /api/donors ─────────────────────────────────────────────────────────
const createDonor = async (req, res, next) => {
  try {
    const { name, fatherName, bloodGroup, place, phone, email, age, gender, address, lastDonationDate } = req.body;

    // Backend validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Full name is required.' });
    }
    if (!fatherName || !fatherName.trim()) {
      return res.status(400).json({ success: false, message: "Father's name is required." });
    }
    if (!bloodGroup) {
      return res.status(400).json({ success: false, message: 'Blood group is required.' });
    }
    if (!place || !place.trim()) {
      return res.status(400).json({ success: false, message: 'City / Place is required.' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }

    const donorData = {
      name: name.trim(),
      fatherName: fatherName.trim(),
      bloodGroup,
      place: place.trim(),
      phone: phone.trim(),
    };

    if (email && email.trim()) donorData.email = email.trim().toLowerCase();
    if (age) donorData.age = parseInt(age);
    if (gender) donorData.gender = gender;
    if (address && address.trim()) donorData.address = address.trim();
    if (lastDonationDate) donorData.lastDonationDate = new Date(lastDonationDate);

    const donor = await Donor.create(donorData);

    return res.status(201).json({
      success: true,
      message: 'Donor registered successfully. Thank you for joining the Blood Bank Connect network!',
      data: donor,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    next(error);
  }
};

// ─── PUT /api/donors/:id ──────────────────────────────────────────────────────
const updateDonor = async (req, res, next) => {
  try {
    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found.' });
    }
    return res.status(200).json({ success: true, message: 'Donor updated successfully.', data: donor });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Donor not found.' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    next(error);
  }
};

// ─── DELETE /api/donors/:id ───────────────────────────────────────────────────
const deleteDonor = async (req, res, next) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found.' });
    }
    return res.status(200).json({ success: true, message: 'Donor deleted successfully.' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Donor not found.' });
    }
    next(error);
  }
};

module.exports = { getDonors, getDonor, createDonor, updateDonor, deleteDonor };
