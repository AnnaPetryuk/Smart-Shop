<template>
    <div class="auth-page">
        <h2 class="auth-page__title">Sign in</h2>
        <form class="auth-page__info">
            <input type="text" name="login" class="auth-page__field" placeholder="Login" v-model="dataToSend.login">
            <input type="password" name="password" class="auth-page__field" placeholder="Password" v-model="dataToSend.password">
            <button class="auth-page__button" @click.prevent="authUser">Sign in</button>
            <div class="auth-page__message">
                New user?
                <span class="auth-page__message--redirection" @click="registrate" v-bind:class="{'auth-page__message--light': !GET_SERVER_CONFIRMATION}">Sigh up</span>
            </div>
        </form>
        <Registration />
    </div>
</template>

<script>
    import Registration from '../components/Registration.vue'
    import {mapMutations, mapGetters, mapActions} from 'vuex';
    import axios from 'axios';

    export default {
        name: 'AuthPage',
        components: {
            Registration
        },
        data() {
            return {
                dataToSend: {
                    login: '',
                    password: ''
                }
            }
        },
        computed: {
            ...mapGetters(['GET_AUTH_CONFIRMATION', 'GET_SERVER_CONFIRMATION', 'GET_USER'])
        },
        methods: {
            authUser() {
                this.$store.dispatch('getAuthConfirmationFromServer', this.dataToSend)
            },
            registrate() {
                this.SET_REGISTRATION_MODAL_VISIBILITY(true);
            },
            ...mapMutations(['SET_REGISTRATION_MODAL_VISIBILITY']),
            ...mapActions(['getAuthConfirmationFromServer'])
        },
        watch: {
            GET_AUTH_CONFIRMATION(isAuthUser) {
                if(isAuthUser) {
                    console.log(this.GET_USER)
                    if(this.GET_USER.roleName == 'admin') {
                        this.$router.push('/admin');
                    } else {
                        this.$router.push('/home');
                    }
                }
            },
            GET_SERVER_CONFIRMATION(isServerConfirm) {
                if(!isServerConfirm) {
                    alert('If you are a new user, you can registrated in our site!');
                }
            }
        }
    }
</script>

<style lang="scss">
    .auth-page {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding: 15px;
        margin-top: 5%;
    
        &__title {
            font-size: 20px;
            padding: 2px;
        }

        &__info {
            margin: 20px 0;
            width: 300px;
        }

        &__field {
            width: 100%;
            margin-top: 5px;
            border-radius: 2px;
            border: 1px solid #5b5b5b;
            height: 30px;
            padding: 5px;
        }

        &__message {
            font-size: 14px;
            margin: 10px 0;
        }

        &__message--redirection {
            color: #0000ee;

            &:hover {
                cursor: pointer;
            }
        }

        &__message--light {
            text-shadow:#a8d8e5 2px 2px 4px, #a8d8e5 -2px -2px 4px, 
                        #a8d8e5 -2px 2px 4px, #a8d8e5 2px -2px 4px;
        }

        &__button {
            width: 100%;
            margin-top: 5px;
            cursor: pointer;
            color: #fff;
            height: 40px;
            background-color: #4267b2;
            border: 0;
        }
    }
</style>