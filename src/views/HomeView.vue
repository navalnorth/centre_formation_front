<template>
  <BannierAccueilComp :image="urlImageBannier">
    <template #title>{{ title }}</template>
    <template #name>{{ name }}</template>
    <template #description>
      {{ description }}
    </template>
  </BannierAccueilComp>

  <!-- Section d'upload d'image -->
  <!-- <label class="file-upload">
    <input type="file" id="image" name="image" accept="image/*" @change="onFileChange" />
    <div v-if="imageUrl" :style="`background-image:url('${imageUrl}')`" class="file-upload"></div>
  </label>

  <button @click="fetchUpdateAccueil">
    Upload Image
  </button> -->

  <div class="flex flex-col items-center justify-center">
    <h1 class="mt-20"> {{ title_section }} </h1>
    <div class="flex  my-10  flex-wrap justify-center items-center">
      <!-- Utilisation du composant cardAccueilComp -->
      <cardAccueilComp v-for="(card, index) in cards" :key="index" :bgimage="card.bgimage" :title="card.title"
        :description="card.description" :infoBull1="card.infoBull1" :infoBull2="card.infoBull2" />
    </div>
  </div>

  <BannierComp :logo="image">
    <template #title> {{ banTitle }} </template>
    <template #description>
      {{ banDescription }}
    </template>
  </BannierComp>

</template>


<script setup>
import { ref } from 'vue';
import BannierComp from '@/components/BannierComp.vue';
import BannierAccueilComp from '@/components/BannierAccueilComp.vue';
import cardAccueilComp from '@/components/cardAccueilComp.vue';
import router from '@/router';
import { onMounted } from 'vue';

const urlImageBannier = ref('')

const url = `${process.env.VUE_APP_IP_ADDRESS}/uploads/`;
const imageUrl = ref('');



const title = ref('FORMATIONS & BILAN DE COMPETENCES');
const title_section = ref('Découvrez de Nouvelles Opportunités');
const name = ref('PAULINE BOURDARIAS');
const description = ref('Parce que chaque parcours est unique, Je vous accompagne avec bienveillance et écoute pour révéler votre potentiel et donner du sens à vos projets. Ensemble, construisons un avenir qui vous ressemble.');
const banTitle = ref('');
const banDescription = ref('');
const cards = ref([]);

onMounted(() => {
  fetchAccueil();
  fetchCard();
  fetchBannier();
});

const fetchAccueil = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_URL}/accueil/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, /',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const err = await response.json();
      console.log(err.message || 'Erreur inconnue lors de la connexion.');
      return;
    }

    const result = await response.json();
    const data = result.data[0];
    title.value = data.title_accueil;
    title_section.value = data.title_section;
    name.value = data.name;
    description.value = data.description;
    urlImageBannier.value = data.image_accueil

    

  } catch (error) {
    console.error('Erreur durant la connexion : ', error);
  }
};

/*cette partie est pour l ajoute d image */

const imageName = ref('');

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageName.value = file.name;  // Stocke le nom de l'image
    const reader = new FileReader();

    reader.onload = (e) => {
      imageUrl.value = e.target.result; // Contient les données de l'image en base64
    };

    reader.readAsDataURL(file); // Convertit le fichier en Base64
  }
};

const fetchUpdateAccueil = async () => {
  const fileInput = document.getElementById('image');
  const file = fileInput.files[0]; // Récupère le fichier sélectionné

  // Check if the file exists
  if (!file) {
    console.error("No file selected.");
    return;
  }

  // Crée un objet FormData pour envoyer l'image
  const formData = new FormData();
  formData.append("image_accueil", file);

  try {
    const response = await fetch(`${process.env.VUE_APP_URL}/accueil/modifierAccueilImage`, {
      method: 'PUT',
      body: formData, // Utilise FormData pour l'upload
    });

    if (!response.ok) {
      const err = await response.json();
      console.log(err.message || 'Erreur inconnue lors de la connexion.');
      return;
    }

    const result = await response.json();
    console.log(result); // Vérifie la réponse

  } catch (error) {
    console.error('Erreur durant la connexion : ', error);
  }
};

const fetchCard = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_URL}/card/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const err = await response.json();
      console.log(err.message || 'Erreur inconnue lors de la connexion.');
      return;
    }

    const result = await response.json();
    const data = result.data;
    cards.value.push(...data);
    console.log(cards);
    
  } catch (error) {
    console.error('Erreur durant la connexion : ', error);
  }
};

const fetchBannier = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_URL}/bannier/1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const err = await response.json();
      console.log(err.message || 'Erreur inconnue lors de la connexion.');
      return;
    }

    const result = await response.json();
    const data = result.data;

    banTitle.value = data.titre_bannier;
    banDescription.value = data.description_bannier;

  } catch (error) {
    console.error('Erreur durant la connexion : ', error);
  }
};

</script>

<style scoped>
.file-upload {
  width: 350px;
  height: 400px;
  border: 1px solid rgba(249, 112, 104, 1);
  display: flex;
  background-position: center;
  background-size: cover;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 35px;
  margin: auto;
}

.file-upload input[type="file"] {
  display: none;
}

.uploadPicture {
  width: 60px;
  height: 60px;
}

.fontTitle,
h1 {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.875rem
    /* 30px */
  ;
  line-height: 2.25rem
    /* 36px */
  ;
}

.fontSubTitle {
  font-family: var(--font-subtitle);
}

.fontText {
  font-family: var(--font-text);
}
</style>
