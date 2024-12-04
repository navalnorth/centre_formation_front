<template>
    <nav class="deg p-5 w-full h-24 flex items-center justify-between ">
        <div class="w-20 h-20 content-center" @click="accueil" >
            <img class="w-16 h-16" :src="logo" alt="Logo"  />
        </div>
        <div class="hidden  w-1/2 min-w-96 justify-between lg:flex text-white fontTitle">
            <router-link class="cursor-pointer hover:text-slate-400" to="/">Qui suis-je ?</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" to="/bilan-de-competences">Bilan de compétences</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" to="/">Formation</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" to="/contact">Contactez-moi</router-link>
        </div>

        <div class="hidden lg:flex">
            <p class="bg-white p-2  rounded-xl hover:bg-red-100 fontTitle ">Prendre rendez-vous</p>
        </div>
        <div @click="toggleBurgerMenu" class="flex lg:hidden" >
            <ChMenuHamburger class="w-14 h-14 text-white"/>
        </div>
        <div :class="isOpen ? 'menu closed' : 'menu open' " class="z-40 p-10" >
            <router-link class="cursor-pointer hover:text-slate-400" @click="toggleBurgerMenu" to="/">Qui suis-je ?</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" @click="toggleBurgerMenu" to="/bilan-de-competences">Bilan de compétences</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" @click="toggleBurgerMenu" to="/">Formation</router-link>
            <router-link class="cursor-pointer hover:text-slate-400" @click="toggleBurgerMenu" to="/contact">Contactez-moi</router-link>
            <p class="bg-pink-300 text-white p-2 w-80  rounded-xl hover:bg-red-100 fontTitle"  @click="toggleBurgerMenu" to="/">Prendre rendez-vous</p>
        </div>
    </nav>
</template>

<script setup>

import { ref } from 'vue';

import { ChMenuHamburger } from '@kalimahapps/vue-icons';
import router from '@/router';
const isOpen = ref(true);

const accueil = () => {
    router.push('/')
}

const toggleBurgerMenu = () => {
    isOpen.value = !isOpen.value;
   
}
defineProps({
    logo: String,
  });

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