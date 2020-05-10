// Add packages
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const parseString = require('xml2js').parseString;
const mongoose = require('mongoose');
const path = require('path');

// Models
const Deputado = require('./models/deputados');

// Start app
const app = express();

// App config
app.use(bodyParser.json());
app.use(express.static('client/build'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Routes

// Open server
// Add db connection
mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@node-complete-bftj6.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true }
	)
	.then((res) => {
		console.log('Connected to DB!');
		app.listen(process.env.PORT || 3000);
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
	.catch();
