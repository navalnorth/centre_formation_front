<template>
    <form class="pt-48" @submit.prevent="login">
        <div>
            <input type="text" v-model="username" placeholder="pseudo">
        </div>
        <div>
            <input type="password" v-model="password" placeholder="mot de passe">
        </div>
        <button type="submit">connexion</button>

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
const erreurs = ref(''); // Variable pour les erreurs

const setTokenStore = (token) => {
  const user = JSON.parse(atob(token.split('.')[1]))
  store.commit('setUser', user);
  store.commit('setToken', token);
  store.commit('createToken', token);

};

const login = async () => {
    erreurs.value = '';
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
            erreurs.value = err.message || 'Erreur inconnue lors de la connexion.';
            return;
        }

        const result = await response.json();
        setTokenStore(result.token);
        router.push('/');
    } catch (error) {
        erreurs.value = 'Erreur de connexion au serveur. Veuillez réessayer plus tard.';
        console.error('Erreur durant la connexion : ', error);
    }
};

</script>