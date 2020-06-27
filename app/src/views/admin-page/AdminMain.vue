<template>
    <div class="admin-main">
        <h2 class="admin-main__title">
            Welcome, {{GET_USER.firstName}}! <br/>
            Now you can config Smart Shop site!
        </h2>
        <img class="admin-main__image" src="../../assets/admin.png"/>
    </div>
</template>

<script>
    import {mapMutations, mapGetters, mapActions} from 'vuex';

    export default {
        name: 'AdminMain',
        computed: {
            ...mapGetters(['GET_USER'])
        },
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="scss">
    .admin-main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: calc(100vh - 85px);
        border-left: 1px solid #a0a0a0;

        &__image {
            margin-top: 50px;
        }
    }
</style>