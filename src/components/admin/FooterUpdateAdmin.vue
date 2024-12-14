<template>
    <div class="p-5 text-xl border-b-2 border-indigo-950 m-10">Modifier le footer</div>
    <div class="flex md:justify-around flex-wrap flex-col md:m-20  md:flex-row justify-center items-center">
        <div v-for="(footer, index) in footers" :key="index" class="flex flex-col md:m-5 mb-16  gap-5 w-2/3 md:w-2/5 ">
            <h1>Footer n° {{ index + 1 }}</h1>

            <!-- Form Input for Text -->
            <label for="" class="flex flex-col text-left">Titre du footer
                <input class="border-b-2" type="text" v-model="footer.title_footer">
            </label>

            <!-- Button to save text info -->
            <button class="p-3 bg-pink-400 hover:bg-pink-600 rounded-lg m-2 text-white"
                @click="fetchFooterUpdate(footer.id_footer, index)">
                Enregistrer ce footer
            </button>

            <!-- Success message for text update -->
            <p v-if="footer.textUpdateMessage" class="text-green-500 border-green-500">{{ footer.textUpdateMessage }}
            </p>

            <div>
                <!-- File Upload for Image -->
                <label class="file-upload">
                    <input type="file" :id="'file-input-' + index" accept="image/*"
                        @change="onFileChange($event, index)" />
                    <div :style="`background-image:url('${footer.tempImageUrl || url + footer.image_footer}')`"
                        class="file-upload"></div>
                </label>

                <!-- Button to save image -->
                <button class="p-3 bg-pink-400 hover:bg-pink-600 rounded-lg m-2 text-white"
                    @click="fetchUpdateImage(footer.id_footer, index)">
                    Enregistrer cette image
                </button>

                <!-- Success message for image update -->
                <p v-if="footer.imageUpdateMessage" class="text-green-500 border-green-500">{{ footer.imageUpdateMessage
                    }}</p>
            </div>
            <button @click="deleteFooter(footer.id_footer)"
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                Supprimer ce reseau
            </button>
        </div>
    </div>
</template>


<script setup>
import { onBeforeMount, ref } from 'vue';

const footers = ref([]);
const url = `${process.env.VUE_APP_URL}/uploads/`;



const fetchFooter = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/footer/`, {
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

        // Add tempImageUrl and message properties for each footer
        footers.value = data.map(footer => ({
            ...footer,
            tempImageUrl: '', // Temp image URL for preview
            textUpdateMessage: '', // Text update success message
            imageUpdateMessage: '', // Image update success message
        }));
    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};

const fetchFooterUpdate = async (id_footer, index) => {
    const updatedData = {
        title_footer: footers.value[index].title_footer,
    };

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/footer/modifierFooter/${id_footer}`, {
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

        // Update the footer in the footers array
        footers.value[index] = { ...footers.value[index], ...updatedData };

        // Set success message for text update
        footers.value[index].textUpdateMessage = 'Informations textuelles mises à jour avec succès!';
    } catch (error) {
        console.error('Erreur durant la mise à jour du footer :', error);
    }
};

const deleteFooter = async (idFooter) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
        return;
    }
    
    try {
        const response = await fetch(
            `${process.env.VUE_APP_URL}/footer/supprimerFooter/${idFooter}`,
            {
                method: "DELETE",
            }
        );

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            // Mettre à jour la liste des footers localement
            footers.value = footers.value.filter(
                (footer) => footer.id_footer !== idFooter
            );
        }
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
    }
};



const onFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            footers.value[index].tempImageUrl = e.target.result; // Update only the modified footer
        };
        reader.readAsDataURL(file); // Convert file to base64
    }
};

const fetchUpdateImage = async (id_footer, index) => {
    const fileInput = document.querySelector(`#file-input-${index}`);
    if (!fileInput || fileInput.files.length === 0) {
        console.error("Aucun fichier sélectionné.");
        return;
    }

    const file = fileInput.files[0]; // Get the file
    const formData = new FormData();
    formData.append("image_footer", file);

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/footer/modifierFooterImage/${id_footer}`, {
            method: 'PUT',
            body: formData,
        });

        if (!response.ok) {
            const err = await response.json();
            console.error(err.message || 'Erreur inconnue lors de la connexion.');
            return;
        }

        const result = await response.json();

        // Update the image URL of the footer
        footers.value[index].image_footer = result.updatedImageName; // If the server returns the updated image name
        // footers.value[index].tempImageUrl = ''; // Reset temp image preview

        // Set success message for image update
        footers.value[index].imageUpdateMessage = 'Image mise à jour avec succès!';
    } catch (error) {
        console.error('Erreur durant la mise à jour de l\'image :', error);
    }
};

onBeforeMount(() => {
    fetchFooter();
});
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
