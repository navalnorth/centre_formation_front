<template>
  <div class="flex flex-col items-center justify-center colortext">
    <div class="background-div  ">
      <div class="flex items-center justify-center flex-wrap-reverse gap-10 md:gap-44 w-full my-10">
        <div class="text-center md:text-left md:w-1/3 w-full">
          <h1 class="text-xl md:text-3xl  font-bold fontTitle md:p-0 px-5">{{ title }}</h1>
          <h3 class="text-base md:text-xl mt-2 font-light">{{ name }}</h3>
          <p class="mt-4 text-base sp fontSubTitle w-full break-words md:p-0 px-5">{{ description }}</p>
        </div>

        <div class="flex flex-col overflow-hidden items-center">
          <div class="w-64">
            <img :src="`${url}${urlImageBannier}`" class="w-full h-full object-cover rounded-3xl" />
          </div>
          <button class="p-2 mt-5 bg-white text-black w-56 rounded-xl text-center cursor-pointer" @click="about">
            Qui suis-je ?
          </button>
        </div>
      </div>
    </div>

  </div>
  <h1 class="mt-20 text-xl md:text-3xl fontTitle"> {{ title_section }} </h1>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const url = `${process.env.VUE_APP_URL}/uploads/`;
const title = ref('FORMATIONS & BILAN DE COMPETENCES');
const title_section = ref('Découvrez de Nouvelles Opportunités');
const name = ref('PAULINE BOURDARIAS');
const description = ref('Parce que chaque parcours est unique, Je vous accompagne avec bienveillance et écoute pour révéler votre potentiel et donner du sens à vos projets. Ensemble, construisons un avenir qui vous ressemble.');

const router = useRouter()

const about = () => {

  router.push("/about").catch(err => console.error(err));
};


onBeforeMount(async() => {
 await fetchAccueil();
});


const urlImageBannier = ref('image_accueil-1733156237736.jpg')

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




</script>

<style scoped>
/* Appliquer les polices via les variables */
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
