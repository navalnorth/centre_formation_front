<template>
    <BannierPagesComp>
        <template #title>
            Personnes intéréssés par un renseignement
        </template>
    </BannierPagesComp>
    <div class="flex justify-center min-h-screen">
        <div class="table-auto w-4/5 mt-10 overflow-x-auto">
            <table class="w-full bg-red-200 rounded-3xl">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Téléphone</th>
                        <th>Mail</th>
                        <th>Raison</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in listMessage" :key="index">
                        <td>
                            {{ list.firstname.slice(0, 15) + (list.firstname.length > 15 ? '...' : '') }}
                        </td>
                        <td>
                            {{ list.lastname.slice(0, 15) + (list.lastname.length > 15 ? '...' : '') }}
                        </td>
                        <td>
                            {{ list.phone }}
                        </td>
                        <td>
                            {{ list.mail }}
                        </td>
                        <td>
                            {{ list.reason }}
                        </td>
                        <td @mouseover="showTooltip(list.message)" @mousemove="updatePosition"
                            @mouseleave="tooltipActive = false;" class="text-ellipsis overflow-hidden">
                            {{ list.message.slice(0, 25) + (list.message.length > 25 ? '...' : '') }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="tooltipActive" :style="`left: ${mouseLeft}px; top: ${mouseTop}px;`"
                class="tooltip absolute w-64 h-auto text-center bg-white break-all rounded-md p-2">
                {{ message }}
            </div>
        </div>
    </div>

</template>




<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
import { computed, onBeforeMount, ref } from 'vue';

const listMessage = ref()

let tooltipActive = ref(false);
let mouseLeft = ref(0);
let mouseTop = ref(0);
let message = ref('');

const updatePosition = (e) => {
    mouseLeft.value = e.clientX - 260;
    mouseTop.value = e.clientY + 10;
};
const showTooltip = (desc) => {
    tooltipActive.value = true;
    message.value = desc;
};



const fetchTout = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/contact/tout`, {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            (await response.json()).message;
            return;
        }

        const result = await response.json();
        const data = result.data;

        listMessage.value = data.filter(item => item.reason === "Renseignement");
    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};


onBeforeMount(async () => {
    await fetchTout()
})
</script>



<style scoped>
.tooltip {
    transition: .1s;
    box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 0.2);
}

thead th:nth-child(1) {
    width: 15%;
}

thead th:nth-child(2) {
    width: 15%;
}

thead th:nth-child(3) {
    width: 10%;
}

thead th:nth-child(4) {
    width: 15%;
}

thead th:nth-child(5) {
    width: 15%;
}

thead th:nth-child(6) {
    width: 35%;
}

th,
td {
    text-align: center;
    height: 50px;
    border-radius: 24px;
}
</style>
