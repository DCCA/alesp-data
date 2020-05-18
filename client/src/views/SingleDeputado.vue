<template>
	<div class="container clearfix">
		<div
			:style="{ backgroundImage: `url(${deputado.pathfoto})` }"
			class="deputado-photo rounded col col-4"
		></div>
		<div class="col col-6 p2">
			<h1 class="h1 py1">{{ deputado.nomeparlamentar }}</h1>
			<p class="h4 py1">Partido: {{ deputado.partido }}</p>
			<p class="h4 py1">E-mail: {{ deputado.email }}</p>
		</div>
		<div class="bio col col-12 my2">
			<div class="bio-text" v-html="bioSanitized"></div>
		</div>
	</div>
</template>

<script>
import sanitizeHtml from 'sanitize-html';

export default {
	data() {
		return {
			bioSanitized: '',
		};
	},
	computed: {
		deputado() {
			return this.$store.state.deputado;
		},
	},
	watch: {
		deputado() {
			this.bioSanitized = sanitizeHtml(this.$store.state.deputado.biografia);
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
	height: 18rem;
	background-size: cover;
	background-position: center;
}
.bio-text {
	p {
		padding: 1rem 0;
	}
}
</style>
