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
app.use('/api', deputadosRoutes);
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
		fetch('http://www.al.sp.gov.br/repositorioDados/deputados/deputados.xml')
			.then((res) => {
				return res.text();
			})
			.then((body) => {
				let parsedXml;
				parseString(
					body,
					{
						tagNameProcessors: [
							function (name) {
								return name.toLowerCase();
							},
						],
						explicitArray: false,
					},
					function (err, result) {
						parsedXml = result;
					}
				);
				return parsedXml;
			})
			.then((data) => {
				const deputadosArray = data.deputados.deputado;
				deputadosArray.forEach((dep) => {
					// const dep = deputadosArray[0];
					Deputado.findOne({ iddeputado: dep.iddeputado }).then((result) => {
						if (!result) {
							console.log('No deputado. Save one');
							const deputado = new Deputado({
								iddeputado: dep.iddeputado,
								idspl: dep.idspl,
								idua: dep.idua,
								situacao: dep.situacao,
								andar: dep.andar,
								aniversario: dep.aniversario,
								biografia: dep.biografia,
								email: dep.email,
								matricula: dep.matricula,
								nomeparlamentar: dep.nomeparlamentar,
								pathfoto: dep.pathfoto,
								placaveiculo: dep.placaveiculo,
								sala: dep.sala,
								partido: dep.partido,
								telefone: dep.telefone,
							});
							deputado.save();
						}
					});
				});
			})
			.catch((err) => {
				console.log(err);
			});
	})
	// .then((res) => {
	// 	console.log('start');
	// 	fetch(
	// 		'http://www.al.sp.gov.br/repositorioDados/deputados/despesas_gabinetes.xml'
	// 	)
	// 		.then((res) => {
	// 			console.log('result');
	// 			console.log(res);
	// 			return res.text();
	// 		})
	// 		.then((body) => {
	// 			console.log('started parsing');
	// 			let parsedXml;
	// 			parseString(
	// 				body,
	// 				{
	// 					tagNameProcessors: [
	// 						function (name) {
	// 							return name.toLowerCase();
	// 						},
	// 					],
	// 					explicitArray: false,
	// 				},
	// 				function (err, result) {
	// 					parsedXml = result;
	// 				}
	// 			);
	// 			return parsedXml;
	// 		})
	// 		.then((data) => {
	// 			console.log('got the data');
	// 			const despesasArray = data.despesas.despesa;
	// 			console.log(despesasArray);
	// 			despesasArray.forEach((desp) => {
	// 				const novaDesp = new Despesa({
	// 					deputado: desp.deputado,
	// 					matricula: desp.matricula,
	// 					ano: desp.ano,
	// 					mes: desp.mes,
	// 					cnpj: desp.cnpj,
	// 					fornecedor: desp.fornecedor,
	// 					tipo: desp.tipo,
	// 					valor: desp.valor,
	// 				});
	// 				novaDesp.save();
	// 			});
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// })
	.catch((err) => {
		console.log(err);
	});
