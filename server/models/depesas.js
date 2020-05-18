const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const despesaSchema = new Schema({
	deputado: {
		type: String,
		required: true,
	},
	matricula: {
		type: String,
		required: true,
	},
	ano: {
		type: String,
		required: true,
	},
	mes: {
		type: String,
		required: true,
	},
	cnpj: {
		type: String,
	},
	fornecedor: {
		type: String,
	},
	tipo: {
		type: String,
	},
	valor: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Despesa', despesaSchema);
