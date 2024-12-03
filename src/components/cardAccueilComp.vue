<template>
  <div class="flex flex-col justify-center items-center my-10">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="card-container relative w-72 h-96"
      @mouseover="card.isFlipped = true"
      @mouseleave="card.isFlipped = false"
    >
      <div
        class="card-inner transform transition-transform duration-500 ease-in-out"
        :class="{ 'is-flipped': card.isFlipped }"
      >
        <!-- Face avant -->
        <div class="card-front absolute w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
          <img :src="`${url}${card.bgimage}`" alt="Card image" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h3 class="text-lg font-bold text-white text-center px-4">{{ card.title }}</h3>
          </div>
        </div>

        <!-- Face arrière -->
        <div class="card-back absolute flex-col w-full h-full bg-pink-100 text-black rounded-lg shadow-lg flex items-center justify-center p-4">
          <p class="text-center text-2xl line-clamp-6">{{ card.description }}</p>
          <p><br>Cliquez pour plus d'informations</p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center flex-col">
      <img class="h-20 w-10 my-5" src="../assets/image/ArrowB.png" alt="Arrow Icon" />
      <p class="bgBlue text-white m-5 rounded-3xl p-5">{{ infoBull1 }}</p>
      <img class="h-20 w-10 my-5" src="../assets/image/ArrowB.png" alt="Arrow Icon" />
      <p class="bgBlue text-amber-300 m-5 rounded-3xl p-5 mb-5">{{ infoBull2 }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const url = `${process.env.VUE_APP_URL}/uploads/`;
const cards = ref([]);
const infoBull1 = ref('Information 1');
const infoBull2 = ref('Information 2');

const fetchCard = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_URL}/card/`, {
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
    cards.value = result.data.map(card => ({ ...card, isFlipped: false })); // Ajout de `isFlipped` à chaque carte
  } catch (error) {
    console.error('Erreur durant la connexion :', error);
  }
};

onMounted(fetchCard);
</script>

<style scoped>
.bgBlue {
  background-color: var(--color-blue);
}

.card-container {
  perspective: 1000px;
  /* Ajout de perspective pour l'effet de rotation */
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
</style>
