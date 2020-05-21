<template>
	<div>
		<canvas id="myChart" width="400" height="400"></canvas>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Chart from 'chart.js';

export default {
	computed: mapState({
		despesasState: 'despesas',
	}),
	watch: {
		despesasState() {
			console.log('done');
			this.renderGraph();
		},
	},
	beforeMount() {
		this.$store.dispatch('getDespesas').catch((err) => console.log(err));
	},
	methods: {
		renderGraph() {
			const ctx = document.getElementById('myChart').getContext('2d');
			const myChart = new Chart(ctx, {
				type: 'horizontalBar',
				data: {
					labels: this.despesasState.data.deputadosArray,
					datasets: [
						{
							label: 'Gastos',
							data: this.despesasState.data.despesasArray,
						},
					],
				},
				options: {
					legend: false,
					lineTension: 1,
					scaleShowValues: true,
					scales: {
						scalesLabel: {
							lineHeight: 2,
						},
						yAxes: [
							{
								ticks: {
									autoSkip: false,
									lineHeight: 2,
								},
							},
						],
						xAxes: [
							{ position: 'top' },
							{
								ticks: {
									// Include a dollar sign in the ticks
									callback: function(value) {
										return '$' + value;
									},
								},
							},
						],
					},
				},
			});
			console.log(myChart);
		},
	},
};
</script>

<style lang="scss" scoped></style>
