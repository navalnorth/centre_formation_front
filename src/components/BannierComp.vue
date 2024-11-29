<template>
    <div class="flex flex-col items-center justify-center text-white">
        <!-- Div avec dégradé dynamique et coin arrondi -->
        <div class="background-div  ">
            <div
                class="flex items-center justify-center flex-wrap-reverse gap-10 md:gap-44 w-full mt-5 mx-0 md:mx-10 relative z-10">
                <div class="text-center md:text-left md:w-1/2 w-full">
                    <h1 class="text-xl md:text-3xl  font-bold fontTitle md:p-0 px-5">
                        <slot name="title"></slot>
                    </h1>
                   
                    <p class="mt-4 text-base sp fontSubTitle w-full my-5 break-words md:p-0 px-5">
                        <slot name="description"></slot>
                    </p>
                </div>
                <div class="flex flex-col items-center">
                    <img class="w-24 md:w-44 h-24 md:h-44 mb-5 " :src="logo" alt="logo" />
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
defineProps({
    logo: {
        type: String,
    },
});
</script>

<style scoped>
/* Appliquer les polices via les variables */
.fontTitle {
    font-family: var(--font-title);
}

.fontSubTitle {
    font-family: var(--font-subtitle);
}

.fontText {
    font-family: var(--font-text);
}

/* Dégradé dynamique dans la div avec un coin arrondi */
.background-div {

    top: 0;
    left: 0;
    width: 100%;
    height: auto;

    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    /* Forme avec un coin arrondi en bas à droite */
    border-bottom-right-radius: 10%;
    /* Arrondi du coin inférieur droit */
    border-bottom-left-radius: 10%;
    /* Arrondi du coin inférieur gauche */
    z-index: -1;
    /* Appliquer un dégradé avec un coin arrondi */
    overflow: hidden;
}

@media (max-width: 768px) {
    .background-div {
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 0px;
    }
}
</style>
