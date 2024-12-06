<template>
  <NavBarComp />
  <router-view/>
  <FooterComp/>
</template>

<script setup>
import NavBarComp from './components/NavBarComp.vue';
import FooterComp from './components/FooterComp.vue';
import { onMounted } from 'vue';
import store from './store';

onMounted (() => {
  store.dispatch('checkAuth');
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

</style>