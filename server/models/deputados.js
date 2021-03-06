const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deputadoSchema = new Schema({
	iddeputado: {
		type: String,
		required: true,
	},
	idspl: {
		type: Number,
		required: true,
	},
	idua: {
		type: String,
		required: true,
	},
	situacao: {
		type: String,
		required: true,
	},
	andar: {
		type: String,
	},
	aniversario: {
		type: String,
		required: true,
	},
	biografia: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	matricula: {
		type: String,
		required: true,
	},
	nomeparlamentar: {
		type: String,
		required: true,
	},
	pathfoto: {
		type: String,
		required: true,
	},
	placaveiculo: {
		type: String,
	},
	sala: {
		type: String,
	},
	partido: {
		type: String,
		required: true,
	},
	telefone: {
		type: String,
		required: true,
	},
	areaDeAtuacao: [
		{
			ordem: {
				type: Number,
			},
			areaDeAtuacao: {
				type: String,
			},
		},
	],
	baseEleitoral: [
		{
			ordem: {
				type: Number,
			},
			baseEleitoral: {
				type: String,
			},
		},
	],
	despesasTotais: {
		type: Number,
	},
	despesas: [
		{
			tipo: {
				type: String,
			},
			ano: {
				type: Number,
			},
			mes: {
				type: String,
			},
			valorTotal: {
				type: Number,
			},
		},
	],
});

module.exports = mongoose.model('Deputado', deputadoSchema);
