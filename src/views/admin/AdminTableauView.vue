<template>
    <BannierPagesComp>
        <template #title>
            Admin personnes intéréssés
        </template>
    </BannierPagesComp>
    <MenuPersonnes />
</template>



<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import MenuPersonnes from '@/components/admin/AdminMenuPersonnes.vue';

</script>