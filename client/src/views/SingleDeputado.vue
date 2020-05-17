<template>
	<div class="container clearfix">
		<div
			:style="{ backgroundImage: `url(${deputado.pathfoto})` }"
			class="deputado-photo rounded col-6"
		></div>
		<div class="col-6">
			<h1 class="h1">{{ deputado.nomeparlamentar }}</h1>
		</div>
		<p v-html="deputado.biografia"></p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			deputado: {},
		};
	},
	computed: {
		thereIsProduct() {
			return this.$store.state.deputado;
		},
	},
	watch: {
		thereIsProduct(newState) {
			this.deputado = newState.deputado;
		},
	},
	beforeMount() {
		const id = this.$route.params.id;
		this.$store.dispatch('getDeputado', id);
	},
};
</script>

<style lang="scss" scoped>
.deputado-photo {
	height: 10rem;
	width: 10rem;
	background-size: cover;
	background-position: center;
}
</style>
