const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors()); // Додає підтримку CORS для всіх запитів

// Обробник для кореневої сторінки
app.get('/', (req, res) => {
  res.send('Express server is running!');
});

// Створення маршруту для отримання даних з зовнішнього API
app.get('/api/candidate-summary', async (req, res) => {
  try {
    const response = await axios.get('https://test-task-mock-api.onrender.com/api/candidate/summary', {
      headers: {
        'x-api-key': 'Aq2ckj2sHpsawVEjpZac7PXF8beiKvREPC-2O5EL_DY',
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching candidate summary:', error.message);
    res.status(500).json({ message: 'Failed to fetch candidate summary' });
  }
});

// Запускаємо сервер на порту 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
