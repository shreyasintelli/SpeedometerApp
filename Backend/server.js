const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// DB connect
const dbConfig = {
 host: 'mysql',  //change it to localhost if running the server.js from terminal
  user: 'root',
  password: 'Shre@6.62607004',  //replace the password with your MySQL password and preferabely use MySql Workbench
  database: 'speedometer_db'
};

// Create database connection pool
let connection;
async function connectToDatabase() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database successfully');
  } catch (error) {
    console.error('Database connection error:', error);
  
    setTimeout(connectToDatabase, 5000);
  }
}
connectToDatabase();

// to record speed post req
app.post('/speed', async (req, res) => {
  try {
    const { speed } = req.body;
    const query = 'INSERT INTO speed_data (speed, timestamp) VALUES (?, NOW())';
    await connection.execute(query, [speed]);
    res.status(201).json({ message: 'Speed recorded successfully' });
  } catch (error) {
    console.error('Error recording speed:', error);
    res.status(500).json({ error: 'Failed to record speed' });
  }
});

// to get highest speed
app.get('/latest-speed', async (req, res) => {
  try {
    const query = 'SELECT speed FROM speed_data ORDER BY timestamp DESC LIMIT 1';
    const [rows] = await connection.execute(query);
    res.json(rows[0] || { speed: 0 });
  } catch (error) {
    console.error('Error fetching latest speed:', error);
    res.status(500).json({ error: 'Failed to fetch latest speed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});