<template>
    <nav class="deg p-5 w-full h-24 flex items-center justify-between ">
       
        <div class="w-20 h-20 content-center cursor-pointer" @click="accueil" >
            <img class="w-16 h-16" :src="`${url}${logo}`" alt="Logo"  />
        </div>
        <div class="hidden  w-1/2 min-w-96 justify-between lg:flex text-white fontTitle">
            <router-link class="cursor-pointer hover:text-slate-400" to="/about">Qui suis-je ?</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" to="/bilan-de-competences">Bilan de compétences</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" to="/formation">Formation</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" to="/contact">Contactez-moi</router-link>
        </div>

        <div class="hidden lg:flex">
            <p class="bg-white p-2  rounded-xl hover:bg-red-100 fontTitle ">Prendre rendez-vous</p>
        </div>
        <div @click="toggleBurgerMenu" class="flex lg:hidden" >
            <ChMenuHamburger class="w-14 h-14 text-white"/>
        </div>
        <div :class="isOpen ? 'menu closed' : 'menu open' " class="z-40 p-10" >
            <router-link class="cursor-pointer hover:text-slate-400" @click="toggleBurgerMenu" to="/about">Qui suis-je ?</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" @click="toggleBurgerMenu" to="/bilan-de-competences">Bilan de compétences</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" @click="toggleBurgerMenu" to="/formation">Formation</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" @click="toggleBurgerMenu" to="/contact">Contactez-moi</router-link>
            <p class="bg-pink-300 text-white p-2 w-80  rounded-xl hover:bg-red-100 fontTitle"  @click="toggleBurgerMenu" to="/">Prendre rendez-vous</p>
        </div>
    </nav>
</template>

<script setup>

import { ChMenuHamburger  } from '@kalimahapps/vue-icons';
import router from '@/router';
const isOpen = ref(true);

const accueil = () => {
    router.push('/')
}

const toggleBurgerMenu = () => {
    isOpen.value = !isOpen.value;
   
}

import { onMounted, ref } from 'vue';

onMounted(() => {
    fetchLogo();
});


const logo = ref("logo.png");
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

<style scoped>
.deg{
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
}

.menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    background-color: aliceblue;
    width: 100vw;
    margin: 0;
    padding-top: 25px;
    left: 0;
    right: 0;
    top: 96px;
    gap: 20px;
    padding-bottom: 20px;
    transition: .5s;
    transform-origin: top; 
}

.closed {
    transform: scaleY(0);
    transition: .2s;
}
.open {
    transform: scaleY(1);
   
}

.fontTitle {
    font-family: var(--font-title);
    
}
.fontSubTitle {
    font-family: var(--font-subtitle);
}
.fontText {
    font-family: var(--font-text);
}
</style>