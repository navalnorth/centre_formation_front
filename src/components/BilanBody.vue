<template>
    <div class="tout">
        <div class="flex xl:flex-row flex-col justify-center items-center">
            <div class="fontText w-2/3 flex flex-col items-center">
                <img src="../assets/image/Arrow.png">

                <div>
                    <p class="text-left mt-8 md:mt-16">
                        Le bilan de compétences, c'est bien plus qu'un outil professionnel.<br>
                        C'est un moment précieux pour vous recentrer, prendre du recul, et <br>
                        explorer vos aspirations profondes.<br><br>

                        Chaque parcours est unique,<br><br>

                        Je m'engage à vous accompagner avec bienveillance et respect<br>
                        dans cette démarche qui place l'humain au cœur de tout.<br>
                    </p>
                </div>
            </div>

            <div class="w-1/3 flex flex-col items-center mt-48 gap-4">
                <div>
                    <img src="../assets/image/BilanImage.png" class="w-64 md:w-96 mt-4 md:mt-0 max-w-none">
                </div>
                <button class="bg-blue-300 text-black hover:bg-blue-700 hover:text-white py-2 md:w-96 w-64 rounded-lg">
                    Prendre Rendez-vous
                </button>
            </div>
        </div>

        <div class="flex justify-center mt-20">
            <div class="largeurBulle flex flex-col gap-4 sm:gap-12 w-full text-white relative">
                <div class="flex justify-start bulle">
                    <div class="inline-flex items-center bgbulle md:text-lg text-sm gap-4 rounded-3xl px-6 py-3">
                        <Bs1Circle class="text-3xl"/>
                        <p>
                            Identifier vos compétences, vos talents et vos forces.
                        </p>
                    </div>
                </div>

                <div class="absolute right-96 top-5 arrow-hide">
                    <img src="../assets/image/BilanArrowDroite.png" class="w-20 ">
                </div>

                <div class="hidden arrowB">
                    <img src="../assets/image/ArrowB.png" class="w-4 ">
                </div>

                <div class="flex justify-end bulle">
                    <div class="inline-flex items-center md:text-lg text-sm bgbulle gap-4 rounded-3xl px-6 py-3">
                        <Bs2Circle class="text-3xl" />
                        <p>
                            Explorer ce qui vous motive réellement,<br>
                            grâce à des outils comme l'Ikigai, qui permet<br>
                            de relier vos passions, vos valeurs et vos objectifs<br>
                            professionnels.
                        </p>
                    </div>
                </div>

                <div class="absolute left-96 top-48 arrow-hide">
                    <img src="../assets/image/BilanArrowGauche.png" class="w-20 ">
                </div>

                <div class="hidden arrowB">
                    <img src="../assets/image/ArrowB.png" class="w-4 ">
                </div>

                <div class="flex justify-start mb-8 bulle">
                    <div class="inline-flex items-center md:text-lg text-sm bgbulle gap-4 rounded-3xl px-6 py-3">
                        <Bs3Circle class="text-3xl" />
                        <p>
                            Construire un projet qui a du sens pour vous,<br>
                            qu'il s'agisse d'une évolution de<br>
                            carrière, d'une reconversion ou d'une meilleure<br>
                            compréhension de vos envies.
                        </p>
                    </div>
                </div>

                <div>
                    <p class="text-black font-semibold">
                        Je suis convaincue que chaque individu possède un potentiel immense à révéler.<br>
                        Et je suis là our vous guider, pas à pas, dans cette réflexion.
                    </p>
                </div>
            </div>
        </div>


    </div>
</template>


<script setup>
import { Bs1Circle, Bs2Circle, Bs3Circle } from '@kalimahapps/vue-icons';

</script>

<style scoped>
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
    color: var(--color-blue);
}

@media (max-width: 950px) {
    .arrow-hide {
        display: none;
    }
    .arrowB {
        display: flex;
        justify-content: center;
        align-items: center
    }
    .bulle {
        justify-content: center;
    }
}
</style>