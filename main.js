// Main Backend code using Node and Express

const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
    host: 'your_mysql_host',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'your_mysql_database',
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL!');
    }
});

// Your API routes go here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


