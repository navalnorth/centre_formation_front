<template>
  <div class="flex flex-col items-center w-full h-auto my-10">
    <!-- Ligne de séparation -->
    <div class="w-4/6 h-1 pink my-5"></div>

    <!-- Bouton Scroll vers le haut -->
    <div @click="scrollToTop"
      class="absolute right-0 mr-16 h-12 w-12 flex justify-center items-center cursor-pointer bgBlue hover:bg-slate-400 rounded-full mt-8">
      <MdKeyboardArrowUp class="w-20 h-20 text-white" />
    </div>

    <!-- Logo -->
    <img v-if="logo" class="w-24 md:w-36 h-24 md:h-36 mb-5" :src="`${url}${logo}`" alt="Logo" />

    <!-- Liens principaux -->
    <div class="flex flex-col md:flex-row w-1/2 gap-5 min-w-96 justify-between">
      <router-link class="cursor-pointer hover:text-slate-400" to="/">Qui suis-je ?</router-link>
      <router-link class="cursor-pointer hover:text-slate-400" to="/bilan-de-competences">Bilan de compétences</router-link>
      <router-link class="cursor-pointer hover:text-slate-400" to="/formation">Formation</router-link>
      <router-link class="cursor-pointer hover:text-slate-400" to="/">Contactez-moi</router-link>
    </div>

    <!-- Footer dynamique -->
    <div class="flex flex-col md:flex-row gap-10 my-5">
      <div v-for="footer in footerList" :key="footer.id_footer" class="flex flex-col w-full h-30 items-center">
        <div class="w-16">
          <img v-if="footer.image_footer" :src="`${url}${footer.image_footer}`" class="w-full h-full object-cover rounded-3xl" alt="Footer Image" />
        </div>
        <h3 class="text-center" v-if="footer.title_footer">{{ footer.title_footer }}</h3>
      </div>
    </div>

    <!-- Mentions légales -->
    <div class="my-4">
      <router-link to="/mentions-legales" class="hover:text-slate-400">Mentions Légales</router-link>
    </div>

    <!-- Copyright -->
    <p class="my-4">© Copyright 2024</p>
  </div>
</template>

<script setup>
import { MdKeyboardArrowUp } from '@kalimahapps/vue-icons';
import { onBeforeMount, ref } from 'vue';

// Références pour les données
const footerList = ref([]);
const logo = ref("");
const url = `${process.env.VUE_APP_URL}/uploads/`;

// Fonction : Scroller en haut de la page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// Fonction : Récupérer le logo
const fetchLogo = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_URL}/users/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Erreur lors de la récupération du logo.');
      return;
    }
    const result = await response.json();
    const data = result.data?.[0]; // Utilisation de l'optional chaining pour éviter les erreurs

    logo.value = data?.logo || ''; // Gestion des valeurs manquantes
  } catch (error) {
    console.error('Erreur durant la connexion :', error);
  }
};

// Fonction : Récupérer les footers
const fetchFooters = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_URL}/footer/`);
    if (!response.ok) {
      console.error('Erreur lors de la récupération des footers.');
      return;
    }
    const result = await response.json();
    footerList.value = result.data || []; // Assignation d'une liste vide par défaut
  } catch (error) {
    console.error('Erreur durant la récupération des footers :', error);
  }
};

// Charger les données avant le rendu
onBeforeMount(() => {
  fetchLogo();
  fetchFooters();
});
</script>

<style scoped>
.pink {
  background-color: var(--color-pink);
}

.bgBlue {
  background-color: var(--primary-color);
}
</style>
