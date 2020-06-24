<template>
    <div id="not-found-page">
        <img src="../assets/404.png"/>
    </div>
</template>

<script>
    export default {
        name: 'NotFoundPage'
    }
</script>

<style lang="scss">
    #not-found-page {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            display: block;
            height: 100%;
            width: auto;
        }
    }
</style>