<template>
  <div class="container clearfix">
    <div v-if="deputado == undefined">
      <h1>Loading</h1>
    </div>
    <div
      :style="{ backgroundImage: `url(${deputado.deputado.pathfoto})` }"
      class="deputado-photo rounded col col-4"
    ></div>
    <div class="col p2 sm-col-12 md-col-6 lg-col-6 col-12">
      <h1 class="h1 py1">{{ deputado.deputado.nomeparlamentar }}</h1>
      <p class="h4 py1">
        <span class="bold">Partido:</span>
        {{ deputado.deputado.partido }}
      </p>
      <p class="h4 py1">
        <span class="bold">E-mail:</span>
        {{ deputado.deputado.email }}
      </p>
      <p class="h4 py1">
        <span class="bold">Total Gasto:</span>
        R$ {{ formatNumber(deputado.value[0].totalValue) }}
      </p>
      <p class="h4 py1">
        <span class="bold pb1">Areas de Atuacao:</span>
		<ul>
			<li v-for="(area, index) in deputado.deputado.areaDeAtuacao" :key="index">- {{area.areaDeAtuacao}}</li>
		</ul>
      </p>
		<p class="h4 py1 pb1">
        <span class="bold pb2">Base Eleitoral:</span>
		<ul>
			<li v-for="(base, index) in deputado.deputado.baseEleitoral" :key="index">- {{base.baseEleitoral}}</li>
		</ul>
      </p>
    </div>
    <div class="bio col col-12 my2">
      <div class="bio-text" v-html="sanitizeHtml(deputado.deputado.biografia)"></div>
    </div>
  </div>
</template>

<script>
import sanitizeHtml from "sanitize-html";
import numeral from "numeral";

export default {
  methods: {
    formatNumber(num) {
      return numeral(num).format("0.0[,]0");
    },
    sanitizeHtml(text) {
      return sanitizeHtml(text);
    }
  },
  computed: {
    deputado() {
      return this.$store.state.deputado;
    },
    value() {
      return this.$store.state.deputado.value;
    }
  },
  watch: {},
  beforeMount() {
    const id = this.$route.params.id;
    this.$store.dispatch("getDeputado", id);
  }
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
