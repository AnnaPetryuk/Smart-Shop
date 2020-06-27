<template>
    <div class="admin-page">
        <main-header />
        <div class="admin-page__header">Nhdc</div>
        <div class="admin-page__main">
            <data-base-categories class="admin-page__left" />
            <router-view/>
        </div>
    </div>
</template>

<script>
    import MainHeader from '../components/Header.vue'
    import DataBaseCategories from '../components/DataBaseCategories'

    export default {
        name: 'AdminPage',
        components: {
            MainHeader,
            DataBaseCategories
        },
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="scss">
    .admin-page {
        &__header {
            // background-color: #6771b0;
            height: 35px;
            position: relative;
            top: 50px;
            width: 100%;
            // color: white;
            padding: 0 20px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #a0a0a0;
        }
        &__main {
            position: relative;
            top: 50px;
            height: 300px;
            display: flex;
            // padding: 20px;
        }
        &__left {
            width: 20%;
        }
    }
</style>