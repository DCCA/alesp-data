<template>
	<div class="home">
		<section
			class="hero container flex flex-column items-center justify-center"
		>
			<h1 class="title h1 p2">
				Acompanhe o seu deputado
			</h1>
			<h2 class="subtitle h2">
				Voce sabe o que seu deputado fez nos ultimos meses?
			</h2>
		</section>
	</div>
</template>

<script>
export default {
	name: 'Home',
	components: {},
};
</script>

<style lang="scss" scoped>
.hero {
	background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
		url('../assets/homeHero.jpg');
	background-size: cover;
	background-position: center;
	height: 70vh;
	.title,
	.subtitle {
		color: #f6f6f4;
	}
}
</style>
