<template>
	<div id="app">
		<app-header></app-header>
		<router-view />
	</div>
</template>

<script>
import Header from './components/Header.vue';

export default {
	components: {
		appHeader: Header,
	},
};
</script>

<style lang="scss">
@import url('../node_modules/basscss/css/basscss.min.css');
@import url('https://fonts.googleapis.com/css2?family=Kelly+Slab&family=Play&display=swap');

a.logo {
	font-family: 'Kelly Slab', cursive;
	font-weight: bold;
	font-size: 2rem;
}

.hero .is-primary {
	background-color: transparent;
}

.container {
	padding: 1rem;
}

button {
	background-color: #1b3780;
	border: none;
	padding: 0.5rem 1.5rem;
	font-weight: bold;
	color: #f6f6f4;
	border-radius: 5px;
	&:hover {
		background-color: #98d1f3;
		color: #1b3780;
	}
}
</style>
