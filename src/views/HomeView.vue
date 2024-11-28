<template>
  <BannierAccueilComp :image="image">
    <template #title>FORMATIONS &  BILAN DE COMPETENCES </template>
    <template #name>PAULINE BOURDARIAS</template>
    <template #description>Parce que chaque parcours est unique, Je vous accompagne avec bienveillance et écoute pour révéler
      votre 
      potentiel
      et donner du sens à vos projets. Ensemble, construisons un avenir qui vous ressemble. </template>
  </BannierAccueilComp>
  <div class="flex flex-col items-center justify-center text-white ">
    
  </div>
 
</template>

<script setup>
import BannierAccueilComp from '@/components/BannierAccueilComp.vue';

import image from '../assets/logo/logo_3.png'
</script>

<style scoped>

</style>
