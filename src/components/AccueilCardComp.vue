<template>
  <div class="flex tout flex-wrap gap-20 justify-center items-center content-center my-10 auto-container">
    <!-- Première carte -->
    <div class="flex flex-col items-center justify-center" 
         @mouseover="firstCard.isFlipped = true" 
         @mouseleave="firstCard.isFlipped = false">
      
      <div class="card-container flex justify-center relative w-72 h-96">
        <div class="card-inner relative w-72 h-96 transform transition-transform duration-500 ease-in-out" 
             :class="{ 'is-flipped': firstCard.isFlipped }">

          <!-- Face avant -->
          <div class="card-front absolute w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
            <img :src="`${url}${firstCard.bgimage}`" alt="Card image" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p :class="['text-lg', 'font-bold', 'text-white', 'text-center', 'px-4', 'colortext']">{{ firstCard.title }}</p>
            </div>
          </div>

          <!-- Face arrière -->
          <div @click="routerbilan" class="card-back absolute flex-col w-full h-full rounded-lg shadow-lg flex items-center justify-center p-4 ColorPink colortextcard">
            <p class="text-center text-2xl line-clamp-6">{{ firstCard.description }}</p>
            <p><br>Cliquez pour plus d'informations</p>
          </div>
        </div>
      </div>

      <div class="hidden md:flex items-center justify-center flex-col">
        <img class="h-20 w-10 my-2" src="../assets/image/ArrowB.png" alt="Bilan de competences" />
        <p :class="['bgBlue', 'colortext', 'm-5', 'rounded-3xl', 'p-5']">{{ firstCard.infoBull1 }}</p>
        <img class="h-20 w-10 my-2" src="../assets/image/ArrowB.png" alt="Bilan de competences" />
        <p :class="['bgBlue', 'colortext', 'm-5', 'rounded-3xl', 'p-5', 'mb-5']">{{ firstCard.infoBull2 }}</p>
      </div>
    </div>

    <!-- Deuxième carte -->
    <div class="flex flex-col items-center justify-center" 
         @mouseover="secondCard.isFlipped = true" 
         @mouseleave="secondCard.isFlipped = false">
      
      <div class="card-container flex justify-center relative w-72 h-96">
        <div class="card-inner relative w-72 h-96 transform transition-transform duration-500 ease-in-out" 
             :class="{ 'is-flipped': secondCard.isFlipped }">

          <!-- Face avant -->
          <div class="card-front absolute w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
            <img :src="`${url}${secondCard.bgimage}`" alt="Card image" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p :class="['text-lg', 'font-bold', 'text-white', 'text-center', 'px-4', 'colortext']">{{ secondCard.title }}</p>
            </div>
          </div>

          <!-- Face arrière -->
          <div @click="routerformation" class="card-back absolute flex-col w-full h-full rounded-lg shadow-lg flex items-center justify-center p-4 ColorPink colortextcard">
            <p class="text-center text-2xl line-clamp-6">{{ secondCard.description }}</p>
            <p><br>Cliquez pour plus d'informations</p>
          </div>
        </div>
      </div>

      <div class="hidden md:flex items-center justify-center flex-col">
        <img class="h-20 w-10 my-2" src="../assets/image/ArrowB.png" alt="Bilan de competences" />
        <p :class="['bgBlue', 'colortext', 'm-5', 'rounded-3xl', 'p-5']">{{ secondCard.infoBull1 }}</p>
        <img class="h-20 w-10 my-2" src="../assets/image/ArrowB.png" alt="Bilan de competences" />
        <p :class="['bgBlue', 'colortext', 'm-5', 'rounded-3xl', 'p-5', 'mb-5']">{{ secondCard.infoBull2 }}</p>
      </div>
    </div>
  </div>
  
  <div>
    <p class="flex md:hidden justify-center mt-20 text-xl md:text-3xl fontTitle mb-10"> Plus d'informations</p>
    <!-- Première carte pour mobile -->
    <div class="flex md:hidden flex-col items-center justify-center">
      <div class="items-center justify-center flex flex-col">
        <p :class="['bgBlue', 'colortext', 'm-2', 'mt-5', 'rounded-3xl', 'p-5']">{{ firstCard.title }}</p>
        <img class="h-20 w-10 my-2 textpi" src="../assets/image/ArrowB.png" alt="Formation" />
        <p :class="['bgBlue', 'colortext', 'm-2', 'rounded-3xl', 'p-5']">{{ firstCard.infoBull1 }}</p>
        <img class="h-20 w-10 my-2" src="../assets/image/ArrowB.png" alt="Formation" />
        <p :class="['bgBlue', 'colortext', 'm-2', 'rounded-3xl', 'p-5', 'mb-16']">{{ firstCard.infoBull2 }}</p>
      </div>
    </div>
    
    <!-- Deuxième carte pour mobile -->
    <div class="flex md:hidden flex-col items-center justify-center">
      <div class="items-center justify-center flex flex-col">
        <p :class="['bgBlue', 'colortext', 'm-2', 'mt-5', 'rounded-3xl', 'p-5']">{{ secondCard.title }}</p>
        <img class="h-20 w-10 my-2 textpi" src="../assets/image/ArrowB.png" alt="Formation" />
        <p :class="['bgBlue', 'colortext', 'm-2', 'rounded-3xl', 'p-5']">{{ secondCard.infoBull1 }}</p>
        <img class="h-20 w-10 my-2" src="../assets/image/ArrowB.png" alt="Formation" />
        <p :class="['bgBlue', 'colortext', 'm-2', 'rounded-3xl', 'p-5', 'mb-16']">{{ secondCard.infoBull2 }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const url = `${process.env.VUE_APP_URL}/uploads/`;

// Définir les cartes
const firstCard = ref({
  title: '',
  description: '',
  bgimage: '',
  route: '',
  infoBull1: '',
  infoBull2: '',
  isFlipped: false
});

const secondCard = ref({
  title: '',
  description: '',
  bgimage: '',
  route: '',
  infoBull1: '',
  infoBull2: '',
  isFlipped: false
});

const routerbilan = () => {
  router.push('/bilan-de-competences')
}
const routerformation = () => {
  router.push('/formation')
}



const fetchCardsFromAPI = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_URL}/card/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Erreur lors de la récupération des données depuis l\'API');
      return;
    }

    const result = await response.json();
    const data = result.data;

    // Sauvegarder les données dans le localStorage
    localStorage.setItem('cardsData', JSON.stringify(data));

    // Assigner les données aux deux cartes
    firstCard.value = {
      title: data[0].title,
      description: data[0].description,
      bgimage: data[0].bgimage,
      infoBull1: data[0].infoBull1,
      infoBull2: data[0].infoBull2,
      isFlipped: false
    };

    secondCard.value = {
      title: data[1].title,
      description: data[1].description,
      bgimage: data[1].bgimage,
      infoBull1: data[1].infoBull1,
      infoBull2: data[1].infoBull2,
      isFlipped: false
    };

  } catch (error) {
    console.error('Erreur lors de la connexion à l\'API:', error);
  }
};

