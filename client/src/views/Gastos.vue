<template>
	<div class="container">
		<h1 class="title h1 bold mb3">Gastos</h1>
		<table v-if="despesasState !== null" class="mx-auto">
			<tr>
				<th>Ranking</th>
				<th>Nome</th>
				<th>Partido</th>
				<th>Gastos Total</th>
			</tr>
			<tr
				v-for="(deputado, index) in despesasState.data.deputadosDespesasArray"
				:key="index"
			>
				<td>{{ index + 1 }}</td>
				<td>
					{{ deputado.deputadoName }}
				</td>
				<td>{{ deputado.partido }}</td>
				<td>R{{ formatNum(deputado.despesasTotais) }}</td>
			</tr>
		</table>

		<div v-else>
			<p>Loading...</p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import numeral from 'numeral';

export default {
	computed: mapState({
		deputadosState: 'deputados',
		despesasState: 'despesas',
	}),
	methods: {
		formatNum(num) {
			return numeral(num).format('$ 0,0.00');
		},
	},
	beforeMount() {
		this.$store.dispatch('getDeputados').catch((err) => console.log(err));
		this.$store.dispatch('getDespesas').catch((err) => console.log(err));
	},
	components: {},
};
</script>

<style lang="scss" scoped>
table,
th,
td {
	border: 1px solid black;
}

th {
	margin: 1rem;
	padding: 0.4rem 0.2rem;
	font-weight: bold;
	background-color: #7b85a7;
	color: white;
}

td {
	padding: 0.5rem;
}

td:hover {
	background-color: #f5f5f5;
}
</style>
