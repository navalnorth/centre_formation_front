<template>
    <div v-if="title_formation">
        <BannierPagesComp>
            <template #title>
                {{ title_formation }}
            </template>
        </BannierPagesComp>
        <CardFormationComp/>
    </div>
</template>

<script setup>
import CardFormationComp from '@/components/FormationCardComp.vue';
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import { ref } from 'vue';
import { onBeforeMount } from 'vue';

onBeforeMount (() => {
    fetchFormation();
});


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

</script>

<style scoped></style>