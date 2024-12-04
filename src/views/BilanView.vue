<template>
    <BannierPagesComp>
        <template #title>
            Découvrez votre potentiel grâce
            au Bilan de compétences
        </template>
    </BannierPagesComp>

    <BilanBody />

    <BannierComp>
        <template #title>
            Le premier échange offert pour faire le point
        </template>
        <template #description>
            Parce que cette démarche mérite toute votre confiance,
            Je vous propose un premier échange gratuit et sans engagement.
            
            C'est l'occasion de discuter de vos attentes, de vos interrogations
            et de découvrir comment je peux vous accompagner au mieux dans votre projet.
        </template>
    </BannierComp>
</template>


<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import BilanBody from '@/components/BilanBody.vue';
import BannierComp from '@/components/BannierComp.vue';



</script>
