<template>
    <BannierPagesComp>
        <template #title>
            Découvrez nos formations
        </template>
    </BannierPagesComp>
    <CardFormationComp />
</template>

<script setup>
import CardFormationComp from '@/components/CardFormationComp.vue';
import BannierPagesComp from '@/components/BannierPagesComp.vue';

</script>

<style scoped></style>