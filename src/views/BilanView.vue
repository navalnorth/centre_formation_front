<template>
    <BannierPagesComp>
        <template #title>
            {{ bannierHautTitle }}
        </template>
    </BannierPagesComp>

    <BilanBody />

    <BannierComp>
        <template #title>
            {{ banTitle }}
        </template>
        <template #description>
            {{ banDescription }}
        </template>
    </BannierComp>
</template>


<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import BilanBody from '@/components/BilanContenu.vue';
import BannierComp from '@/components/BannierComp.vue';
import { onMounted, ref } from 'vue';


const bannierHautTitle = ref('Découvrez votre potentiel grâce au Bilan de compétences')
const banTitle = ref('*Le premier échange offert pour faire le point');
const banDescription = ref(
    "Parce que cette démarche mérite toute votre confiance, " +
    "je vous propose un premier échange gratuit et sans engagement. " +
    "C'est l'occasion de discuter de vos attentes, de vos interrogations, " +
    "et de découvrir comment je peux vous accompagner au mieux dans votre projet."
);


const fetchBannier = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/bannier/2`, {
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

const fetchBilan = async () => {
    try {
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
    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};

onMounted(async () => {
    await fetchBannier();
    await fetchBilan();
});
</script>
