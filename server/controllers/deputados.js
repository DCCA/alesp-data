const Deputados = require('../models/deputados');
const Despesas = require('../models/depesas');

exports.getDeputados = async (req, res, next) => {
	try {
		const deputados = await Deputados.find();
		res.status(200).json(deputados);
	} catch (error) {
		console.log(error);
	}
};

exports.getDeputado = async (req, res, next) => {
	try {
		const deputadoId = req.params.id;
		if (!deputadoId) {
			return res.status(401).json({
				message: 'No id in the request',
			});
		}
		const deputado = await Deputados.findById(deputadoId);
		if (!deputado) {
			return res.status(404).json({
				message: 'No deputado found',
			});
		}
		const value = await Despesas.aggregate([
			{
				$addFields: {
					totalValue: { $toDouble: '$valor' },
					year: { $toInt: '$ano' },
				},
			},
			{ $match: { matricula: deputado.matricula, year: { $gt: 2018 } } },
			{ $group: { _id: null, totalValue: { $sum: '$totalValue' } } },
		]);
		res.status(200).json({ deputado: deputado, value: value });
	} catch (error) {
		console.log(error);
	}
};
