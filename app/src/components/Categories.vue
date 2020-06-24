<template>
  <div class="categories">
      <div class="categories__point">
          <div class="categories__home" @click="resetCurr"></div>
          <div v-if="GET_CATEGORY" class="categories__current"> - {{GET_CATEGORY}}</div>
      </div>
      <ul class="categories__nav">
          <li v-for="item in categoriesList" v-bind:key="item.id" @click="setCurr(item.title)" class="categories__item">{{item.title}}</li>
      </ul>
  </div>
</template>

<script>
    import {mapMutations, mapGetters} from 'vuex';
  
    export default {
        name: 'Categories',
        data() {
            return {
                categoriesList: [
                    {
                        id: 1,
                        title: 'Laptops'
                    },
                    {
                        id: 2,
                        title: 'TVs'
                    },
                    {
                        id: 3,
                        title: 'Phones'
                    },
                    {
                        id: 4,
                        title: 'Tablets'
                    },
                    {
                        id: 5,
                        title: 'Monitors'
                    }
                ]
            }
        },
        methods: {
            setCurr(title) {
                this.SET_CATEGORY(title);
            },
            resetCurr() {
                this.SET_CATEGORY(null);
            },
            ...mapMutations(['SET_CATEGORY'])
        },
        computed: {
            ...mapGetters(['GET_CATEGORY'])
        }
    }
</script>

<style lang="scss">
    .categories {
        position: fixed;
        width: 250px;
        height: calc(100vh - 50px);
        top: 50px;
        bottom: 0;
        border-right: 1px solid #a0a0a0;

        &__point {
            height: 40px;
            padding: 5px;
            display: flex;
            align-items: flex-end;
        }

        &__home {
            background: url('../assets/sprite.png') -110px -10px;
            height: 30px;
            width: 30px;

            &:hover {
                cursor: pointer;
            }
        }

        &__nav {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }

        &__current {
            font-size: 20px;
            margin: 0 10px;
        }

        &__item {
            display: block;
            border-bottom: 1px solid #a0a0a0;
            width: 100%;
            padding: 10px 20px;
            text-align: left;

            &:hover {
                cursor: pointer;
            }
        }
    }
</style>