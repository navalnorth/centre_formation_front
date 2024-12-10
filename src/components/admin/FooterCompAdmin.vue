<template>
    <div class="p-5 text-xl border-b-2 border-indigo-950 m-10">Ajouter un nouveau reseau</div>

    <div class="flex items-center justify-around mx-5 flex-wrap">
        <form class="flex flex-col w-2/3 mb-5">
            <label class="flex flex-col text-left">Titre du reseau
                <input class="border-b-2" type="text" required v-model="title_footer">
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

const title_footer = ref('');

const imageUrl = ref('');
const imageFile = ref(null);

const message = ref('');
const messageType = ref('');



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

const fetchCreateFormation = async () => {
    const formData = new FormData();
    // Ajout des données au FormData
    formData.append('title_footer', title_footer.value);

    // Ajout de l'image si présente
    if (imageFile.value) {
        formData.append('image_footer', imageFile.value);
    }

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/footer/createFooter`, {
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

        await response.json();
        message.value = 'Formation créée avec succès !';
        messageType.value = 'text-green-600 border-green-600';
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
