const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;
const mongoose = require('mongoose');
const Deputado = require('../models/deputados');

(async () => {
	let baseEleitoralArray;
	await fetch(
		'http://www.al.sp.gov.br/repositorioDados/deputados/deputado_base_eleitoral.xml'
	)
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
			baseEleitoralArray = data.deputadosbaseeleitoral.deputadobaseeleitoral;
		})
		.catch((err) => {
			console.log(err);
		});

	let basesEleitoraisArray;
	await fetch(
		'http://www.al.sp.gov.br/repositorioDados/deputados/bases_eleitorais.xml'
	)
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
			basesEleitoraisArray = data.baseseleitorais.baseeleitoral;
		})
		.catch((err) => {
			console.log(err);
		});

	const newBaseEleitoralArray = baseEleitoralArray.map((deputadoBase) => {
		const newDeputadoBase = deputadoBase;
		newDeputadoBase.baseEleitoral = [];
		basesEleitoraisArray.forEach((baseEleitoral) => {
			if (baseEleitoral.id == newDeputadoBase.idbaseeleitoral) {
				newDeputadoBase.baseEleitoral.push(baseEleitoral);
			}
		});
		return newDeputadoBase;
	});

	let areaDeAtuacaoArray;
	await fetch(
		'http://www.al.sp.gov.br/repositorioDados/deputados/deputado_area_atuacao.xml'
	)
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
			areaDeAtuacaoArray = data.deputadosareaatuacao.deputadoareaatuacao;
		})
		.catch((err) => {
			console.log(err);
		});

	let areasDeAtuacaoArray;
	await fetch(
		'http://www.al.sp.gov.br/repositorioDados/deputados/areas_atuacao.xml'
	)
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
			areasDeAtuacaoArray = data.areasatuacao.areaatuacao;
		})
		.catch((err) => {
			console.log(err);
		});

	const newAreaAtuacaoArray = areaDeAtuacaoArray.map(
		(areaAtuacaoDeputadoBase) => {
			const newAreasBase = areaAtuacaoDeputadoBase;
			newAreasBase.areaDeAtuacao = [];
			areasDeAtuacaoArray.forEach((areaAtuacaoLegenda) => {
				if (areaAtuacaoLegenda.id == newAreasBase.idarea) {
					newAreasBase.areaDeAtuacao.push(areaAtuacaoLegenda);
				}
			});
			return newAreasBase;
		}
	);

	// Get Deputados
	let deputadosArray;
	await fetch(
		'http://www.al.sp.gov.br/repositorioDados/deputados/deputados.xml'
	)
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
			deputadosArray = data.deputados.deputado;
		})
		.catch((err) => {
			console.log(err);
		});

	const completeDeputadosArray = deputadosArray.map((deputado) => {
		const newDeputado = deputado;
		newDeputado.areaDeAtuacao = [];
		newDeputado.baseEleitoral = [];
		newBaseEleitoralArray.forEach((base) => {
			if (base.iddeputado === newDeputado.iddeputado) {
				newDeputado.baseEleitoral.push({
					ordem: base.nrordem,
					baseEleitoral: base.baseEleitoral[0].nome,
				});
			}
		});
		newAreaAtuacaoArray.forEach((area) => {
			if (area.iddeputado === newDeputado.iddeputado) {
				newDeputado.areaDeAtuacao.push({
					ordem: area.nrordem,
					areaDeAtuacao: area.areaDeAtuacao[0].nome,
				});
			}
		});
		return newDeputado;
	});

	await mongoose
		.connect(
			`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@node-complete-bftj6.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
			{ useNewUrlParser: true, useUnifiedTopology: true }
		)
		.then((res) => {
			completeDeputadosArray.forEach((dep) => {
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
							areaDeAtuacao: dep.areaDeAtuacao,
							baseEleitoral: dep.baseEleitoral,
						});
						deputado.save();
					}
				});
			});
		})
		.catch((err) => {
			console.log(err);
		});
})();
