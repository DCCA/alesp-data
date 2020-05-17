<template>
	<nav class="container flex items-center">
		<router-link tag="a" to="/" class="logo">AlespData</router-link>
		<div class="nav-left mx1 px1 flex-auto">
			<router-link tag="a" class="navbar-item" to="/deputados"
				>Deputados</router-link
			>
		</div>
		<div class="nav-right ">
			<router-link to="/" tag="button" class="mx1">Login</router-link>
			<router-link to="/" tag="button" class="mx1">SignUp</router-link>
		</div>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			// isHome: false,
		};
	},
	computed: {
		isHome() {
			if (this.$route.path === '/') {
				return true;
			}
			return false;
		},
	},
};
</script>

<style lang="scss" scoped>
nav a {
	color: #1b3780;
	text-decoration: none;
	&:link {
		color: #1b3780;
	}
	&:hover {
		color: #98d1f3;
	}
}
</style>
