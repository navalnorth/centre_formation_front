<template>
    <div class="flex justify-center">
        <div class="flex gap-16 mx-2 flex-wrap justify-center text-center items-center dispo">
            <router-link to="/admin-toute" class="bulle p-10 text-xl ColorButon w-1/3 rounded-lg hover:ColorButon cursor-pointer">
                Toutes les demandes
            </router-link>
            <router-link to="/admin-bilan" class="bulle p-10 text-xl ColorButon w-1/3 rounded-lg hover:ColorButon cursor-pointer">
                Bilan de competence
            </router-link>
            <router-link to="/admin-formation" class="bulle p-10 text-xl ColorButon w-1/3 rounded-lg hover:ColorButon cursor-pointer">
                Formation
            </router-link>
            <router-link to="/admin-renseignement" class="bulle p-10 text-xl ColorButon w-1/3 rounded-lg hover:ColorButon cursor-pointer">
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

</style>