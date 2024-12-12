<template>

    <BannierPagesComp>
        <template #title>
            {{ title_formation }}
        </template>
    </BannierPagesComp>
    <div v-if="title_formation">
        <CardFormationComp />
    </div>
</template>

<script setup>
import CardFormationComp from '@/components/FormationCardComp.vue';
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import { computed, ref } from 'vue';
import { onBeforeMount } from 'vue';
import { useHead } from '@vueuse/head';




const title_formation = ref('')

const fetchFormation = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/users/`, {
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
        title_formation.value = data.title_page_formation;
    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};

const computedHead = computed(() => ({
  title: title_formation.value,
  meta: [
    { name: 'description', content: title_formation.value },
    { name: 'keywords', content: 'Bilan de competences, Formation, Ikigai, développement personnel' },
  ],
}));

useHead(computedHead);



onBeforeMount(() => {
    fetchFormation();
});
</script>

<style scoped></style>