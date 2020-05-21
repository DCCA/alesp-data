import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Deputados from '../views/Deputados.vue';
import SingleDeputado from '../views/SingleDeputado.vue';
import Gastos from '../views/Gastos.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
	{
		path: '/deputados',
		name: 'Deputados',
		component: Deputados,
	},
	{
		path: '/deputado/:id',
		name: 'SingleDeputado',
		component: SingleDeputado,
	},
	{
		path: '/gastos',
		name: 'Gastos',
		component: Gastos,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
