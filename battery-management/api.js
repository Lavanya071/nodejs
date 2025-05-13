const express = require('express');
const app = express();
const morgan = require('morgan');            // <-- ADD THIS LINE
const batteryRoutes = require('./routes/batteryRoutes');

// Middleware to parse JSON body
app.use(express.json());

// Middleware to log every request
app.use(morgan('dev'));                      // <-- ADD THIS LINE

// Use battery routes for any path starting with '/api/battery'
app.use('/api/battery', batteryRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
