<template>
    <BannierPagesComp>
        <template #title>
            Modifier le Logo et les couleurs du site
        </template>
    </BannierPagesComp>
    <AdminFetchLogoComp/>
    <AdminFetchCouleursComp/>
</template>

<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import AdminFetchLogoComp from '@/components/admin/AdminFetchLogoComp.vue';
import AdminFetchCouleursComp from '@/components/admin/AdminFetchCouleursComp.vue';
</script>

<style>
</style>