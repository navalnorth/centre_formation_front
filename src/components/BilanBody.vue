<template>
    <div class="tout">
        <div class="flex md:flex-row flex-col">
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

            <div class="w-1/3 flex flex-col gap-y-8 justify-end">
                <div>
                    <img src="../assets/image/BilanImage.png" class="w-64 md:w-96 mt-4 md:mt-0 max-w-none">
                </div>
                <button class="bg-blue-700 text-white py-2 md:w-96 w-64 rounded-lg">
                    Prendre Rendez-vous
                </button>
            </div>
        </div>

        <div class="mt-8">
            <h2 class="fontText text-2xl font-bold">Ensemble, nous allons :</h2>
        </div>
    </div>
</template>


<script>

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
</style>