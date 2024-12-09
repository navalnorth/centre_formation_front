<template>
    <div class="flex w-full flex-col justify-center items-center">

        <div class="p-5 text-xl w-1/2 border-b-4 border-indigo-950 m-10  ">Modifier le logo</div>
        <div class="flex flex-col w-96">
            <label class="file-upload">
                <input type="file" id="image" name="image" accept="image/*" @change="onFileChange" />
                <div v-if="!imageUrl" :style="`background-image:url('${url}${urlImageBannier}')`" class="file-upload">
                </div>

                <div v-if="imageUrl" :style="`background-image:url('${imageUrl}')`" class="file-upload"></div>
            </label>

            <button class="p-3 bg-pink-400 my-10 hover:bg-pink-600 rounded-lg m-2 text-white" @click="fetchUpdateImage">
                Enregistrer cette image
            </button>
            <div v-if="message" class="mt-5 p-3 text-center border rounded-lg" :class="messageType">
                {{ message }}
            </div>
        </div>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';

onMounted(() => {
    fetchAccueil();
});
const url = `${process.env.VUE_APP_URL}/uploads/`;

const imageUrl = ref('');
const urlImageBannier = ref('')

const fetchAccueil = async () => {
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

        urlImageBannier.value = data.logo;
        

    } catch (error) {
        console.error('Erreur durant la connexion : ', error);
    }
};


/*cette partie est pour l'ajout d'image */
const imageName = ref('');

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        imageName.value = file.name; // Stocke le nom de l'image
        const reader = new FileReader();

        reader.onload = (e) => {
            imageUrl.value = e.target.result; // Contient les données de l'image en base64
        };

        reader.readAsDataURL(file); // Convertit le fichier en Base64
    }
};

const fetchUpdateImage = async () => {
    const fileInput = document.getElementById('image');
    const file = fileInput.files[0]; // Récupère le fichier sélectionné

    if (!file) {
        console.error("Aucun fichier sélectionné.");
        return;
    }

    const formData = new FormData();
    formData.append("logo", file); // Match the backend's expected field name

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/users/modifierProfileLogo`, {
            method: 'PUT',
            body: formData,
        });

        if (!response.ok) {
            const err = await response.json();
            console.error(err.message || 'Erreur inconnue lors de l\'upload de l\'image.');
            return;
        }

        const result = await response.json();
        console.log("Image mise à jour avec succès :", result);
        location.reload();
    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};

</script>

<style scoped>
.file-upload {
    width: 310px;
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