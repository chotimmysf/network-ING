const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/API/users', require('./routes/API/users'));
app.use('/API/auth', require('./routes/API/auth'));
app.use('/API/posts', require('./routes/API/posts'));
app.use('/API/profile', require('./routes/API/profile'));

// Serve static assets in production
if(process.env_NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));