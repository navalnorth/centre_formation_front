<template>
    <BannierPagesComp>
        <template #title>
            Découvrez votre potentiel grâce
            au <strong>Bilan de compétences</strong>
        </template>
    </BannierPagesComp>

    <BilanBody />

    <BannierComp>
        <template #title>
            Lepremier échange offert pur faire le point
        </template>
        <template #description>
            Parce que cette démarche mérite toute votre confiance,<br>
            Je vous propose un premier échange gratuit et sans engagement.<br><br>

            C'est l'occasion de discuter de vos attentes, de vos interrogations<br>
            et de découvrir comment je peux vous accompagner au mieux dans votre projet.<br>
        </template>
    </BannierComp>
</template>


<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import BilanBody from '@/components/BilanBody.vue';
import BannierComp from '@/components/BannierComp.vue';



</script>
