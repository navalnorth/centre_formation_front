<template>
  <NavBarComp />
  <router-view/>
  <FooterComp/>
</template>

<script setup>
import NavBarComp from './components/NavBarComp.vue';
import FooterComp from './components/FooterComp.vue';
import { onMounted, ref } from 'vue';
import store from './store';

onMounted(() => {
  store.dispatch('checkAuth');
  fetchAccueil();
});

const colordeg1 = ref('');
const colordeg2 = ref('');
const pinkCard = ref('');
const allButon = ref('');
const text = ref('');
const textCard = ref('');

// Fonction pour récupérer les couleurs depuis l'API
const fetchAccueil = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_URL}/users/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, /',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const err = await response.json();
      console.log(err.message || 'Erreur inconnue lors de la connexion.');
      return;
    }

    const result = await response.json();
    const data = result.data[0];
  

    colordeg1.value = data.colordeg1;
    colordeg2.value = data.colordeg2;
    pinkCard.value = data.pinkCard;
    allButon.value = data.allButon;
    text.value = data.colortext;
    textCard.value = data.textcard;

    // Appliquer dynamiquement les couleurs à :root
    document.documentElement.style.setProperty('--primary-color', colordeg1.value);
    document.documentElement.style.setProperty('--secondary-color', colordeg2.value);
    document.documentElement.style.setProperty('--color-pink', pinkCard.value);
    document.documentElement.style.setProperty('--color-buton', allButon.value);
    document.documentElement.style.setProperty('--color-text', text.value);
    document.documentElement.style.setProperty('--color-textcard', textCard.value);

    
  } catch (error) {
    console.error('Erreur durant la connexion : ', error);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Utiliser les couleurs dynamiques ici */
body {
  background: linear-gradient(var(--colordeg1), var(--colordeg2));
}
</style>
