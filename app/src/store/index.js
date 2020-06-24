import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import goods from './modules/goods'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthUser: false,
        isRegistrationModalVisible: false,
        isServerConfirmed: true,
        user: null
    },
    mutations: {
        'SET_AUTH_CONFIRMATION'(state, payload) {
            state.isAuthUser = payload;
        },
        'SET_REGISTRATION_MODAL_VISIBILITY'(state, payload) {
            state.isRegistrationModalVisible = payload;
        },
        'SET_SERVER_CONFIRMATION'(state, payload) {
            state.isServerConfirmed = payload;
        },
        'SET_USER'(state, payload) {
            state.user = payload;
        }

    },
    getters: {
        'GET_AUTH_CONFIRMATION'({isAuthUser}) {
            return isAuthUser;
        },
        'GET_REGISTRATION_MODAL_VISIBILITY'({isRegistrationModalVisible}) {
            return isRegistrationModalVisible;
        },
        'GET_SERVER_CONFIRMATION'({isServerConfirmed}) {
            return isServerConfirmed;
        },
        'GET_USER'({user}) {
            return user;
        }
    },
    actions: {
        getAuthConfirmationFromServer({commit}, payload) {
            axios
                .post('http://localhost:3003/auth', payload)
                .then(response => {
                    commit('SET_USER', response.data)
                    commit('SET_AUTH_CONFIRMATION', true)
                })
                .catch(error => commit('SET_SERVER_CONFIRMATION', false));
        },
        registrationNewUser({commit}, payload) {
            axios
                .post('http://localhost:3003/registrate-user', payload)
                .then(response => {
                    commit('SET_USER', response.data)
                    commit('SET_REGISTRATION_MODAL_VISIBILITY', false)
                })
                .catch(error => console.log(error));
        }
    },
    modules: {
        goods
    }
})