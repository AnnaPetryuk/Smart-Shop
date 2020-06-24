<template>
    <div class="welcome">
        <div class="welcome__wrapper">
            <h1 class="welcome__title">{{GET_USER.firstName}}, thank you for joining us :)</h1>
            <p class="welcome__text">
                We are so glad to have you with us inside Smart Shop!
            </p>
            <span class="welcome__button" @click="toGoods">Start your shopping</span>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapGetters, mapActions} from 'vuex';
  
    export default {
        name: 'Welcome',
        computed: {
            ...mapGetters(['GET_USER'])
        },
        mounted() {
            this.SET_AUTH_CONFIRMATION(false);
        },
        methods: {
            toGoods() {
                this.$router.push('/goods');
                this.$store.dispatch('getGoodsList');
            },
            ...mapMutations(['SET_AUTH_CONFIRMATION'])
        }
    }
</script>

<style lang="scss">
    .welcome {
        height: calc(100vh - 50px);
        background: url(../../assets/banner-3.png) no-repeat 50% 100%;

        &__wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 100px;
            height: 100%;
            width: 100%;
            background-color: rgba(#ffffff, 0.3);
        }

        &__title {
            font-size: 32px;
        }

        &__text {
            font-size: 18px;
            margin: 30px 0;
        }

        &__button {
            color: crimson;
            &:hover {
                cursor: pointer;
            }
        }

    }
</style>