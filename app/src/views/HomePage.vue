<template>
    <div class="home-page">
        <main-header/>
        <router-view class="home-page__main"/>
    </div>
</template>

<script>
    import MainHeader from '../components/Header.vue'

    export default {
        name: 'HomePage',
        components: {
            MainHeader
        }
    }
</script>

<style lang="scss">
    .home-page {
        &__main {
            position: relative;
            top: 50px;
        }
    }
</style>