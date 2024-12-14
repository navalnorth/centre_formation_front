<template>
  <div class="flex flex-col items-center justify-center colortext">
    <div class="background-div">
      <div class="flex items-center justify-center flex-wrap-reverse gap-10 md:gap-44 w-full my-10">
        <div class="text-center md:text-left md:w-1/3 w-full">
          <h1 class="text-xl md:text-3xl font-bold fontTitle md:p-0 px-5">{{ title }}</h1>
          <p class="text-base md:text-xl mt-2 font-light">{{ name }}</p>
          <p class="mt-4 text-base sp fontSubTitle w-full break-words md:p-0 px-5">{{ description }}</p>
        </div>

        <div class="flex flex-col overflow-hidden items-center">
          <div class="w-64">
            <img :src="`${url}${urlImageBannier}`" class="w-full h-full object-cover rounded-3xl" alt="formations" />
          </div>
          <button class="p-2 mt-5 bg-white text-black w-56 rounded-xl text-center cursor-pointer"
            data-testid="about-button" @click="about">
            Qui suis-je ?
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="flex w-full justify-center items-center">
    <p class="mt-20 text-xl md:text-3xl fontTitle"> {{ title_section }} </p>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';

const router = useRouter()

const url = `${process.env.VUE_APP_URL}/uploads/`;
const title = ref('');
const title_section = ref('');
const name = ref('');
const description = ref('');
const urlImageBannier = ref('image_accueil-1733156237736.jpg');

const about = () => {
  router.push("/about").catch(err => console.error(err));
};

const computedHead = computed(() => ({
  title: title.value,
  meta: [
    { name: 'description', content: description.value },
    { name: 'keywords', content: 'Bilan de competences, Formation, Ikigai, développement personnel' },
  ],
}));

useHead(computedHead);



// Vérification des données dans localStorage
const checkLocalStorage = () => {
  const storedTitle = localStorage.getItem('title');
  const storedTitleSection = localStorage.getItem('title_section');
  const storedName = localStorage.getItem('name');
  const storedDescription = localStorage.getItem('description');
  const storedImage = localStorage.getItem('image_accueil');

  // Si des données sont présentes, les utiliser
  if (storedTitle && storedTitleSection && storedName && storedDescription && storedImage) {
    title.value = storedTitle;
    title_section.value = storedTitleSection;
    name.value = storedName;
    description.value = storedDescription;
    urlImageBannier.value = storedImage;
  }
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('title', data.title_accueil);
  localStorage.setItem('title_section', data.title_section);
  localStorage.setItem('name', data.name);
  localStorage.setItem('description', data.description);
  localStorage.setItem('image_accueil', data.image_accueil);
};



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
      console.error('Erreur durant la connexion');
      return;
    }

    const result = await response.json();
    const data = result.data[0];

    // Enregistrer les données récupérées dans le localStorage
    saveToLocalStorage(data);

    // Définir les valeurs pour l'affichage
    title.value = data.title_accueil;
    title_section.value = data.title_section;
    name.value = data.name;
    description.value = data.description;
    urlImageBannier.value = data.image_accueil;
  } catch (error) {
    console.error('Erreur durant la connexion : ', error);
  }
};


onBeforeMount(() => {
  checkLocalStorage();
  fetchAccueil();
});
</script>

<style scoped>
.fontTitle {
  font-family: var(--font-title);
}

.fontSubTitle {
  font-family: var(--font-subtitle);
}

.fontText {
  font-family: var(--font-text);
}

.colortext {
  color: var(--color-text);
}

/* Dégradé dynamique dans la div avec un coin arrondi */
.background-div {
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding-bottom: 100px;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  border-bottom-right-radius: 50%;
  overflow: hidden;
}

@media (max-width: 768px) {
  .background-div {
    border-bottom-right-radius: 0px;
  }
}
</style>
