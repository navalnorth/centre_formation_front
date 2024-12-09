<template>
    <BannierPagesComp>
        <template #title>
            Découvrez nos formations
        </template>
    </BannierPagesComp>
    <CardFormationComp />
</template>

<script setup>
import CardFormationComp from '@/components/FormationCardComp.vue';
import BannierPagesComp from '@/components/BannierPagesComp.vue';

</script>

<style scoped></style>