<template>

    <BannierPagesComp>
        <template #title>
            {{ bannierHautTitle }}
        </template>
    </BannierPagesComp>
    <div v-if="bannierHautTitle">
        <BilanBody />

        <BannierComp>
            <template #title>
                {{ banTitle }}
            </template>
            <template #description>
                {{ banDescription }}
            </template>
        </BannierComp>
    </div>
</template>


<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import BilanBody from '@/components/BilanContenu.vue';
import BannierComp from '@/components/BannierComp.vue';
import { computed, onBeforeMount, ref } from 'vue';
import { useHead } from '@vueuse/head';

const bannierHautTitle = ref('');
const banTitle = ref('');
const banDescription = ref('');

const computedHead = computed(() => ({
  title: bannierHautTitle.value,
  meta: [
    { name: 'description', content: banDescription.value },
    { name: 'keywords', content: 'Bilan de competences, Formation, Ikigai, développement personnel' },
  ],
}));

useHead(computedHead);

const fetchBannier = async () => {
  try {
    // Vérifier si les données existent dans le localStorage
    const cachedBannier = localStorage.getItem('bannierData');
    if (cachedBannier) {
      const data = JSON.parse(cachedBannier);
      banTitle.value = data.titre_bannier;
      banDescription.value = data.description_bannier;
      return;
    }

    // Si non, effectuer l'appel API
    const response = await fetch(`${process.env.VUE_APP_URL}/bannier/2`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
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

    // Stocker les données dans le localStorage
    localStorage.setItem('bannierData', JSON.stringify(data));
  } catch (error) {
    console.error('Erreur durant la connexion : ', error);
  }
};

const fetchBilan = async () => {
  try {
    // Vérifier si les données existent dans le localStorage
    const cachedBilan = localStorage.getItem('bilanData');
    if (cachedBilan) {
      const data = JSON.parse(cachedBilan);
      bannierHautTitle.value = data.title_bilan;
      return;
    }

    // Si non, effectuer l'appel API
    const response = await fetch(`${process.env.VUE_APP_URL}/bilan/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const err = await response.json();
      console.log('Erreur de réponse :', err.message);
      return;
    }

    const result = await response.json();
    const data = result.data[0];

    bannierHautTitle.value = data.title_bilan;

    // Stocker les données dans le localStorage
    localStorage.setItem('bilanData', JSON.stringify(data));
  } catch (error) {
    console.error('Erreur durant la connexion :', error);
  }
};

onBeforeMount(async () => {
  await fetchBannier();
  await fetchBilan();
});
</script>
