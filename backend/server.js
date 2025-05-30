const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./data/data');
const connectDB = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();
const app = express(); // to accept json data

app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is running...");
});

app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`.yellow.bold));