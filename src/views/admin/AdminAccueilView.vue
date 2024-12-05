<template>
    <BannierPagesComp>
        <template #title>
            Modification accueil
        </template>
    </BannierPagesComp>
    <AdminFetchBannierComp/>
    <AdminFetchCardComp/>
    <!-- ddd -->
</template>

<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import AdminFetchBannierComp from '@/components/admin/AdminFetchBannierComp.vue';
import AdminFetchCardComp from '@/components/admin/AdminFetchCardComp.vue';

</script>

<style scoped>

</style>