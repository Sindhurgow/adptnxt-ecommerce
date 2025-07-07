const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/dbInit');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (user) return res.status(409).json({ error: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashed, 'customer'], function (err) {
      if (err) return res.status(500).json({ error: 'Registration failed' });

      const payload = { id: this.lastID, role: 'customer' };
      const secret = process.env.JWT_SECRET || 'fallback_secret';

      const token = jwt.sign(payload, secret, { expiresIn: '1h' });

      res.status(201).json({ token });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'All fields required' });

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const payload = { id: user.id, role: user.role };
    const secret = process.env.JWT_SECRET || 'fallback_secret';

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    res.json({ token });
  });
};
