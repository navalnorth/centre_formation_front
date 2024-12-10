<template>
    <BannierPagesComp>
        <template #title>
            Modification Qui suis-je ?
        </template>
    </BannierPagesComp>

    <AboutContenu />
</template>



<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import AboutContenu from '@/components/admin/AboutContenuAdmin.vue';
</script>