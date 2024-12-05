<template>
    <div class="p-5 text-xl  border-b-2 border-indigo-950 m-10  ">Modifier la bannier Accueil</div> 

    <div class="flex flex-wrap-reverse justify-around">
        <div class="flex  md:w-1/3 gap-10 flex-col justify-center ">
            <label for="" class="flex flex-col text-left">Titre
                <input class="border-b-2" type="text" v-model="title">
            </label>
            <label for="" class="flex flex-col text-left">Votre nom
                <input class="border-b-2" type="text" v-model="name">
            </label>
            <label for="" class="flex flex-col text-left">Description accueil
                <textarea class="border-b-2" rows="7" cols="35" type="text" name="" id="">{{ description }}</textarea>

            </label>
            <label for="" class="flex flex-col text-left">Titre cards
                <input class="border-b-2" type="text" v-model="title_section">
            </label>
        </div>
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
        </div>
        
    </div>
    <button class="p-3 bg-pink-400 hover:bg-pink-600 rounded-lg my-10 text-white" @click="fetchAccueilUpdate">
        Enregistrer les infomations
    </button>
</template>

<script setup>
import { onMounted, ref } from 'vue';


const url = `${process.env.VUE_APP_URL}/uploads/`;
const title = ref('');
const title_section = ref('');
const name = ref('');
const description = ref('');

onMounted(() => {
    fetchAccueil();
});

const imageUrl = ref('');


const urlImageBannier = ref('image_accueil-1733156237736.jpg')

const fetchAccueil = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/accueil/`, {
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


        title.value = data.title_accueil;
        title_section.value = data.title_section;
        name.value = data.name;
        description.value = data.description;
        urlImageBannier.value = data.image_accueil



    } catch (error) {
        console.error('Erreur durant la connexion : ', error);
    }
};


const fetchAccueilUpdate = async () => {
    const data2 = {
        title_accueil: title.value,
        title_section: title_section.value,
        name: name.value,
        description: description.value,

    }
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/accueil/modifierAccueil`, {
            method: 'PUT',
            body: JSON.stringify(data2),
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

    } catch (error) {
        console.error('Erreur durant la connexion : ', error);
    }
};


/*cette partie est pour l ajoute d image */
const imageName = ref('');

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        imageName.value = file.name;  // Stocke le nom de l'image
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

    // Check if the file exists
    if (!file) {
        console.error("No file selected.");
        return;
    }

    // Crée un objet FormData pour envoyer l'image
    const formData = new FormData();
    formData.append("image_accueil", file);

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/accueil/modifierAccueilImage`, {
            method: 'PUT',
            body: formData, // Utilise FormData pour l'upload
        });

        if (!response.ok) {
            const err = await response.json();
            console.log(err.message || 'Erreur inconnue lors de la connexion.');
            return;
        }

        const result = await response.json();


    } catch (error) {
        console.error('Erreur durant la connexion : ', error);
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