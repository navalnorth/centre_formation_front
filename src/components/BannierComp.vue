<template>
    <div class="background-div w-full overflow-hidden md:h-96 h-72 text-white mt-10">
        <div class="flex items-center justify-center md:gap-44 w-full mt-10 md:mt-20 mb-36 mx-0 md:mx-10">
            <div class="md:w-3/4 w-full">
                <h1 class="text-lg md:text-3xl text-center fontTitle md:p-0 px-5">
                    <slot name="title"></slot>
                </h1>

                <p class="mt-4 text-xs md:text-base fontSubTitle my-5  md:p-0 px-5">
                    <slot name="description"></slot>
                </p>
            </div>

            <div class="w-1/4 ">
                <img class="w-24 md:w-44 h-24 md:h-44 mb-5" src="../assets/logo/logo_3.png" />
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
.fontTitle {
    font-family: var(--font-title);
}

.fontSubTitle {
    font-family: var(--font-subtitle);
}

.fontText {
    font-family: var(--font-text);
}

.background-div {
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    clip-path: ellipse(90% 80% at 50% 15%);
    z-index: -1;
}

@media (max-width: 768px) {
    .background-div {
        clip-path: ellipse(70% 80% at 50% 15%);
    }
    .logo {
        display: none;
    }
}
</style>
