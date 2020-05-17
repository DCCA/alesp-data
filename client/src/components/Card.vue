<template>
	<div class="sm-col sm-col-12 md-col-4 col-12 col">
		<div class="card flex m1  rounded p2">
			<div
				:style="{ backgroundImage: `url(${imageUrl})` }"
				class="deputado-photo rounded"
			></div>
			<div
				class="deputado-information container flex flex-column justify-between"
			>
				<div class="flex flex-column">
					<h2 class="h3 py1">{{ name }}</h2>
					<p class="py1">{{ party }}</p>
				</div>
				<router-link
					tag="button"
					class="mt1 self-strech"
					:to="`/deputado/${id}`"
					>Ver Mais</router-link
				>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true,
		},
		party: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.card {
	// border-color: #1b3780;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
	&:hover {
		background-color: #99a4c5;
	}
	.deputado-photo {
		height: 12rem;
		width: 16rem;
		background-size: cover;
		background-position: center;
	}
	.deputado-information {
		width: 70%;
	}
}
</style>
