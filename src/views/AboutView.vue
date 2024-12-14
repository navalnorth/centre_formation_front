<template>
    <BannierPagesComp>
        <template #title>
            {{ bannierHautTitle }}
        </template>
    </BannierPagesComp>
    <div class="dispo p-28 flex justify-center items-center gap-40">
        <div class="left text-left">
            <p>
                <strong>{{titre_description}}</strong><br><br>
            </p>
            <p>
                {{description1}}
            </p><br>
            <p>
                {{description2}}
            </p><br>
            <p>
                {{description3}}
            </p>
        </div>

        <div class="right flex flex-col gap-10 self-start">
            <div>
                <img :src="`${url}${image}`" alt="Formation" class="rounded-3xl" loading="lazy">
            </div>
            <div>
                <img src="../assets/image/Avion.png" alt="Bilan de competences">
            </div>
        </div>
    </div>
</template>


<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import { useHead } from '@vueuse/head';
import { computed, onBeforeMount, ref } from 'vue';

const url = `${process.env.VUE_APP_URL}/uploads/`;

const bannierHautTitle = ref('');
const titre_description = ref('');
const description1 = ref('');
const description2 = ref('');
const description3 = ref('');
const image = ref('');



const computedHead = computed(() => ({
  title: bannierHautTitle.value,
  meta: [
    { name: 'description', content: description1.value },
    { name: 'keywords', content: 'Bilan de competences, Formation, Ikigai, développement personnel' },
  ],
}));

useHead(computedHead);



const fechAbout = async () => {
  try {
    // Vérifier si les données sont dans localStorage
    const cachedData = localStorage.getItem('aboutData');
    if (cachedData) {
      const data = JSON.parse(cachedData);
      bannierHautTitle.value = data.title;
      titre_description.value = data.title_description;
      description1.value = data.description1;
      description2.value = data.description2;
      description3.value = data.description3;
      image.value = data.image;

    }

    // Appel API si les données ne sont pas en cache
    const response = await fetch(`${process.env.VUE_APP_URL}/users/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Erreur de réponse :', err.message);
      return;
    }

    const result = await response.json();
    const data = result.data[0];

    bannierHautTitle.value = data.title;
    titre_description.value = data.title_description;
    description1.value = data.description1;
    description2.value = data.description2;
    description3.value = data.description3;
    image.value = data.image;

    // Stocker les données dans localStorage
    localStorage.setItem('aboutData', JSON.stringify(data));
  } catch (error) {
    console.error('Erreur durant la connexion :', error);
  }
};

onBeforeMount(async () => {
  await fechAbout();
});
</script>



<style scoped>
@media (max-width: 1100px) {
    .dispo {
        flex-direction: column;
        gap: 56px;
        padding: 48px;
    }
    .right {
        width: 30%;
        align-self: center;
    }
}
@media (max-width: 690px) {
    .right {
        width: 70%;
    }
}
@media (min-width: 1100px) {
    .right {
        width: 20%;
    }
    .left {
        width: 40%;
    }
}
</style>
