const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize SQLite Database
const db = new sqlite3.Database('./properties.db', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create properties table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    price TEXT NOT NULL,
    type TEXT NOT NULL,
    area TEXT NOT NULL,
    image TEXT NOT NULL,
    panorama TEXT NOT NULL,
    description TEXT NOT NULL,
    amenities TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Insert default property if table is empty
db.get('SELECT COUNT(*) as count FROM properties', (err, row) => {
  if (!err && row.count === 0) {
    const defaultProperty = {
      title: 'Imperial Sky Villa',
      location: 'Civil Lines, Kanpur',
      price: '₹3.5 Cr',
      type: '5 BHK Luxury Villa',
      area: '5200 Sq.ft',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1400&auto=format&fit=crop',
      panorama: 'https://pannellum.org/images/alma.jpg',
      description: 'Ultra luxury smart villa with imported marble, premium interiors, private terrace and advanced smart home automation.',
      amenities: 'Infinity Pool, Smart Home, Security, Private Parking'
    };

    db.run(
      `INSERT INTO properties (title, location, price, type, area, image, panorama, description, amenities) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        defaultProperty.title,
        defaultProperty.location,
        defaultProperty.price,
        defaultProperty.type,
        defaultProperty.area,
        defaultProperty.image,
        defaultProperty.panorama,
        defaultProperty.description,
        defaultProperty.amenities
      ]
    );
  }
});

// ============= API ROUTES =============

// GET all properties
app.get('/api/properties', (req, res) => {
  db.all('SELECT * FROM properties ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET single property by ID
app.get('/api/properties/:id', (req, res) => {
  db.get('SELECT * FROM properties WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    res.json(row);
  });
});

// POST new property (Admin only)
app.post('/api/properties', (req, res) => {
  const { title, location, price, type, area, image, panorama, description, amenities } = req.body;

  if (!title || !location || !price || !type || !area || !image || !panorama || !description || !amenities) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  db.run(
    `INSERT INTO properties (title, location, price, type, area, image, panorama, description, amenities) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, location, price, type, area, image, panorama, description, amenities],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        message: 'Property added successfully'
      });
    }
  );
});

// DELETE property by ID (Admin only)
app.delete('/api/properties/:id', (req, res) => {
  db.run('DELETE FROM properties WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    res.json({ message: 'Property deleted successfully' });
  });
});

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  // In production, use environment variables and hashed passwords
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = '1234';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📁 Database: properties.db`);
  console.log(`🌐 API: http://localhost:${PORT}/api/properties`);
});
