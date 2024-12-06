<template>
    <div class="p-5 text-xl border-b-2 border-indigo-950 m-10">Modifier les cartes</div>
    <div class="flex md:justify-around flex-wrap flex-col md:flex-row justify-center items-center">
        <div v-for="(card, index) in cards" :key="index" class="flex flex-col gap-5 w-2/3 md:w-1/3">
            <h1>Carte n° {{ index + 1 }}</h1>
            <label for="" class="flex flex-col text-left">Titre
                <input class="border-b-2" type="text" v-model="card.title">
            </label>
            <label for="" class="flex flex-col text-left">Description
                <input class="border-b-2 h-auto" type="text" v-model="card.description">
            </label>
            <label for="" class="flex flex-col text-left">InfoBull1
                <input class="border-b-2 " type="text"  v-model="card.infoBull1">
            </label>
            <label for="" class="flex flex-col text-left mb-10">InfoBull2
                <input class="border-b-2" type="text" v-model="card.infoBull2">
            </label>
            <button class="p-3 bg-pink-400 hover:bg-pink-600 rounded-lg m-2 text-white"
                @click="fetchCardUpdate(card.id_card, index)">
                Enregistrer cette carte
            </button>
            <div>
                <label class="file-upload">
                    <input type="file" :id="'file-input-' + index" accept="image/*"
                        @change="onFileChange($event, index)" />

                    <div :style="`background-image:url('${card.tempImageUrl || url + card.bgimage}')`"
                        class="file-upload"></div>
                </label>
                <button class="p-3 bg-pink-400 hover:bg-pink-600 rounded-lg m-2 text-white"
                    @click="fetchUpdateImage(card.id_card, index)">
                    Enregistrer cette image
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const cards = ref([]);
const url = `${process.env.VUE_APP_URL}/uploads/`;

onMounted(() => {
    fetchCard();
});

// Récupération des cartes
const fetchCard = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/card/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = (await response.json()).message || 'Erreur inconnue lors de la connexion.';
            console.error(errorMessage);
            return;
        }

        const result = await response.json();
        const data = result.data;

        // Ajoutez une propriété tempImageUrl pour chaque carte
        cards.value = data.map(card => ({
            ...card,
            tempImageUrl: '', // Propriété temporaire pour l'image
        }));
    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};

// Mise à jour des informations textuelles de la carte
const fetchCardUpdate = async (cardId, index) => {
    const updatedData = {
        title: cards.value[index].title,
        description: cards.value[index].description,
        infoBull1: cards.value[index].infoBull1,
        infoBull2: cards.value[index].infoBull2,
    };

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/card/modifierCard/${cardId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const err = await response.json();
            console.error(err.message || 'Erreur inconnue lors de la connexion.');
            return;
        }

        const result = await response.json();

        // Met à jour la carte dans le tableau cards
        cards.value[index] = { ...cards.value[index], ...updatedData };

    } catch (error) {
        console.error('Erreur durant la mise à jour de la carte :', error);
    }
};

// Gestion du changement d'image pour une carte spécifique
const onFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            cards.value[index].tempImageUrl = e.target.result; // Met à jour uniquement la carte modifiée
        };
        reader.readAsDataURL(file); // Convertit le fichier en base64
    }
};

// Mise à jour de l'image pour une carte spécifique
const fetchUpdateImage = async (cardId, index) => {
    const fileInput = document.querySelector(`#file-input-${index}`);
    if (!fileInput || fileInput.files.length === 0) {
        console.error("Aucun fichier sélectionné.");
        return;
    }

    const file = fileInput.files[0]; // Récupérer le fichier
    const formData = new FormData();
    formData.append("bgimage", file);

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/card/modifierCardImage/${cardId}`, {
            method: 'PUT',
            body: formData,
        });

        if (!response.ok) {
            const err = await response.json();
            console.error(err.message || 'Erreur inconnue lors de la connexion.');
            return;
        }

        const result = await response.json();

        // Met à jour l'image de la carte
        cards.value[index].bgimage = result.updatedImageName; // Si le serveur retourne le nom de l'image mise à jour
        // cards.value[index].tempImageUrl = ''; // Réinitialise l'aperçu temporaire après la sauvegarde
    } catch (error) {
        console.error('Erreur durant la mise à jour de l\'image :', error);
    }
};
</script>

<style scoped>
.file-upload {
    width: 250px;
    height: 300px;
    display: flex;
    background-position: center;
    background-size: cover;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 35px;
    margin: auto;
}

.file-upload input[type="file"] {
    display: none;
}

.uploadPicture {
    width: 60px;
    height: 60px;
}
</style>
