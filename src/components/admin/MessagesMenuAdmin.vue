<template>
    <div class="flex justify-center Colortext">
        <div class="flex gap-16 mx-2 flex-wrap justify-center text-center items-center dispo">
            <router-link to="/messages-tout" class="bulle p-10 text-xl ColorButon w-1/3 rounded-lg hover:ColorButon cursor-pointer">
                Toutes les demandes
            </router-link>
            <router-link to="/messages-bilan" class="bulle p-10 text-xl ColorButon w-1/3 rounded-lg hover:ColorButon cursor-pointer">
                Bilan de competence
            </router-link>
            <router-link to="/messages-formation" class="bulle p-10 text-xl ColorButon w-1/3 rounded-lg hover:ColorButon cursor-pointer">
                Formation
            </router-link>
            <router-link to="/messages-renseignement" class="bulle p-10 text-xl ColorButon w-1/3 rounded-lg hover:ColorButon cursor-pointer">
                Renseignements
            </router-link>
        </div>
    </div>
</template>


<style scoped>
@media (max-width: 640px) {
    .dispo {
        display: flex;
        flex-direction: column;
    }
    .bulle {
        width: 70%;
    }
}
.ColorButon {
    background-color: var(--color-buton);
}
.Colortext {
    color: var(--color-text);
}
</style>