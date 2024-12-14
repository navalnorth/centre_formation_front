<template>
  <NavBarComp />
  <router-view />
  <FooterComp />
</template>

<script setup>
import NavBarComp from './components/NavBarComp.vue';
import FooterComp from './components/FooterComp.vue';
import { onBeforeMount, ref } from 'vue';
import store from './store';

const isDataLoaded = ref(false);
const hasError = ref(false);
const messageerreur = ref('');



const updateFavicon = (newLogoUrl) => {
  const favicon = document.getElementById('dynamic-favicon');
  if (favicon) {
    favicon.href = newLogoUrl;
  }
};



const fetchAccueil = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_URL}/users/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, /',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const err = await response.json();
      messageerreur.value = err.message;
      throw new Error(err.message || 'Erreur inconnue lors de la connexion.');
    }

    const result = await response.json();
    const data = result.data[0];

    // Sauvegarde des couleurs dans localStorage
    localStorage.setItem('colordeg1', data.colordeg1);
    localStorage.setItem('colordeg2', data.colordeg2);
    localStorage.setItem('pinkCard', data.pinkCard);
    localStorage.setItem('allButon', data.allButon);
    localStorage.setItem('text', data.colortext);
    localStorage.setItem('textCard', data.textcard);

    applyColors();

    isDataLoaded.value = true;


    const currentLogoUrl = `${process.env.VUE_APP_URL}/uploads/${data.logo}`;
    updateFavicon(currentLogoUrl);
  } catch (error) {
    messageerreur.value = error.message || error;
    console.error('Erreur durant la connexion : ', error);
    hasError.value = true;
  }
};

const applyColors = () => {
  const colordeg1 = localStorage.getItem('colordeg1');
  const colordeg2 = localStorage.getItem('colordeg2');
  const pinkCard = localStorage.getItem('pinkCard');
  const allButon = localStorage.getItem('allButon');
  const text = localStorage.getItem('text');
  const textCard = localStorage.getItem('textCard');

  if (colordeg1 && colordeg2 && pinkCard && allButon && text && textCard) {
    document.documentElement.style.setProperty('--primary-color', colordeg1);
    document.documentElement.style.setProperty('--secondary-color', colordeg2);
    document.documentElement.style.setProperty('--color-pink', pinkCard);
    document.documentElement.style.setProperty('--color-buton', allButon);
    document.documentElement.style.setProperty('--color-text', text);
    document.documentElement.style.setProperty('--color-textcard', textCard);
  } else {
    console.error("Les couleurs ne sont pas valides dans localStorage");
  }
};

onBeforeMount(async () => {
  applyColors();
  await fetchAccueil();
  await store.dispatch('checkAuth');
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
