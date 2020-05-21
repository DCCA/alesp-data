<template>
	<div class="container">
		<h1 class="title h1 bold mb3">Gastos</h1>
		<app-chart></app-chart>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Chart from '../components/Chart.vue';
// import * as d3 from 'd3';

export default {
	computed: mapState({
		deputadosState: 'deputados',
	}),
	beforeMount() {
		this.$store.dispatch('getDeputados').catch((err) => console.log(err));
	},
	components: {
		appChart: Chart,
	},
};
</script>

<style lang="sass" scoped></style>
