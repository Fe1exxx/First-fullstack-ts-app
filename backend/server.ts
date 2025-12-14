import type { Request, Response } from 'express'; 
const express = require('express');
const cors = require('cors');
const pool = require('./src/db.ts');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/teams', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM teams');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при загрузке команд' });
  }
});

app.post('/api/teams', async (req: Request, res: Response) => {
  const { name, city } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO teams (name, city) VALUES ($1, $2) RETURNING *',
      [name, city]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Не удалось создать команду' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend запущен на http://localhost:${PORT}`);
});