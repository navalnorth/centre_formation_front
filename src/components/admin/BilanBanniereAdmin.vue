<template>
    <div class="p-5 text-xl border-b-2 border-indigo-950 m-10">Modifier la bannier Bilan du bas</div> 
    
    <div class="flex mx-5 gap-10 flex-wrap justify-center items-center">
        <label for="" class="flex flex-col text-left">Titre
            <textarea v-model="banTitle" class="border-b-2" rows="5" cols="30" type="text" name="" id=""></textarea>
        </label>
       
        <label for="" class="flex flex-col text-left">Description accueil
            <textarea v-model="banDescription" class="border-b-2" rows="5" cols="30" type="text" name="" id=""></textarea>
        </label>
    </div>
    
    <button class="p-3 bg-pink-400 hover:bg-pink-600 rounded-lg my-10 text-white" @click="fetchUpdateBannier">
        Enregistrer les informations
    </button>

    <!-- Afficher le message -->
    <div v-if="message" class="mt-5 p-3 text-center border rounded-lg" :class="messageType">
        {{ message }}
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const banTitle = ref('');
const banDescription = ref('');
const message = ref(''); // Message pour afficher le résultat
const messageType = ref(''); // Classe pour styliser le message (succès/erreur)

onMounted(() => {
    fetchBannier();
});

const fetchBannier = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_URL}/bannier/2`, {
      method: 'GET',
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
    const data = result.data;

    banTitle.value = data.titre_bannier;
    banDescription.value = data.description_bannier;

  } catch (error) {
    console.error('Erreur durant la connexion : ', error);
  }
};

const fetchUpdateBannier = async () => {
    const data2 = {
        titre_bannier: banTitle.value,
        description_bannier: banDescription.value,
    };

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/bannier/modifierBannier/2`, {
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
            message.value = err.message || 'Erreur lors de la mise à jour.';
            messageType.value = 'text-red-600 border-red-600';
            return;
        }

        const result = await response.json();

        // Afficher le message de succès
        message.value = 'Mise à jour réussie !';
        messageType.value = 'text-green-600 border-green-600';
    } catch (error) {
        console.error('Erreur durant la connexion : ', error);
        message.value = 'Erreur lors de la mise à jour.';
        messageType.value = 'text-red-600 border-red-600';
    }
};
</script>
