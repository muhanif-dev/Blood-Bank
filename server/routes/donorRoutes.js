const express = require('express');
const router = express.Router();
const {
  getDonors,
  getDonor,
  createDonor,
  updateDonor,
  deleteDonor,
} = require('../controllers/donorController');

router.route('/').get(getDonors).post(createDonor);
router.route('/:id').get(getDonor).put(updateDonor).delete(deleteDonor);

module.exports = router;
