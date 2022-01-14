if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Adding Express
const express = require('express');
const app = express();
// Importing Express Layouts so we don't have to reuse html code for each page
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

// Configuring our Express app
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

// Connecting to MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose.'));

// Setting up index route
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);