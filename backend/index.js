const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const transactions = require('./routes/transaction');
const user = require('./routes/user')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', transactions);
app.use('/api', user);

app.get('/api/wake-up', (req, res) => {
    res.send({ message: 'Server is awake' });
});

// Start the server
const server = () => {
    db()
        .then(() => {
            app.listen(PORT, () => {
                console.log('Listening on port:', PORT);
            });
        })
        .catch((error) => {
            console.error('Failed to connect to the database', error);
        });
};

server();
