<template>
    <BannierPagesComp>
        <template #title>
            Modification du footer
        </template>
    </BannierPagesComp>
    <FooterCompAdmin/>
    <FooterUpdateAdmin/>
</template>

<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import FooterCompAdmin from '@/components/admin/FooterCompAdmin.vue';
import FooterUpdateAdmin from '@/components/admin/FooterUpdateAdmin.vue';
</script>