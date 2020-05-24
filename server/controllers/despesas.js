const Deputados = require('../models/deputados');
const Despesas = require('../models/depesas');

exports.getDespesas = async (req, res, next) => {
	try {
		const deputados = await Deputados.find();
		const graphData = deputados.map((deputado) => {
			return {
				_id: deputado._id,
				deputadoName: deputado.nomeparlamentar,
				partido: deputado.partido,
				despesasTotais: deputado.despesasTotais,
			};
		});
		// Put in the desc order
		graphData.sort((a, b) => (a.despesasTotais > b.despesasTotais ? -1 : +1));
		// Get the deputados array
		const deputadosArr = graphData.map((i) => {
			return i.deputadoName;
		});
		// Get the gastos array
		const despesasArr = graphData.map((i) => {
			return i.despesasTotais;
		});
		// Send the data
		res.status(200).json({
			deputadosArray: deputadosArr,
			despesasArray: despesasArr,
			deputadosDespesasArray: graphData,
		});
	} catch (error) {
		console.log(error);
	}
};
