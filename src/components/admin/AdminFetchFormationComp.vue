<template>
    <div class="p-5 text-xl border-b-2 border-indigo-950 m-10">Modifier les formations</div>
    <div class="flex md:justify-around flex-wrap flex-col md:flex-row justify-center items-center">
        <div v-for="(forma, index) in formations" :key="index" class="flex flex-col gap-5 w-2/3 md:w-1/3">
            <h1>formation n° {{ index + 1 }}</h1>
            
            <!-- Form Inputs for Text -->
            <label for="" class="flex flex-col text-left">Titre
                <input class="border-b-2" type="text" v-model="forma.title_formation">
            </label>
            <label for="" class="flex flex-col text-left">Description derrière carte
                <input class="border-b-2 h-auto" type="text" v-model="forma.description_formation_card">
            </label>
            <label for="" class="flex flex-col text-left">Description
                <input class="border-b-2 " type="text"  v-model="forma.description_formation">
            </label>
            <label for="" class="flex flex-col text-left mb-10">Text bouton
                <input class="border-b-2" type="text" v-model="forma.text_button">
            </label>
            
            <!-- Button to save text info -->
            <button class="p-3 bg-pink-400 hover:bg-pink-600 rounded-lg m-2 text-white"
                @click="fetchCardUpdate(forma.id_formation, index)">
                Enregistrer cette carte
            </button>
            
            <!-- Success message for text update -->
            <p v-if="forma.textUpdateMessage" class="text-green-500 border-green-500">{{ forma.textUpdateMessage }}</p>

            <div>
                <!-- File Upload for Image -->
                <label class="file-upload">
                    <input type="file" :id="'file-input-' + index" accept="image/*"
                        @change="onFileChange($event, index)" />
                    <div :style="`background-image:url('${forma.tempImageUrl || url + forma.image_formation}')`"
                        class="file-upload"></div>
                </label>
                
                <!-- Button to save image -->
                <button class="p-3 bg-pink-400 hover:bg-pink-600 rounded-lg m-2 text-white"
                    @click="fetchUpdateImage(forma.id_formation, index)">
                    Enregistrer cette image
                </button>

                <!-- Success message for image update -->
                <p v-if="forma.imageUpdateMessage" class="text-green-500 border-green-500">{{ forma.imageUpdateMessage }}</p>
            </div>
        </div>
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';

const formations = ref([]);
const url = `${process.env.VUE_APP_URL}/uploads/`;

onMounted(() => {
    fetchCard();
});

// Fetch card data
const fetchCard = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/formation/`, {
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

        // Add tempImageUrl and message properties for each card
        formations.value = data.map(forma => ({
            ...forma,
            tempImageUrl: '', // Temp image URL for preview
            textUpdateMessage: '', // Text update success message
            imageUpdateMessage: '', // Image update success message
        }));
    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};

// Update card information (text)
const fetchCardUpdate = async (id_formation, index) => {
    const updatedData = {
        title_formation: formations.value[index].title_formation,
        description_formation_card: formations.value[index].description_formation_card,
        description_formation: formations.value[index].description_formation,
        text_button: formations.value[index].text_button,
    };

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/formation/modifierFormation/${id_formation}`, {
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

        // Update the card in the formations array
        formations.value[index] = { ...formations.value[index], ...updatedData };

        // Set success message for text update
        formations.value[index].textUpdateMessage = 'Informations textuelles mises à jour avec succès!';
    } catch (error) {
        console.error('Erreur durant la mise à jour de la carte :', error);
    }
};

// Handle image change for a specific card
const onFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            formations.value[index].tempImageUrl = e.target.result; // Update only the modified card
        };
        reader.readAsDataURL(file); // Convert file to base64
    }
};

// Update image for a specific card
const fetchUpdateImage = async (id_formation, index) => {
    const fileInput = document.querySelector(`#file-input-${index}`);
    if (!fileInput || fileInput.files.length === 0) {
        console.error("Aucun fichier sélectionné.");
        return;
    }

    const file = fileInput.files[0]; // Get the file
    const formData = new FormData();
    formData.append("image_formation", file);

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/formation/modifierFormationImage/${id_formation}`, {
            method: 'PUT',
            body: formData,
        });

        if (!response.ok) {
            const err = await response.json();
            console.error(err.message || 'Erreur inconnue lors de la connexion.');
            return;
        }

        const result = await response.json();

        // Update the image URL of the card
        formations.value[index].image_formation = result.updatedImageName; // If the server returns the updated image name
        // formations.value[index].tempImageUrl = ''; // Reset temp image preview

        // Set success message for image update
        formations.value[index].imageUpdateMessage = 'Image mise à jour avec succès!';
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
