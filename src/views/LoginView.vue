<template>
    <form class="pt-20" @submit.prevent="login">
        <p class="font my-4 text-xl ">Connexion Admin</p>
        <div>
            <input class="outline-2 outline-blue-500 border-2 border-blue-200 px-4 py-1 rounded-lg my-2"
                type="text" v-model="username" placeholder="pseudo">
        </div>
        <div>
            <input class="outline-2 outline-blue-500 border-2 border-blue-200 px-4 py-1 rounded-lg my-2"
                type="password" v-model="password" placeholder="mot de passe">
        </div>
        <button type="submit" class="bg-blue-300 hover:bg-blue-500 rounded-lg px-4 py-1 my-2">connexion</button>

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
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

const username = ref('');
const password = ref('');

const succes = ref('')
const erreurs = ref([])



const setTokenStore = (token) => {
    try {
        const user = JSON.parse(atob(token.split('.')[1]));
        store.commit('setUser', user);
        store.commit('setToken', token);
        store.commit('createToken', token);
    } catch (err) {
        erreurs.value = ['Erreur lors du traitement du token JWT.'];
        console.error('Erreur du token :', err);
    }
};



const login = async () => {
    erreurs.value = [];
    const data = {
        username: username.value,
        password: password.value,
    };

    try {
        const response = await fetch(`${process.env.VUE_APP_URL}/admin/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const err = await response.json();

            if (response.status === 400) {
                erreurs.value.push(err.message || "Tous les champs sont obligatores.");
            } else if (response.status === 401) {
                erreurs.value.push(err.message || "Nom d'utilisateur ou mot de passe incorrect.");
            } else if (response.status === 500) {
                erreurs.value.push(err.message || "Erreur interne du serveur. Veuillez réessayer plus tard.");
            } else {
                erreurs.value.push("Erreur inconnue lors de la connexion.");
            }
            return;
        }

        const result = await response.json();
        setTokenStore(result.token);
        succes.value = "Connexion réussie !";
        router.push('/');
    } catch (error) {
        erreurs.value.push("Erreur de connexion au serveur. Veuillez réessayer plus tard.");
        console.error("Erreur durant la connexion : ", error);
    }
};
</script>

<style scoped>
.font {
    font-family: var(--font-subtitle);
}
</style>