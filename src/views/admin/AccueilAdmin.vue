<template>
    <BannierPagesComp>
        <template #title>
            Modification accueil
        </template>
    </BannierPagesComp>
    <AccueilBanniereHautCompAdmin />
    <CardCompAdmin />
    <AdminFetchBannierBotAComp />
</template>

<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import AccueilBanniereHautCompAdmin from '@/components/admin/AccueilBanniereHautCompAdmin.vue';
import CardCompAdmin from '@/components/admin/AccueilCardCompAdmin.vue';
import AdminFetchBannierBotAComp from '@/components/admin/AccueilBanniereBasCompAdmin.vue';
</script>