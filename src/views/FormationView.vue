<template>
    <BannierPagesComp>
        <template #title>
            {{ title }}
        </template>
    </BannierPagesComp>
    <CardFormationComp />
</template>

<script setup>
import CardFormationComp from '@/components/CardFormationComp.vue';
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import { onMounted, ref } from 'vue';

onMounted(() => {
    fetchCard();
});

const title = ref('Découvrez nos formation')

const fetchCard = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/formation/`, {
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
        const data = result.data[0];

        
        title.value = data.title_formation_page
    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};
</script>

<style scoped></style>