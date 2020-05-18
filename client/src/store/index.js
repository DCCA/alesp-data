import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		deputados: [],
		deputado: [],
		error: '',
		isLoading: false,
	},
	mutations: {
		setDeputados(state, data) {
			state.deputados = data.data;
		},
		setDeputado(state, data) {
			state.deputado = data.deputado;
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
					return Promise.reject(err);
				});
		},
		getDeputado(context, id) {
			this.isLoading = true;
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
					return Promise.reject(err);
				});
		},
	},
	modules: {},
});
