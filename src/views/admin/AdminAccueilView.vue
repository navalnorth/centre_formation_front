<template>
    <BannierPagesComp>
        <template #title>
            Modification accueil
        </template>
    </BannierPagesComp>
    <AdminFetchBannierComp/>
    <AdminFetchCardComp/>
    <AdminFetchBannierBotAComp/>
</template>

<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import AdminFetchBannierComp from '@/components/admin/AdminFetchBannierComp.vue';
import AdminFetchCardComp from '@/components/admin/AdminFetchCardComp.vue';
import AdminFetchBannierBotAComp from '@/components/admin/AdminFetchBannierBotAComp.vue';
</script>

<style scoped>

</style>