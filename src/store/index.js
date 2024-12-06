import { createStore } from 'vuex';


export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('mail', user.mail);
      localStorage.setItem('userId', user.id);
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('mail');
      localStorage.removeItem('userId');
    },
  },
  actions: {
    login({ commit }, token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      commit('setToken', token);
      commit('setUser', {
        mail: decodedToken.mail,
        id: decodedToken.id
      });
    },
    logout({ commit }) {
      commit('clearAuth');
    },
    checkAuth({ commit, state }) {
      if (state.token) {
        const decodedToken = JSON.parse(atob(state.token.split('.')[1]));
        const isExpired = decodedToken.exp && decodedToken.exp <= Math.floor(Date.now() / 1000);
        
        if (isExpired) {
          commit('clearAuth');
        } else {
          commit('setUser', {
            mail: decodedToken.mail,
            id: decodedToken.id
          });
        }
      }
    },
  },
  getters: {
    user: (state) => state.user,
    userId: (state) => state.user?.id, 
    token: (state) => state.token,
    isLoggedIn: (state) => !!state.token,
  },
});
