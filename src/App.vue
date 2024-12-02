<template>
  <NavBarComp :logo="logo"/>
  <router-view/>
  <FooterComp :logo="logo"/>
</template>

<script setup>
import NavBarComp from './components/NavBarComp.vue';
import FooterComp from './components/FooterComp.vue';
import logo from './assets/logo/logo_3.png'
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