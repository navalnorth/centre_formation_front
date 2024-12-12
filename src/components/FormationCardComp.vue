<template>
    <div v-if="cards" class="flex cursor-pointer tout flex-wrap  gap-20 justify-center items-center content-center  my-10 auto-container">
        <div v-for="(card, index) in cards" class="flex flex-col flex-wrap  items-center justify-center" :key="index"
            @mouseover="card.isFlipped = true" @mouseleave="card.isFlipped = false">
            <div class="card-container  flex justify-center relative mx-16 w-72 h-96">
                <div class="card-inner relative w-72  h-96 transform transition-transform duration-500 ease-in-out"
                    :class="{ 'is-flipped': card.isFlipped }">
                    <!-- Face avant -->
                    <div class="card-front absolute w-full h-full  bg-white rounded-lg shadow-lg overflow-hidden">
                        <img :src="`${url}${card.image_formation}`" alt="bilan de competences"
                            class="w-full h-full object-cover" />
                        <div class="absolute inset-0  bg-black bg-opacity-50 flex items-center justify-center">
                            <p class="text-lg font-bold text-white text-center px-4">{{ card.title_formation }}</p>
                        </div>
                    </div>

                    <!-- Face arrière -->
                    <div @click="detail(card.id_formation)"
                        class="card-back ColorPink cursor-pointer absolute flex-col w-full h-full  colortextcard rounded-lg shadow-lg flex items-center justify-center p-4">
                        <p class="text-center text-2xl overflow-auto ">{{ card.description_formation_card }}</p>
                        <p><br>Cliquez pour plus d'informations</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { onBeforeMount, ref } from 'vue';

const detail = (e) => {
    router.push(`/formation/${e}`)
}

const url = `${process.env.VUE_APP_URL}/uploads/`;
const cards = ref([]);

onBeforeMount(() => {
    fetchCardFormation();
});

const fetchCardFormation = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/formation/`, {
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
        const data = result.data;
        cards.value = data;
    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};

</script>

<style scoped>
.card-container {
    perspective: 1000px;
    /* Ajout de perspective pour l'effet de rotation */

}

.ColorPink {
    background-color: var(--color-pink);
    
}
.colortextcard {
    color: var(--color-textcard);
  }
  

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;

}

.card-inner.is-flipped {
    transform: rotateY(180deg);
    /* Retourne la carte */
}

.card-front,
.card-back {
    backface-visibility: hidden;
    /* Cache l'autre face lors de la rotation */
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 1rem;

}

.card-back {
    transform: rotateY(180deg);
    /* Retourne la face arrière */
}

/* Pour s'assurer que l'image et le contenu sont centrés correctement */
.card-front img {
    object-fit: cover;
    width: 100%;
    height: 100%;

}
::-webkit-scrollbar {
    width: 8px;  /* Largeur de la barre de défilement */
    height: 8px; /* Hauteur de la barre de défilement (horizontal) */
}

::-webkit-scrollbar-track {
    background: transparent; /* Supprime le fond du track de la scrollbar */
}

::-webkit-scrollbar-thumb {
    background: white; /* Supprime le fond du curseur de la scrollbar */
}

::-webkit-scrollbar-corner {
    background: transparent; /* Supprime le fond du coin de la scrollbar */
}

.card-container,
.card-inner,
.card-front,
.card-back {

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>