const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const { addSchool, listSchools } = require('../controllers/schoolController');

// Add School
router.post('/addSchool', [
  body('name').notEmpty(),
  body('address').notEmpty(),
  body('latitude').isFloat(),
  body('longitude').isFloat()
], addSchool);

// List Schools
router.get('/listSchools', [
  query('latitude').isFloat(),
  query('longitude').isFloat()
], listSchools);

module.exports = router;
