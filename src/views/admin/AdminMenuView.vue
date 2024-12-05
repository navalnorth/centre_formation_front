<template>
    <BannierPagesComp>
        <template #title>
           Menu admin
        </template>
    </BannierPagesComp>
    <AdminMenuComp></AdminMenuComp>
</template>

<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import AdminMenuComp from '@/components/admin/AdminMenuComp.vue';
</script>

<style>
</style>