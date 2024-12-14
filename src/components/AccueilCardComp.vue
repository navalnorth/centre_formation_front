<template>
  <div class="flex tout flex-wrap gap-20 justify-center items-center content-center my-10 auto-container">
    <div v-for="(card, index) in cards" :key="index" class="flex flex-col items-center justify-center" 
         @mouseover="card.isFlipped = true" 
         @mouseleave="card.isFlipped = false">
      
      <div class="card-container flex justify-center relative w-72 h-96">
        <div class="card-inner relative w-72 h-96 transform transition-transform duration-500 ease-in-out" 
             :class="{ 'is-flipped': card.isFlipped }">

          <!-- Face avant -->
          <div class="card-front absolute w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
            <img :src="`${url}${card.bgimage}`" alt="Card image" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p :class="['text-lg', 'font-bold', 'text-white', 'text-center', 'px-4', 'colortext']">{{ card.title }}</p>
            </div>
          </div>

          <!-- Face arrière -->
          <div @click="navigateTo(card.route)" class="card-back absolute flex-col w-full h-full rounded-lg shadow-lg flex items-center justify-center p-4 ColorPink colortextcard">
            <p class="text-center text-2xl line-clamp-6">{{ card.description }}</p>
            <p><br>Cliquez pour plus d'informations</p>
          </div>
        </div>
      </div>

      <div class="hidden md:flex items-center justify-center flex-col">
        <img class="h-20 w-10 my-2" src="../assets/image/ArrowB.png" alt="Bilan de competences" />
        <p :class="['bgBlue', 'colortext', 'm-5', 'rounded-3xl', 'p-5']">{{ card.infoBull1 }}</p>
        <img class="h-20 w-10 my-2" src="../assets/image/ArrowB.png" alt="Bilan de competences" />
        <p :class="['bgBlue', 'colortext', 'm-5', 'rounded-3xl', 'p-5', 'mb-5']">{{ card.infoBull2 }}</p>
      </div>
    </div>
  </div>
  
  <div>
    <p class="flex md:hidden justify-center mt-20 text-xl md:text-3xl fontTitle mb-10"> Plus d'informations</p>
    <div v-for="(card, index) in cards" :key="index" class="flex md:hidden flex-col items-center justify-center">
      <div class="items-center justify-center flex flex-col">
        <p :class="['bgBlue', 'colortext', 'm-2', 'mt-5', 'rounded-3xl', 'p-5']">{{ card.title }}</p>
        <img class="h-20 w-10 my-2 textpi" src="../assets/image/ArrowB.png" alt="Formation" />
        <p :class="['bgBlue', 'colortext', 'm-2', 'rounded-3xl', 'p-5']">{{ card.infoBull1 }}</p>
        <img class="h-20 w-10 my-2" src="../assets/image/ArrowB.png" alt="Formation" />
        <p :class="['bgBlue', 'colortext', 'm-2', 'rounded-3xl', 'p-5', 'mb-16']">{{ card.infoBull2 }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const url = `${process.env.VUE_APP_URL}/uploads/`;
const cards = ref([]);

// Fonction centrale pour charger les données depuis l'API ou le localStorage
const loadCardsData = async () => {
  // Vérifiez si des données existent dans le localStorage
  const storedData = localStorage.getItem('cardsData');

  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        // Si les données locales sont valides, les charger
        updateCards(parsedData);
        console.log('Données chargées depuis le localStorage:', parsedData);
        return;
      }
    } catch (error) {
      console.warn('Erreur lors du parsing des données du localStorage:', error);
    }
  }

  // Sinon, charger les données depuis l'API
  await fetchCardsFromAPI();
};

// Fonction pour récupérer les cartes depuis l'API
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
    console.log('Données récupérées depuis l\'API et sauvegardées:', data);

    // Mettre à jour l'état local
    updateCards(data);
  } catch (error) {
    console.error('Erreur lors de la connexion à l\'API:', error);
  }
};

// Fonction pour mettre à jour les cartes et ajouter des routes
const updateCards = (data) => {
  cards.value = data.map((card) => ({
    ...card,
    route: determineRoute(card),
    isFlipped: false, // Initialisation de l'état de rotation
  }));
};

// Fonction pour déterminer les routes en fonction des titres
const determineRoute = (card) => {
  switch (card.title) {
    case 'Bilan de compétences':
      return '/bilan-de-competences';
    case 'Nos formations':
      return '/formation';
    default:
      return '/'; // Route par défaut
  }
};

// Fonction pour naviguer vers une route spécifique
const navigateTo = (route) => {
  if (!route) {
    console.error('La route est manquante pour cette carte.');
    return;
  }

  router.push(route).catch((err) => {
    if (err.name !== 'NavigationDuplicated') {
      console.error('Erreur de navigation:', err);
    }
  });
};

// Charger les données au montage du composant
onBeforeMount(async () => {
  await loadCardsData();
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
