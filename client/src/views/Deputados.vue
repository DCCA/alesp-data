<template>
	<section class="section container">
		<h1 class="title h1 bold mb3">Lista dos Deputados de SP</h1>
		<div class="clearfix mx-auto">
			<h2 v-if="deputadosState.length === 0">Loading....</h2>
			<app-card
				v-else
				v-for="(deputado, index) in deputadosState"
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
import { mapState } from 'vuex';
import Card from '../components/Card.vue';

export default {
	computed: mapState({
		deputadosState: 'deputados',
	}),
	components: {
		appCard: Card,
	},
	beforeMount() {
		this.$store.dispatch('getDeputados').catch((err) => console.log(err));
	},
};
</script>

<style lang="scss" scoped></style>
