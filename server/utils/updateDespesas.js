const parseString = require('xml2js').parseString;
const fetch = require('node-fetch');
const Despesa = require('../models/depesas');
const mongoose = require('mongoose');

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@node-complete-bftj6.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then((res) => {
		fetch(
			'http://www.al.sp.gov.br/repositorioDados/deputados/despesas_gabinetes.xml'
		)
			.then((res) => {
				console.log('Got response from server');
				console.log(res);
				return res.text();
			})
			.then((body) => {
				console.log('Started parsing');
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
						parseNumbers: true,
					},
					function (err, result) {
						parsedXml = result;
					}
				);
				return parsedXml;
			})
			.then((data) => {
				console.log('Got the data');
				const despesasArray = data.despesas.despesa;
				despesasArray.forEach((desp) => {
					const novaDesp = new Despesa({
						deputado: desp.deputado,
						matricula: desp.matricula,
						ano: desp.ano,
						mes: desp.mes,
						cnpj: desp.cnpj,
						fornecedor: desp.fornecedor,
						tipo: desp.tipo,
						valor: desp.valor,
					});
					novaDesp.save();
				});
			})
			.catch((err) => {
				console.log(err);
			});
	})
	.catch((err) => {
		console.log(err);
	});
