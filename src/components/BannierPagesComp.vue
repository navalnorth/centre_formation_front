<template>
    <div class="background-div w-full md:h-64 h-44 overflow-hidden text-white">
        <div class="flex items-center justify-center w-full mt-10 md:mt-20 mb-36 mx-0 ">
            <div class="md:w-1/3 w-full">
                <h1 class="text-xl md:text-3xl text-center fontText md:p-0 px-5">
                    <slot name="title"></slot>
                </h1>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    image: {
        type: String,
    }
});
</script>

<style scoped>
.fontText {
    font-family: var(--font-text);
}

.background-div {
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    z-index: -1;
    clip-path: ellipse(70% 80% at 50% 15%);
}

@media (max-width: 768px) {
    .background-div {
        clip-path: ellipse(70% 80% at 50% 15%);
    }
}
</style>
