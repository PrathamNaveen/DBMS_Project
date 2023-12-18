// Main Backend code using Node and Express

// server.mjs

import express from 'express';
// import db from './config/dbConfig.mjs';
// import movieRoutes from './routes/movieRoutes.mjs';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// Routes
app.use('/movies', movieRoutes);

// Database connection
db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL!');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

