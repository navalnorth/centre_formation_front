<template>
    <nav class="deg p-5 w-full h-24 flex items-center justify-between">
      <!-- Logo -->
      <div class="w-20 h-20 cursor-pointer" @click="accueil">
        <img class="w-16 h-16" :src="`${url}${logo}`" alt="bilan de competences" title="Accueil"/>
      </div>
  
      <!-- Desktop Navigation -->
      <div class="hidden lg:flex w-1/2 mr-20 justify-around gap-12 text-white fontTitle">
        <router-link class="cursor-pointer hover:text-slate-400" to="/">Accueil</router-link>
        <router-link class="cursor-pointer hover:text-slate-400" to="/about">Qui suis-je ?</router-link>
        <router-link class="cursor-pointer hover:text-slate-400" to="/bilan-de-competences">Bilan de compétences</router-link>
        <router-link class="cursor-pointer hover:text-slate-400" to="/formation">Formation</router-link>
        <router-link class="cursor-pointer hover:text-slate-400" to="/contact">Contactez-moi</router-link>
        <router-link v-if="user.username" class="cursor-pointer hover:text-slate-400" to="/admin-menu">Admin</router-link>
      </div>
  
      <!-- Hamburger Menu (Mobile) -->
      <div @click="toggleBurgerMenu" class="flex lg:hidden cursor-pointer">
        <ChMenuHamburger class="w-14 h-14 text-white" />
      </div>
  
      <!-- Mobile Navigation -->
      <div :class="isOpen ? 'menu open' : 'menu closed'" class="z-40 p-10">
        <router-link class="cursor-pointer hover:text-slate-400" @click="toggleBurgerMenu" to="/">Accueil</router-link>
        <router-link class="cursor-pointer hover:text-slate-400" @click="toggleBurgerMenu" to="/about">Qui suis-je ?</router-link>
        <router-link class="cursor-pointer hover:text-slate-400" @click="toggleBurgerMenu" to="/bilan-de-competences">Bilan de compétences</router-link>
        <router-link class="cursor-pointer hover:text-slate-400" @click="toggleBurgerMenu" to="/formation">Formation</router-link>
        <router-link class="cursor-pointer hover:text-slate-400" @click="toggleBurgerMenu" to="/contact">Contactez-moi</router-link>
        <router-link v-if="user.username" class="cursor-pointer hover:text-slate-400" to="/admin-menu" @click="toggleBurgerMenu">Admin</router-link>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ChMenuHamburger } from '@kalimahapps/vue-icons';
  import router from '@/router';
  import { computed, onBeforeMount, ref } from 'vue';
  import store from '@/store';
  
  const user = computed(() => store.state.user || {});
  const isOpen = ref(false); // False par défaut pour fermer le menu
  const logo = ref('');
  const url = `${process.env.VUE_APP_URL}/uploads/`;
  
  const accueil = () => {
    router.push('/');
  };
  
  const toggleBurgerMenu = () => {
    isOpen.value = !isOpen.value;
  };
  


  const fetchLogo = async () => {
    const cachedLogo = localStorage.getItem('logo');
    if (cachedLogo) {
      logo.value = cachedLogo;
    }
  
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
      const data = result.data[0];
  
      // Mise à jour du logo
      logo.value = data.logo;
      localStorage.setItem('logo', data.logo); // Mise en cache
    } catch (error) {
      console.error('Erreur durant la connexion :', error);
    }
  };
  
  onBeforeMount(() => {
    fetchLogo();
  });
  </script>
  
  <style scoped>
  .deg {
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  }
  
  .menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    background-color: aliceblue;
    width: 100vw;
    padding: 25px 0 20px;
    left: 0;
    top: 96px;
    gap: 20px;
    transform-origin: top;
    transition: transform 0.5s;
  }
  
  .closed {
    transform: scaleY(0);
  }
  
  .open {
    transform: scaleY(1);
  }
  
  .fontTitle {
    font-family: var(--font-title);
  }
  </style>
  