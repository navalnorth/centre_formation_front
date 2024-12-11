<template>
    <div class="tout">
        <div class="flex justify-center items-center flex-col lg:flex-row">
            <div class="fontText w-2/3 flex flex-col items-center">
                <img src="../assets/image/Arrow.png">

                <div class="w-full flex justify-center items-center">
                    <p class="text-left mt-8 lg:mt-16 text-xl description">
                        {{descriptionBilan}}
                    </p>
                </div>
            </div>

            <div class="w-1/3 flex flex-col items-center mt-4 lg:mt-40 gap-4">
                <div>
                    <img :src="`${url}${image}`" class="w-64 lg:w-96 mt-4 lg:mt-0 max-w-none">
                </div>
                <button class="ColorButon text-black hover:bg-slate-100 hover:text-black py-2 lg:w-96 w-64 rounded-lg"
                @click="rdv"
                >
                    Prendre Rendez-vous
                </button>
            </div>
        </div>

        <div class="flex justify-center mt-20">
            <div class="largeurBulle flex flex-col px-8 lg:px-0 gap-4 lg:gap-16 w-full text-white relative">
                <p class="text-black text-3xl font-bold  fontText">
                    {{titre_section}}
            </p>
                <div class="flex lg:justify-start justify-center">
                    <div class="inline-flex items-center bgbulle lg:text-lg text-sm gap-4 rounded-3xl px-6 py-3">
                        <div>
                            <Bs1Circle class="text-3xl"/>
                        </div>
                        <p>
                            {{info_bilan_1}}
                        </p>
                    </div>
                </div>

                <div class="lg:absolute lg:right-96 lg:top-40 lg:flex hidden">
                    <img src="../assets/image/BilanArrowDroite.png" class="w-20 ">
                </div>

                <div class="lg:hidden flex justify-center items-center">
                    <img src="../assets/image/ArrowB.png" class="w-4 ">
                </div>

                <div class="flex lg:justify-end justify-center">
                    <div class="inline-flex items-center lg:text-lg text-sm bgbulle gap-4 rounded-3xl px-6 py-3">
                        <div>
                            <Bs2Circle class="text-3xl" />
                        </div>
                        <p>
                            {{info_bilan_2}}
                        </p>
                    </div>
                </div>

                <div class="lg:absolute lg:left-96 lg:top-80 lg:flex hidden">
                    <img src="../assets/image/BilanArrowGauche.png" class="w-20 ">
                </div>

                <div class="lg:hidden flex justify-center items-center">
                    <img src="../assets/image/ArrowB.png" class="w-4 ">
                </div>

                <div class="flex lg:justify-start justify-center mb-8">
                    <div class="inline-flex items-center lg:text-lg text-sm bgbulle gap-4 rounded-3xl px-6 py-3">
                        <div>
                            <Bs3Circle class="text-3xl" />
                        </div>
                        <p>
                            {{info_bilan_3}}
                        </p>
                    </div>
                </div>

                <div class="w-full flex items-center justify-center">
                    <p class="text-black font-semibold phrase">
                         {{phrase}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { Bs1Circle, Bs2Circle, Bs3Circle } from '@kalimahapps/vue-icons';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const url = `${process.env.VUE_APP_URL}/uploads/`;

const descriptionBilan = ref("Le bilan de compétences, c'est bien plus qu'un outil professionnel. C'est un moment précieux pour vous recentrer, prendre du recul, et explorer vos aspirations profondes. Chaque parcours est unique, Je m'engage à vous accompagner avec bienveillance et respect dans cette démarche qui place l'humain au cœur de tout.")
const titre_section = ref('Ensemble, nous allons :')
const info_bilan_1 = ref('Identifier vos compétences, vos talents et vos forces.')
const info_bilan_2 = ref("Explorer ce qui vous motive réellement, grâce à des outils comme l'Ikigai, qui permet de relier vos passions, vos valeurs et vos objectifs professionnels.")
const info_bilan_3 = ref("Construire un projet qui a du sens pour vous, qu'il s'agisse d'une évolution de carrière, d'une reconversion ou d'une meilleure compréhension de vos envies.")
const phrase = ref('Je suis convaincue que chaque individu possède un potentiel immense à révéler. Et je suis là pour vous guider, pas à pas, dans cette réflexion.')
const image = ref('BilanImage.png')



const rdv = () => {
    router.push({
        path: '/contact',
        query: {
            reason: 'bilan'
        },
    });
};



const fetchBilan = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/bilan/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const err = await response.json();
            console.log('Erreur de réponse :', err.message);
            return;
        }

        const result = await response.json();

        const data = result.data[0];
        descriptionBilan.value = data.description_bilan;
        titre_section.value = data.title_section_bilan;
        info_bilan_1.value = data.info_bilan_1;
        info_bilan_2.value = data.info_bilan_2;
        info_bilan_3.value = data.info_bilan_3;
        image.value = data.image_bilan;
    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};

onBeforeMount(async () => {
    await fetchBilan();
});
</script>

<style scoped>
.ColorButon {
    background-color: var(--color-buton);
    
}

.tout {
    background-image: url("../assets/image/LogoTampon.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.fontText {
    font-family: var(--font-text);
}

.largeurBulle {
    max-width: 1000px;
}

.bgbulle {
    background-color: var(--primary-color);
    width: 480px;
}

.phrase {
    width: 550px;
}

.description {
    width: 650px;
}
</style>