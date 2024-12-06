<template>
<div class="flex w-full flex-col justify-center items-center">

    <div class="flex flex-col w-full md:flex-row gap-10 flex-wrap items-center justify-center">
        <router-link to="/admin-tableau" class="p-5 text-xl bg-pink-200 mx-4 w-3/4 md:w-1/3 rounded-lg hover:bg-pink-600 cursor-pointer ">Personne intéressé</router-link>
        <router-link to="/" class="p-5 text-xl bg-pink-200 mx-4 w-3/4 md:w-1/3 rounded-lg hover:bg-pink-600 cursor-pointer ">Créer formation</router-link>
    </div>

    <div class="p-5 text-xl w-1/2 border-b-4 border-indigo-950 m-10  ">Modifier mon site</div> 

    <div class="flex gap-6 md:gap-16 mx-2 flex-wrap  justify-center text-center items-center">
        <router-link to="/admin-accueil" class="p-5 md:p-10 text-xl bg-pink-200 w-1/3 rounded-lg  hover:bg-pink-600 cursor-pointer">Accueil</router-link>
        <router-link to="/" class="p-5 md:p-10 text-xl bg-pink-200 w-1/3 rounded-lg  hover:bg-pink-600 cursor-pointer">Bilan</router-link>
        <router-link to="/admin-formation" class="p-5 md:p-10 text-xl bg-pink-200 w-1/3 rounded-lg  hover:bg-pink-600 cursor-pointer">Formation</router-link>
        <router-link to="/" class="p-5 md:p-10 text-xl bg-pink-200 w-1/3 rounded-lg  hover:bg-pink-600 cursor-pointer">Qui <br> suis-je</router-link>
        <router-link to="/" class="p-5 md:p-10 text-xl bg-pink-200 w-1/3 rounded-lg  hover:bg-pink-600 cursor-pointer">Footer</router-link>
        <router-link to="/" class="p-5 md:p-10 text-xl bg-pink-200 w-1/3 rounded-lg  hover:bg-pink-600 cursor-pointer">Logo etc</router-link>

    </div>
</div>
</template>

<script setup>
</script>

<style>
</style>