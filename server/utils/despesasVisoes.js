const mongoose = require('mongoose');
const Despesas = require('../models/depesas');
const Deputados = require('../models/deputados');

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@node-complete-bftj6.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(async (res) => {
		const despesasArray = await Despesas.aggregate([
			{
				$addFields: {
					totalValue: { $toDouble: '$valor' },
					year: { $toInt: '$ano' },
					mes: { $toInt: '$mes' },
				},
			},
			{
				$match: {
					year: { $gt: 2018 },
				},
			},
			{
				$group: {
					_id: {
						matricula: '$matricula',
						tipo: '$tipo',
						ano: '$ano',
						mes: '$mes',
					},
					totalValue: { $sum: '$totalValue' },
				},
			},
			{ $sort: { totalValue: -1 } },
		]);
		const deputadosArray = await Deputados.find();
		deputadosArray.map((dep) => {
			dep.despesas = [];
			despesasArray.forEach((desp) => {
				if (dep.matricula == desp._id.matricula) {
					dep.despesas.push({
						tipo: desp._id.tipo,
						ano: desp._id.ano,
						mes: desp._id.mes,
						valorTotal: desp.totalValue,
					});
				}
			});
			dep.save();
			console.log(dep.despesas);
		});
		console.log('Saved!');
	})
	.catch((err) => {
		console.log(err);
	});
