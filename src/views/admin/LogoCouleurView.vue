<template>
    <BannierPagesComp>
        <template #title>
            Modifier le Logo et les couleurs
        </template>
    </BannierPagesComp>
    <LogoCompAdmin />
    <CouleursCompAdmin />
</template>

<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import LogoCompAdmin from '@/components/admin/LogoCompAdmin.vue';
import CouleursCompAdmin from '@/components/admin/CouleursCompAdmin.vue';
</script>

<style></style>