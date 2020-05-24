const mongoose = require('mongoose');
const Deputados = require('./models/deputados');
const Despesas = require('./models/depesas');

const CronJob = require('cron').CronJob;
const job = new CronJob(
	'* 0 * * * *',
	() => {
		mongoose
			.connect(
				`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@node-complete-bftj6.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
				{ useNewUrlParser: true, useUnifiedTopology: true }
			)
			.then((res) => {
				Deputados.find()
					.then((deputados) => {
						deputados.forEach(async (deputado) => {
							const value = await Despesas.aggregate([
								{
									$addFields: {
										totalValue: { $toDouble: '$valor' },
										year: { $toInt: '$ano' },
									},
								},
								{
									$match: {
										matricula: deputado.matricula,
										year: { $gt: 2018 },
									},
								},
								{
									$group: {
										_id: null,
										totalValue: { $sum: '$totalValue' },
									},
								},
								{ $sort: { totalValue: -1 } },
							]);
							updatedDespesas =
								value[0] !== undefined ? value[0].totalValue : 0;
							deputado.despesasTotais = updatedDespesas;
							const result = await deputado.save();
							console.log(`Updated ${deputado.nomeparlamentar}`);
						});
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => {
				console.log(err);
			});
	},
	{ start: true }
);

module.exports = job;
