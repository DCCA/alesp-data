<template>
	<div class="home">
		<section class="hero is-info is-large">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						Acompanhe o seu deputado
					</h1>
					<h2 class="subtitle">
						Voce sabe o que seu deputado fez nos ultimos meses?
					</h2>
				</div>
			</div>
		</section>
		<app-footer></app-footer>
	</div>
</template>

<script>
import Footer from '../components/Footer.vue';

export default {
	name: 'Home',
	components: {
		appFooter: Footer,
	},
};
</script>

<style lang="scss" scoped>
.hero {
	background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
		url('../assets/homeHero.jpg');
	background-size: cover;
	background-position: center;
}
</style>
