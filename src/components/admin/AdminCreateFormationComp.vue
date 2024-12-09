<template>
    <div class="flex items-center justify-around mx-5 flex-wrap">
        <form action="" class="flex flex-col w-2/3 mb-5">
            <label for="" class="flex flex-col text-left">Titre de la formation
                <input class="border-b-2" type="text" required v-model="title">
            </label>
            <label for="" class="flex flex-col text-left">Description derrière la carte
                <input class="border-b-2" type="text" v-model="descriptionCard">
            </label>
            <label for="" class="flex flex-col text-left">Texte bouton
                <input class="border-b-2" type="text" v-model="textButton">
            </label>
            <label for="" class="flex flex-col text-left">Description
                <textarea v-model="description" class="border-b-2" rows="7" cols="35"></textarea>
            </label>
        </form>

        <div class="flex flex-col ">
            <label class="file-upload">
                <input type="file" id="image" name="image" accept="image/*" @change="onFileChange" />
                <div v-if="imageUrl" :style="`background-image:url('${imageUrl}')`" class="file-upload"></div>
            </label>

            <div v-if="message" class="mt-5 p-3 text-center border rounded-lg" :class="messageType">
                {{ message }}
            </div>
        </div>
    </div>

    <button class="p-3 bg-pink-400 hover:bg-pink-600 rounded-lg my-10 text-white" @click.prevent="fetchCreateFormation">
        Enregistrer les informations
    </button>
</template>

<script setup>
import { ref } from 'vue';

// Champs de formulaire
const title = ref('');
const description = ref('');
const textButton = ref('');
const descriptionCard = ref('');
const imageUrl = ref('');
const imageFile = ref(null);

// Messages d'état
const message = ref('');
const messageType = ref('');

// Gestion de l'upload de fichier
const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        imageFile.value = file; // Stocke le fichier pour l'upload
        const reader = new FileReader();

        reader.onload = (e) => {
            imageUrl.value = e.target.result; // Prévisualisation de l'image
        };

        reader.readAsDataURL(file);
    }
};

// Fetch pour créer une formation avec FormData
const fetchCreateFormation = async () => {
    const formData = new FormData();

    // Ajout des données au FormData
    formData.append('title_formation', title.value);
    formData.append('description_formation', description.value);
    formData.append('text_button', textButton.value);
    formData.append('description_formation_card', descriptionCard.value);

    // Ajout de l'image si présente
    if (imageFile.value) {
        formData.append('image_formation', imageFile.value);
    }

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/formation/createFormation`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            console.error(error.message || 'Erreur inconnue lors de la création.');
            message.value = error.message || 'Erreur lors de la création.';
            messageType.value = 'text-red-600 border-red-600';
            return;
        }

        // Si la création réussit
        const result = await response.json();
        message.value = 'Formation créée avec succès !';
        messageType.value = 'text-green-600 border-green-600';
        console.log('Résultat:', result);
    } catch (error) {
        console.error('Erreur durant la création de la formation :', error);
        message.value = 'Erreur lors de la création.';
        messageType.value = 'text-red-600 border-red-600';
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
    background-color: pink;
    justify-content: center;
    cursor: pointer;
    border-radius: 35px;
    margin: auto;
}

.file-upload input[type="file"] {
    display: none;
}
</style>
