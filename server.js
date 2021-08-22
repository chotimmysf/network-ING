const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API is running.'))

// Define Routes
app.use('/API/users', require('./routes/API/users'));
app.use('/API/auth', require('./routes/API/auth'));
app.use('/API/posts', require('./routes/API/posts'));
app.use('/API/profile', require('./routes/API/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));