const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/events', (req, res) => {
  const { title, date, time } = req.body;
  // 这里应该有保存到数据库的逻辑
  // 假设保存成功
  res.status(201).json({ message: 'Event added successfully' });
});

app.listen(3000, () => console.log('Server running on port 3000'));