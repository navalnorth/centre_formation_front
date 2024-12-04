<template>
    <div class="background-div w-full overflow-hidden md:h-auto pb-10 h-72 text-white mt-10 ">
    <div class="flex flex-col-reverse md:flex-row items-center justify-between md:gap-4 w-full p-0 md:pr-36 mt-10  mb-4 mx-0 md:mx-10">
        <div class="md:w-3/4 w-full">
            <h1 class="text-lg md:text-3xl text-center fontTitle md:p-0 px-5">
                <slot name="title"></slot>
            </h1>

            <p class="mt-4 text-xs md:text-base fontSubTitle my-5 md:p-0 px-5">
                <slot name="description"></slot>
            </p>
        </div>

        <div class="md:w-1/4 w-full flex justify-center md:justify-end">
            <img class="w-24 md:w-44 h-24 md:h-44 mb-5 md:mb-0" src="../assets/logo/logo_3.png" />
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
        clip-path: none;
        height: auto;
    }
    .logo {
        display: none;
    }
}
</style>
