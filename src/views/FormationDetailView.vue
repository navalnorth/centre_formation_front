<template>
    <BannierPagesComp>
        <template #title>
            {{ title }}
        </template>
    </BannierPagesComp>
    <div class="flex justify-center items-center gap-16 lg:gap-96 flex-wrap-reverse">
        <div class="m-10 fontText text-xl h-auto w-96">
            {{ description }}
        </div>
        <div class="w-80 h-64 flex justify-center flex-col ">
            <img :src="`${url}${image}`" class="w-full h-full object-cover" alt="Card image">
            <div class="ColorButon p-3 rounded-xl m-5 text-white" @click="redirectToContact">
                {{ button }}
            </div>

        </div>
    </div>

</template>
<script setup>
import CardFormationComp from '@/components/FormationCardComp.vue';
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()

onMounted(() => {
    fetchCard();
});

const url = `${process.env.VUE_APP_URL}/uploads/`;
const title = ref('Découvrez notre formation')
const description = ref('')
const image = ref('')
const button = ref('S’ incscrire a la formation')


const redirectToContact = () => {
    router.push({
        path: '/contact',
        query: {
            formation: title.value
        },
    });
};

const fetchCard = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/formation/${route.params.id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = (await response.json()).message;
            console.error(errorMessage);
            return;
        }

        const result = await response.json();
        const data = result.data;

        description.value = data.description_formation
        title.value = data.title_formation
        image.value = data.image_formation
        button.value = data.text_button
    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};
</script>

<style scoped>
.ColorButon {
    background-color: var(--color-buton);

}

.fontText {
    font-family: var(--font-text);
}
</style>