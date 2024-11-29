<template>
    <form @submit.prevent="login" class="pt-48">
        <div>
            <input type="text" name="" id="" v-model="mail" required placeholder="mail">
        </div>
        <div>
            <input type="password" name="" id="" v-model="password" required placeholder="mot de passe">
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

const mail = ref('');
const password = ref('');

const setTokenStore = (token) => {
  const user = JSON.parse(atob(token.split('.')[1]));
  store.commit('setUser', user);
  store.commit('setToken', token);
  store.commit('createToken', token);

};

const login = async () => {
    const data = {
        mail: mail.value,
        password: password.value,
    }

    try {
        const response = await fetch('https://centreformationback-production.up.railway.app/users/login', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            console.error('Erreur lors de la connexion:', response.statusText);
            erreurs.value.push('Email ou mot de passe invalides !')
            return;
        }

        const result = await response.json()
        setTokenStore(result.token);
        router.push('/')
    } catch (error) {
        console.error('Erreur durant la connexion : ', error)
    }
}

</script>

<style></style>