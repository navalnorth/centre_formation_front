<template>
    <div class="flex w-full flex-col justify-center items-center">
        <div class="p-5 text-xl w-1/2 border-b-4 border-indigo-950 m-10">Modifier la couleur du site</div>
        <form @submit.prevent="fetchUpdateColor" class="flew flex-col">
            <div>
                <label for="primary-color">couleur dégradée gauche :</label>
                <input type="color" id="primary-color" name="primary-color" v-model="colordeg1" />
            </div>
            <div>
                <label for="secondary-color">couleur dégradée droite :</label>
                <input type="color" id="secondary-color" name="secondary-color" v-model="colordeg2" />
            </div>
            <div>
                <label for="secondary-color">couleur derrière carte :</label>
                <input type="color" id="pink-color" name="pink-color" v-model="pinkCard" />
            </div>
            <div>
                <label for="allButon">couleur des bouton :</label>
                <input type="color" id="allButon" name="allButon" v-model="allButon" />
            </div>
            <div>
                <label for="secondary-color">couleur de text accueil :</label>
                <input type="color" id="text" name="text" v-model="text" />
            </div>
            <div>
                <label for="secondary-color">couleur de text des carte :</label>
                <input type="color" id="textCard" name="textCard" v-model="textCard" />
            </div>
            <button type="submit">Save</button>
        </form>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
onBeforeMount(() => {
    fetchColor();
});
const colordeg1 = ref('');  
const colordeg2 = ref('');
const pinkCard = ref(''); 
const allButon = ref(''); 

const text = ref('');
const textCard = ref('');

const fetchUpdateColor = async () => {
    const data2 = {
        colordeg1: colordeg1.value,
        colordeg2: colordeg2.value,
        pinkCard: pinkCard.value,
        allButon: allButon.value,
        text: text.value,
        textcard: textCard.value
    };

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/users/modifierColor`, {
            method: 'PUT',
            body: JSON.stringify(data2),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const err = await response.json();
            console.log(err.message || 'Erreur inconnue lors de la connexion.');
            return;
        }

        const result = await response.json();
        location.reload()
    } catch (error) {
        console.error('Erreur durant la connexion : ', error);
    }
};

const fetchColor = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/users/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const err = await response.json();
            console.log(err.message || 'Erreur inconnue lors de la connexion.');
            return;
        }

        const result = await response.json();
        const data = result.data[0];
        
        colordeg1.value = data.colordeg1;
        colordeg2.value = data.colordeg2;
        pinkCard.value = data.pinkCard;
        allButon.value = data.allButon;
        text.value = data.colortext;
        textCard.value = data.textcard;

    } catch (error) {
        console.error('Erreur durant la connexion : ', error);
    }
};
</script>

<style scoped>
/* Ajoutez des styles si nécessaire */
</style>