onBeforeMount(async () => {
  // D'abord vérifier dans le localStorage
  const storedData = localStorage.getItem('cardsData');

  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        // Si les données existent déjà dans le localStorage, les utiliser
        firstCard.value = {
          title: parsedData[0].title,
          description: parsedData[0].description,
          bgimage: parsedData[0].bgimage,
          route: parsedData[0].route,
          infoBull1: parsedData[0].infoBull1,
          infoBull2: parsedData[0].infoBull2,
          isFlipped: false
        };

        secondCard.value = {
          title: parsedData[1].title,
          description: parsedData[1].description,
          bgimage: parsedData[1].bgimage,
          route: parsedData[1].route,
          infoBull1: parsedData[1].infoBull1,
          infoBull2: parsedData[1].infoBull2,
          isFlipped: false
        };
      }
    } catch (error) {
      console.warn('Erreur lors du parsing des données du localStorage:', error);
    }
  } 
    await fetchCardsFromAPI();
  
});
</script>


<style scoped>
.auto-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centre les cartes horizontalement */
  align-items: center; /* Centre les cartes verticalement */
  gap: 20px;
}
.ColorPink {
  background-color: var(--color-pink);
}

.colortext {
  color: var(--color-text);
}

.colortextcard {
  color: var(--color-textcard);
}

.tout {
  background-image: url("../assets/image/LogoTampon.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.bgBlue {
  background-color: var(--primary-color);
}
.colortext {
  color: var(--color-text);
}

.card-container {
  perspective: 1000px; /* Ajout de perspective pour l'effet de rotation */
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.card-inner.is-flipped {
  transform: rotateY(180deg); /* Retourne la carte */
}

.card-front,
.card-back {
  backface-visibility: hidden; /* Cache l'autre face */
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
}

.card-back {
  transform: rotateY(180deg); /* Retourne la face arrière */
}

.card-front img {
  object-fit: cover;
  width: 100%;
  height: 100%;
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
