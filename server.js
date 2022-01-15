require('dotenv').config();
//Express
const express = require('express');
const methodOverride = require("method-override");

// Importing Express Layouts so we don't have to reuse html code for each page
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/users');
const db = require('./models')
/* ==== Instanced Modules  ==== */
const app = express();

/* ====  Configuration  ==== */
const PORT = 4000;

// Configuring our Express app
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// method override middleware
app.use(methodOverride("_method"));
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use((req, res, next) => {
	console.log(req.url, req.method);
	next();
});

/* ====  Routes & Controllers  ==== */
//Home Route
app.use('/', indexRouter);

//Internal Routs
//app.use
//app.use
app.listen(PORT, () => {
	console.log(`Dope blog app is live at http://localhost:${PORT}`);
});