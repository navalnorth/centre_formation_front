<template>
    <BannierPagesComp>
        <template #title>
            Créer une nouvel formation
        </template>
    </BannierPagesComp>
    <FormationCreateCompAdmin />
</template>

<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import FormationCreateCompAdmin from '@/components/admin/FormationCreateCompAdmin.vue';
</script>
