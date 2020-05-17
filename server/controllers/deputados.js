const Deputados = require('../models/deputados');

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
				message: 'Not id in the request',
			});
		}
		const deputado = await Deputados.findById(deputadoId);
		if (!deputado) {
			return res.status(404).json({
				message: 'No deputado found',
			});
		}
		res.status(200).json(deputado);
	} catch (error) {
		console.log(error);
	}
};
