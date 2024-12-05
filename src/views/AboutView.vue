<template>
    <BannierPagesComp>
        <template #title>
            {{ bannierHautTitle }}
        </template>
    </BannierPagesComp>
    <div class="px-24 py-28">
        <div class="w-2/3">
            <p class="text-left">
                {{texte}}
            </p>
        </div>
    </div>
</template>


<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import { onMounted, ref } from 'vue';

const bannierHautTitle = ref('Qui suis-je ?')
const texte = ref(`Passionnée par l'humain et les parcours de vie, mon chemin a été tout sauf linéaire !
                    Forte d'une formation en ressources humaines et d'expériences variées, allant du commerce à la gestion d'un restaurant, en passant par des missions en recrutement et en RH, j'ai toujours cherché à créer du lien et à révéler le potentiel de chacun. 
                    Originaire de la région parisienne, c'est l'amour (et des yeux bleus !) qui m'a menée dans le Nord, où j'ai découvert ma vocation : l'accompagnement.
                    Depuis, j'ai eu la chance de guider des salariés, des demandeurs d'emploi, des bénéficiaires du RSA, et bien d'autres profils dans des contextes variés : plans sociaux, réinsertion professionnelle, et bien plus encore.
                    Aujourd'hui, je mets cette richesse d'expériences au service de votre réussite, que vous soyez une entreprise ou un particulier.
                    Ensemble, avançons vers vos objectifs avec confiance et authenticité.
                    Si vous souhaitez personnaliser encore davantage, n'hésitez pas à indiquer vos préférences !`)



const fetchBilan = async () => {
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
        bannierHautTitle.value = data.title;
        texte.value = data.description;
    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};

onMounted(async () => {
    await fetchBilan();
});
</script>