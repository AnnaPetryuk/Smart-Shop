<template>
    <div class="registration">
        <modal v-show="GET_REGISTRATION_MODAL_VISIBILITY">
            <template v-slot:title>
                Registration
            </template>
            <template v-slot:content>
                <div class="registration__content">
                    <div class="registration__field-container" v-for="field in userFields" v-bind:key="field.name">
                        <label :for="field.name" class="registration__title">{{field.title}}:</label>
                        <input :id="field.name" class="registration__field" :type="field.type" :name="field.name" v-model="dataToSend[field.name]"/>
                    </div>
                    <div class="registration__message">* Fields are required</div>
                </div>
            </template>
            <template v-slot:panel>
                <button class="registration__button" @click="save">Save</button>
                <button class="registration__button" @click="close">Cancel</button>
            </template>
        </modal>
    </div>
</template>

<script>
    import Modal from './general/Modal'
    import {mapGetters, mapMutations, mapActions} from 'vuex';

    export default {
        name: 'Registration',
        components: {
            Modal
        },
        data() {
            return {
                dataToSend: {},
                userFields: [
                    {
                        title: 'First name',
                        name: 'firstName',
                        type: 'text'
                    },
                    {
                        title: 'Last name',
                        name: 'lastName',
                        type: 'text'
                    },
                    {
                        title: 'Age',
                        name: 'age',
                        type: 'text'
                    },
                    {
                        title: 'Login',
                        name: 'login',
                        type: 'text'
                    },
                    {
                        title: 'Password',
                        name: 'password',
                        type: 'password'
                    },
                    {
                        title: 'Password confirmation',
                        name: 'passwordConfirmation',
                        type: 'password'
                    }
                ]
            }
        },
        computed: {
            ...mapGetters(['GET_REGISTRATION_MODAL_VISIBILITY', 'GET_SERVER_CONFIRMATION'])
        },
        methods: {
            save() {
                this.$store.dispatch('registrationNewUser', this.dataToSend)
            },
            close() {
                this.SET_REGISTRATION_MODAL_VISIBILITY(false)
            },
            ...mapMutations(['SET_REGISTRATION_MODAL_VISIBILITY']),
            ...mapActions(['registrationNewUser'])
        }
    }
</script>

<style lang="scss">
    .registration {
        &__content {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }

        &__field-container {
            width: 80%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 5px 0;
        }

        &__title {
            font-size: 15px;
            height: 100%;

            &:after {
                content: '*';
                color: red;
            }
        }

        &__field {
            width: 50%;
            border-radius: 2px;
            border: 1px solid #5b5b5b;
            height: 30px;
            padding: 5px;
        }

        &__message {
            color: red;
            margin: 15px 0;
            width: 80%;
            font-size: 15px;
            text-align: left;
        }

        &__button {
            font-weight: bold;
            font-size: 14px;
            text-transform: uppercase;

            padding: 15px 20px;
	        color: #68c1de;

            border: 0;
            background: none;
            outline: none;
            
            &:hover {
                cursor: pointer;
            }
            &:active{
                outline: none;
            }
        }
    }
</style>