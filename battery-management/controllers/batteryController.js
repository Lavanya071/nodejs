// controllers/batteryController.js
const db = require('../config/db');  // Import the database connection

// Function to insert battery data (POST)
async function insertBatteryData(req, res) {
  try {
    const { battery_id, current, voltage, temperature, time } = req.body;

    // Validate required fields
    if (!battery_id || !current || !voltage || !temperature || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Format the time to MySQL DATETIME format
    const mysqlFormattedDate = new Date(time).toISOString().slice(0, 19).replace('T', ' ');

    // Insert into the database
    await db.execute(
      'INSERT INTO battery_data (battery_id, current, voltage, temperature, time) VALUES (?, ?, ?, ?, ?)',
      [battery_id, current, voltage, temperature, mysqlFormattedDate]
    );

    res.status(200).json({ message: 'Data inserted successfully!' });
  } catch (error) {
    console.error('Error inserting data:', error.message);
    res.status(500).json({ error: 'Error inserting data into database' });
  }
}

// Function to get battery data by battery_id (GET)
async function getBatteryData(req, res) {
 const { id } = req.params; // Retrieve battery ID from the request parameters

  try {
    // Query the database for the specific battery data using the battery ID
    const [rows] = await db.execute('SELECT * FROM battery_data WHERE battery_id = ?', [id]);

    // If no data is found, return a 404 error
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Battery data not found' });
    }

    // Return the found data
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching battery data:', error.message);
    res.status(500).json({ error: 'Error retrieving battery data' });
  }
}

// Function to get battery field data (current/voltage/temperature) (GET)
async function getBatteryFieldData(req, res) {
  const { id, field } = req.params;
  const allowedFields = ['current', 'voltage', 'temperature'];
  
  if (!allowedFields.includes(field)) {
    return res.status(400).send({ error: 'Invalid field requested' });
  }

  try {
    const [rows] = await db.execute(
      `SELECT time, ${field} FROM battery_data WHERE battery_id = ? ORDER BY time ASC`,
      [id]
    );
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Database query error' });
  }
}

// Function to get battery field data with time range (GET)
async function getBatteryFieldDataWithRange(req, res) {
  const { id, field } = req.params;
  const { start, end } = req.query;
  const allowedFields = ['current', 'voltage', 'temperature'];
  
  if (!allowedFields.includes(field)) {
    return res.status(400).send({ error: 'Invalid field requested' });
  }

  if (!start || !end) {
    return res.status(400).send({ error: 'Start and end time required' });
  }

  try {
    const [rows] = await db.execute(
      `SELECT time, ${field} FROM battery_data WHERE battery_id = ? AND time BETWEEN ? AND ? ORDER BY time ASC`,
      [id, start, end]
    );
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Database query error' });
  }
}

// Exporting the functions
module.exports = { 
  insertBatteryData, 
  getBatteryData, 
  getBatteryFieldData, 
  getBatteryFieldDataWithRange 
};
