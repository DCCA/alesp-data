<template>
  <div id="app">
    <div v-if="loading">
      <h2>Is loading</h2>
    </div>
    <template v-else>
      <app-header></app-header>
      <router-view />
      <app-footer></app-footer>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  computed: mapState({
    loading: "isLoading"
  })
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css");
@import url("../node_modules/basscss/css/basscss.min.css");
@import url("https://fonts.googleapis.com/css2?family=Kelly+Slab&family=Play&display=swap");

body {
  background-color: #f6f6f4;
  font-family: "Play";
}

a.logo {
  font-family: "Kelly Slab", cursive;
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
