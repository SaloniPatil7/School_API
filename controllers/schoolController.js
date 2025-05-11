const db = require('../db');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = x => x * Math.PI / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

exports.addSchool = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, address, latitude, longitude } = req.body;
  try {
    await db.execute('INSERT INTO schools (id,name, address, latitude, longitude) VALUES (?,?, ?, ?, ?)', [uuidv4(),name, address, latitude, longitude]);
    res.status(201).json({ message: 'School added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err });
  }
};

exports.listSchools = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  try {
    const [schools] = await db.execute('SELECT * FROM schools');
    const schoolsWithDistance = schools.map(school => ({
      ...school,
      distance: haversineDistance(userLat, userLon, school.latitude, school.longitude)
    }));
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    res.json(schoolsWithDistance);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err });
  }
};
