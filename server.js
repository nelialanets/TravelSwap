require('dotenv').config();
//Express
const morgan = require('morgan')
const express = require('express');
const methodOverride = require("method-override");
const path = require('path');

// Importing Express Layouts so we don't have to reuse html code for each page
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/database')

const indexRouter = require('./routes/index');
const listingRouter = require ('./routes/listings');
const commentRouter = require('./routes/comments');

/* ==== Instanced Modules  ==== */
const app = express();

/* ====  Configuration  ==== */
const PORT = process.env.PORT || 4000

// Configuring our Express app
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
// method override middleware
app.use(methodOverride("_method"));
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

// * This lets us use CSS with ejs-layouts
app.use(express.static('public'));

app.use((req, res, next) => {
	console.log(req.url, req.method);
	next();
});

/* ====  Routes & Controllers  ==== */
//Home Route
app.get("/",(req,res)=>{
	res.render("index")
});
app.use('/', indexRouter);
app.use('/listings', listingRouter);
app.use('/', commentRouter);


app.listen(PORT, () => {
	console.log(`Dope blog app is live at http://localhost:${PORT}`);
});