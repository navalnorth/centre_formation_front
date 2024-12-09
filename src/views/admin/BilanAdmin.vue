<template>
    <BannierPagesComp>
        <template #title>
            Modification bilan
        </template>
    </BannierPagesComp>

    <BilanContenu />

    <BilanBanniereAdmin />
</template>



<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import BilanContenu from '@/components/admin/BilanContenuAdmin.vue';
import BilanBanniereAdmin from '@/components/admin/BilanBanniereAdmin.vue';

</script>