<template>
  <BannierAccueilComp/>
    <cardAccueilComp/>
    <BannierComp>
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
import cardAccueilComp from '@/components/AccueilCardComp.vue';
import { onBeforeMount } from 'vue';

const banTitle = ref('');
const banDescription = ref('');

onBeforeMount(() => {
  fetchBannier();
});

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
      await response.json();
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
.fontTitle,
h1 {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.fontSubTitle {
  font-family: var(--font-subtitle);
}

.fontText {
  font-family: var(--font-text);
}
</style>
