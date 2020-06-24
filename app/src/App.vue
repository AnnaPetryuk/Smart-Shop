<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    *{
        box-sizing: border-box;
    }
    
    html, body, ul, p,
    h1, h2, h3, h4, h5 {
        margin: 0;
        padding: 0;
    }

    ul {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    label {
        margin: 0;
    }

    input,
    button,
    textarea {
        outline: none;
        border: none;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
