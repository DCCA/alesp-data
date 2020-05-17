<template>
	<section class="section container">
		<h1 class="title h1 bold mb3">Lista dos Deputados de SP</h1>
		<div class="clearfix mx-auto">
			<app-card
				v-for="(deputado, index) in deputados"
				:key="index"
				:name="deputado.nomeparlamentar"
				:party="deputado.partido"
				:imageUrl="deputado.pathfoto"
				:id="deputado._id"
			></app-card>
		</div>
	</section>
</template>

<script>
import Card from '../components/Card.vue';

export default {
	data() {
		return {
			deputados: [],
		};
	},
	computed: {
		thereIsProduct() {
			return this.$store.state.deputados;
		},
	},
	watch: {
		thereIsProduct(newState) {
			this.deputados = newState.data;
		},
	},
	components: {
		appCard: Card,
	},
	beforeMount() {
		this.$store.dispatch('getDeputados');
	},
};
</script>

<style lang="scss" scoped></style>
