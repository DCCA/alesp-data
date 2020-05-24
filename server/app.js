// Add packages
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const parseString = require('xml2js').parseString;
const mongoose = require('mongoose');
const path = require('path');

// Models
const Deputado = require('./models/deputados');
const Despesa = require('./models/depesas');

// Routes
const deputadosRoutes = require('./routes/deputados');
const despesasRoutes = require('./routes/despesas');

// Import cron jobs
const job = require('./cron');

// Start app
const app = express();

// App config
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
// CORS Config
app.use((req, res, next) => {
	// Set domains
	res.setHeader('Access-Control-Allow-Origin', '*');
	// Set the methods
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE'
	);
	//
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

// Routes
app.use('/api/deputados', deputadosRoutes);
app.use('/api/despesas', despesasRoutes);
app.use('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Add db connection
mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@node-complete-bftj6.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then((res) => {
		console.log('Connected to DB!');
		// Open server
		app.listen(process.env.PORT || 3000);
		console.log(`Server started!`);
	})
	.catch((err) => {
		console.log(err);
	});
