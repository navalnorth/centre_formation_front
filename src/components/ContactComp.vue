<template>
    <form @submit.prevent="verify" class="flex flex-col  gap-16 justify-center items-center my-24">
        <div class="taille font flex flex-col gap-8">
            <div class="flex md:flex-row flex-col justify-center items-center gap-4 md:gap-20">
                <label for="name" class="flex flex-col justify-start items-start">
                    <p class="text-xl text-gray-500">Prénom</p>
                    <input required v-model="name" type="text" id="name" class="border-b-2 w-80 px-4 py-2 outline-none">
                </label>
                <label for="lastname" class="flex flex-col justify-start items-start">
                    <p class="text-xl text-gray-500">Nom</p>
                    <input required v-model="lastname" type="text" id="lastname" class="border-b-2 w-80 px-4 py-2 outline-none">
                </label>
            </div>

            <div class="font flex md:flex-row flex-col justify-center items-center gap-4 md:gap-20">
                <label for="email" class="flex flex-col justify-start items-start">
                    <p class="text-xl text-gray-500">Email</p>
                    <input required v-model="mail" type="email" id="email" class="border-b-2 w-80 px-4 py-2 outline-none">
                </label>
                <label for="phone" class="flex flex-col justify-start items-start">
                    <p class="text-xl text-gray-500">Téléphone</p>
                    <input required v-model="phone" type="tel" pattern="[0-9]{10}" id="phone" class="border-b-2 w-80 px-4 py-2 outline-none">
                </label>
            </div>

            <div class="flex md:justify-center justify-start md:gap-20 md:flex-row gap-4 flex-col">
                <label for="renseignement" class="flex gap-4">
                    <input required v-model="reason" type="radio" name="reason" id="renseignement" value="renseignement">
                    <p>Renseignement</p>
                </label>
                <label for="Bilan de competences" class="flex gap-4">
                    <input required v-model="reason" type="radio" name="reason" id="Bilan de competences" value="Bilan de competences">
                    <p>Bilan de compétences</p>
                </label>
                <label for="formation" class="flex gap-4">
                    <input required v-model="reason" type="radio" name="reason" id="formation" value="formation">
                    <p>Formation</p>
                </label>
            </div>

            <div>
                <div v-if="reason === 'renseignement'" class="flex flex-col justify-start items-start gap-2 w-full">
                    <label for="message" class="text-xl text-gray-500">
                        Message
                    </label>
                    <textarea id="message" rows="6" placeholder="Écrivez votre message ici..." v-model="message"
                        class="border border-gray-500 p-4 resize-none w-full">
                    </textarea>
                </div>

                <div v-if="reason === 'Bilan de competences'" class="flex flex-col justify-start items-start gap-2 w-full">
                    <label for="Bilan de competences" class="text-xl text-gray-500">
                        Message
                    </label>
                    <textarea id="Bilan de competences" rows="6"
                        placeholder="Expliquez-nous pourquoi vous voulez faire un bilan de compétences..."
                        v-model="bilan" class="border border-gray-500 p-4 resize-none w-full">
                    </textarea>
                </div>

                <div v-if="reason === 'formation'" class="flex flex-col justify-start items-start gap-2 w-full">
                    <label for="formations" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Selectionnez une option
                    </label>
                    <select id="formations" v-model="selectedFormation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled>
                            Choisissez une formation
                        </option>
                        <option v-for="formation in formations" :key="formation.id_formation" :value="formation.title">
                            {{ formation.title }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="flex justify-end items-end">
                <button type="submit"class="button Colortext px-8 py-4 rounded-xl shadow-lg">
                    Envoyer message
                </button>
            </div>

            <div v-if="erreurs">
                <p class="text-red-500">
                    {{ erreurs[0] }}
                </p>
            </div>

            <div v-if="succes">
                <p class="text-green-500">
                    {{ succes }}
                </p>
            </div>
        </div>
    </form>
</template>



<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const route= useRoute()

const name = ref('');
const lastname = ref('');
const mail = ref('');
const phone = ref('');
const reason = ref('');
const message = ref('');
const bilan = ref('');
const selectedFormation = ref('');
const formations = ref([])

const succes = ref('')
const erreurs = ref([])


const verify = () => {
    erreurs.value = []

    if (!name.value.length || !lastname.value.length || !mail.value.length || !phone.value.length || !reason.value.length) {
        erreurs.value.push('Tous les champs sont obligatoires !')
    }

    if (erreurs.value.length === 0) {
        envoyerContact();
    } else {
        return;
    }
}



const envoyerContact = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/contact/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: name.value,
                lastname: lastname.value,
                mail: mail.value,
                phone: phone.value,
                reason: reason.value,
                message: message.value || bilan.value || selectedFormation.value, 
            })
        });

        if (!response.ok) {
            const err = await response.json();
            console.error('Erreur de réponse :', err.message);
            return;
        }

        await response.json();

        name.value = '';
        lastname.value = '';
        mail.value = '';
        phone.value = '';
        reason.value = '';
        message.value = '';
        bilan.value = '';
        selectedFormation.value = '';
        succes.value = 'Message envoyé !';

    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};

const fechSelect = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/formation/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const err = await response.json();
            console.error('Erreur de réponse :', err.message);
            return;
        }

        const result = await response.json();

        formations.value = result.data.map((formation) => ({
            id_formation: formation.id_formation,
            title: formation.title_formation,
        }));
    } catch (error) {
        console.error('Erreur durant la connexion :', error);
    }
};


onBeforeMount(() => {
    fechSelect();
    if (route.query && route.query.formation) {
        reason.value = 'formation';
        selectedFormation.value = route.query.formation;
    }
    if (route.query && route.query.reason) {
        reason.value = route.query.reason;
    }
})
</script>


<style scoped>
.font {
    font-family: var(--font-text);
}

.Colortext {
    color: var(--color-text);
}

.taille {
    width: 50%;
}

.large {
    width: 760px;
}

.button {
    background-color: var(--color-buton);
}


.button:hover {
    background-color: rgb(233, 106, 127);
}
</style>