/**
 * Development seed script — inserts realistic test donors.
 * Run: npm run seed
 * WARNING: Clears existing donors before seeding. Do NOT run in production.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Donor = require('../models/Donor');

const testDonors = [
  {
    name: 'Muhammad Ali',
    fatherName: 'Abdul Rahman',
    bloodGroup: 'O+',
    place: 'Lakki Marwat',
    phone: '03000000001',
    email: 'mali@example.com',
    age: 28,
    gender: 'Male',
    address: 'Main Bazaar, Lakki Marwat, KPK',
    lastDonationDate: new Date('2024-03-15'),
  },
  {
    name: 'Fatima Bibi',
    fatherName: 'Ghulam Hussain',
    bloodGroup: 'A+',
    place: 'Lahore',
    phone: '03111111111',
    email: 'fatima@example.com',
    age: 24,
    gender: 'Female',
    address: 'Gulberg III, Lahore, Punjab',
    lastDonationDate: new Date('2024-05-20'),
  },
  {
    name: 'Ahmed Khan',
    fatherName: 'Sher Khan',
    bloodGroup: 'B+',
    place: 'Peshawar',
    phone: '03222222222',
    age: 32,
    gender: 'Male',
    address: 'Hayatabad, Peshawar, KPK',
  },
  {
    name: 'Zainab Malik',
    fatherName: 'Tariq Malik',
    bloodGroup: 'AB+',
    place: 'Karachi',
    phone: '03333333333',
    email: 'zainab@example.com',
    age: 26,
    gender: 'Female',
    address: 'Defence Phase 6, Karachi, Sindh',
    lastDonationDate: new Date('2024-01-10'),
  },
  {
    name: 'Usman Ghani',
    fatherName: 'Abdul Ghani',
    bloodGroup: 'O-',
    place: 'Islamabad',
    phone: '03444444444',
    age: 35,
    gender: 'Male',
    address: 'F-8, Islamabad',
  },
  {
    name: 'Ayesha Siddiqui',
    fatherName: 'Noman Siddiqui',
    bloodGroup: 'A-',
    place: 'Rawalpindi',
    phone: '03555555555',
    email: 'ayesha@example.com',
    age: 22,
    gender: 'Female',
    address: 'Satellite Town, Rawalpindi, Punjab',
    lastDonationDate: new Date('2024-06-01'),
  },
  {
    name: 'Bilal Hassan',
    fatherName: 'Iftikhar Hassan',
    bloodGroup: 'B-',
    place: 'Quetta',
    phone: '03666666666',
    age: 29,
    gender: 'Male',
    address: 'Jinnah Town, Quetta, Balochistan',
  },
  {
    name: 'Mariam Nawaz',
    fatherName: 'Nawaz Ahmed',
    bloodGroup: 'AB-',
    place: 'Multan',
    phone: '03777777777',
    age: 27,
    gender: 'Female',
    address: 'Shah Rukn-e-Alam Colony, Multan, Punjab',
    lastDonationDate: new Date('2023-12-25'),
  },
  {
    name: 'Hassan Raza',
    fatherName: 'Raza Ali',
    bloodGroup: 'O+',
    place: 'Faisalabad',
    phone: '03888888888',
    age: 31,
    gender: 'Male',
    address: 'Peoples Colony, Faisalabad, Punjab',
  },
  {
    name: 'Sana Tariq',
    fatherName: 'Tariq Mehmood',
    bloodGroup: 'A+',
    place: 'Lakki Marwat',
    phone: '03999999999',
    email: 'sana@example.com',
    age: 23,
    gender: 'Female',
    address: 'Block 4, Lakki Marwat, KPK',
    lastDonationDate: new Date('2024-04-10'),
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Donor.deleteMany({});
    console.log('🗑️  Cleared existing donors');

    const inserted = await Donor.insertMany(testDonors);
    console.log(`✅ Seeded ${inserted.length} test donors successfully`);

    console.log('\nTest donors added:');
    inserted.forEach((d) => console.log(`  • ${d.name} (${d.bloodGroup}) — ${d.place}`));

    await mongoose.disconnect();
    console.log('\n✅ Database seeding complete. You can now run the server.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
