<template>
  <div v-if="isDataLoaded">
    <NavBarComp />
    <router-view />
    <FooterComp />
  </div>
  <div v-else-if="hasError" class="error-page">
    
    <h1>Erreur de Chargement</h1>
    <p>Nous avons rencontré un problème lors de la récupération des données.</p>
    <p> {{ messageerreur }}</p>
    <button @click="retryFetch">Réessayer</button>
  </div>
</template>

<script setup>
import NavBarComp from './components/NavBarComp.vue';
import FooterComp from './components/FooterComp.vue';
import { onBeforeMount, ref } from 'vue';
import store from './store';

const colordeg1 = ref('');
const colordeg2 = ref('');
const pinkCard = ref('');
const allButon = ref('');
const text = ref('');
const textCard = ref('');
const isDataLoaded = ref(false); // Variable pour surveiller si les données sont chargées
const hasError = ref(false); // Variable pour indiquer une erreur
const messageerreur = ref('')
// Fonction pour récupérer les couleurs depuis l'API
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
      messageerreur.value = err.message
      console.log(err.message || 'Erreur inconnue lors de la connexion.');
      throw new Error(err.message || 'Erreur inconnue lors de la connexion.');
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

    // Marquer les données comme chargées
    isDataLoaded.value = true;
  } catch (error) { 
    messageerreur.value = error
    console.error('Erreur durant la connexion : ', error);
    hasError.value = true; // Passer en mode erreur
  }
};

// Fonction pour réessayer de charger les données
const retryFetch = async () => {
  hasError.value = false; // Réinitialiser l'état d'erreur
  await fetchAccueil(); // Réessayer de récupérer les données
};

onBeforeMount(async () => {
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

.error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  background-color: #f8d7da;
  color: #721c24;
}

.error-page h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.error-page p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.error-page button {
  background-color: #721c24;
  color: white;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-page button:hover {
  background-color: #a94442;
}
</style>
