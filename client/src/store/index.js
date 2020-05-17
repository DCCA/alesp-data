import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		deputados: [],
		deputado: [],
	},
	mutations: {
		setDeputados(state, data) {
			state.deputados = data;
		},
		setDeputado(state, data) {
			state.deputado = data;
		},
	},
	actions: {
		getDeputados(context) {
			fetch('http://localhost:3000/api/get-deputados')
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					context.commit('setDeputados', {
						data: data,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		},
		getDeputado(context, id) {
			fetch(`http://localhost:3000/api/get-deputado/${id}`)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					context.commit('setDeputado', {
						deputado: data,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
	modules: {},
});
