import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		deputados: [],
	},
	mutations: {
		setDeputados(state, data) {
			this.state.deputados = data;
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
	},
	modules: {},
});
