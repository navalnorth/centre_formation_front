<template>
    <div class="flex flex-col items-center w-full h-auto my-10">
        <div class="w-4/6 h-1 pink my-5"></div>
        <img class="w-24 md:w-44 h-24 md:h-44 mb-5 " :src="`${url}${logo}`" alt="logo" />
        <div class="flex flex-col md:flex-row w-1/2 min-w-96 justify-between">
            <router-link class="cursor-pointer hover:text-slate-400" to="/">Qui suis-je ?</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" to="/bilan-de-competences">Bilan de compétences</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" to="/">Formation</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" to="/">Contactez-moi</router-link>
        </div>
        <div class="my-10">
            <AkLinkedinV2Fill class="h-10 w-10"/>
        </div>
        <p>© Copyright 2024</p>
    </div>
</template>

<script setup>
import { AkLinkedinV2Fill } from '@kalimahapps/vue-icons';

import { onMounted, ref } from 'vue';

onMounted(() => {
    fetchLogo();
});


const logo = ref("");
const url = `${process.env.VUE_APP_URL}/uploads/`;
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
      const errorMessage = (await response.json()).message || 'Erreur inconnue lors de la connexion.';
      console.error(errorMessage);
      return;
    }

    const result = await response.json();
    const data = result.data[0];
    
    logo.value = data.logo
    
  } catch (error) {
    console.error('Erreur durant la connexion :', error);
  }
};

</script>

<style>

.pink {
    background-color: var(--color-pink);
  }
</style>