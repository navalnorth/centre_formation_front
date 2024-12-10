<template>
    <div class="flex w-full flex-col justify-center items-center">

        <div class="flex flex-col w-full md:flex-row gap-10 flex-wrap items-center justify-center">
            <router-link to="/admin-tableau-messages"
                class="p-5 text-xl ColorButon mx-4 w-3/4 md:w-1/3 rounded-lg hover:bg-pink-200 cursor-pointer ">Personne
                intéressé</router-link>
            <router-link to="/formation-admin-creation"
                class="p-5 text-xl ColorButon mx-4 w-3/4 md:w-1/3 rounded-lg hover:bg-pink-200 cursor-pointer ">Créer
                formation</router-link>
        </div>

        <div class="p-5 text-xl w-1/2 border-b-4 border-indigo-950 m-10  ">Modifier mon site</div>

        <div class="flex gap-6 md:gap-16 mx-2 flex-wrap  justify-center text-center items-center">
            <router-link to="/accueil-admin"
                class="p-5 md:p-10 text-xl ColorButon w-1/3 rounded-lg  hover:bg-pink-200 cursor-pointer">Accueil</router-link>
            <router-link to="/bilan-admin"
                class="p-5 md:p-10 text-xl ColorButon w-1/3 rounded-lg  hover:bg-pink-200 cursor-pointer">Bilan</router-link>
            <router-link to="/formation-admin"
                class="p-5 md:p-10 text-xl ColorButon w-1/3 rounded-lg  hover:bg-pink-200 cursor-pointer">Formation</router-link>
            <router-link to="/about-admin"
                class="p-5 md:p-10 text-xl ColorButon w-1/3 rounded-lg  hover:bg-pink-200 cursor-pointer">Qui
                suis-je</router-link>
            <router-link to="/footer-admin"
                class="p-5 md:p-10 text-xl ColorButon w-1/3 rounded-lg  hover:bg-pink-200 cursor-pointer">Footer</router-link>
            <router-link to="/logo-couleurs"
                class="p-5 md:p-10 text-xl ColorButon w-1/3 rounded-lg  hover:bg-pink-200 cursor-pointer">Logo et
                couleurs</router-link>
        </div>
    </div>
</template>

<script setup>
</script>

<style>
.ColorButon {
    background-color: var(--color-buton);

}
</style>