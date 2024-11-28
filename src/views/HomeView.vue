<template>
  <BannierAccueilComp :image="image">
    <template #title>FORMATIONS & BILAN DE COMPETENCES</template>
    <template #name>PAULINE BOURDARIAS</template>
    <template #description>
      Parce que chaque parcours est unique, Je vous accompagne avec bienveillance et écoute pour révéler
      votre potentiel et donner du sens à vos projets. Ensemble, construisons un avenir qui vous ressemble.
    </template>
  </BannierAccueilComp>

  <div class="flex flex-col items-center justify-center">
    <h1 class="mt-20">Découvrez de Nouvelles Opportunités</h1>
    <div class="flex gap-10 md:gap-40 m-10  flex-wrap justify-center items-center">
      <!-- Utilisation du composant cardAccueilComp -->
      <cardAccueilComp 
        v-for="(card, index) in cards" 
        :key="index" 
        :bgimage="card.image" 
        :title="card.title" 
        :description="card.description" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BannierAccueilComp from '@/components/BannierAccueilComp.vue';
import cardAccueilComp from '@/components/cardAccueilComp.vue';
import image from '../assets/logo/logo_3.png';

// Exemple de données pour les cartes
const cards = ref([
  {
    image: image,
    title: "Bilan de compétences",
    description: "Découvrez votre potentiel grâce au bilan de compétences.",
  },
  {
    image: image,
    title: "Nos formations",
    description: "Faites le point sur vos compétences et explorez de nouvelles perspectives professionnelles.",
  }
 
]);
</script>

<style scoped>
.fontTitle, h1 {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.875rem /* 30px */;
  line-height: 2.25rem /* 36px */;
}

.fontSubTitle {
  font-family: var(--font-subtitle);
}

.fontText {
  font-family: var(--font-text);
}
</style>
