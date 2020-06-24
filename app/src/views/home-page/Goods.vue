<template>
    <div class="goods">
        <goods-categories/>
        <div class="goods__container">  
            <goods-filter/>
            <div class="goods__main" v-if="GET_FULL_LIST.length">
                <div v-for="item in GET_FULL_LIST" v-bind:key="item.id">
                    <goods-item :item="item"></goods-item>
                </div>
            </div>
            <div class="goods__no-results" v-else>
                 <img src="../../assets/found.png"/>
               <h3> No matches </h3> 
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapGetters, mapActions} from 'vuex';
    import GoodsItem from '../../components/GoodsItem.vue';
    import GoodsCategories from '../../components/Categories.vue';
    import GoodsFilter from '../../components/GoodsFilter.vue'
  
    export default {
        name: 'Goods',
        components: {
            GoodsItem,
            GoodsCategories,
            GoodsFilter
        },
        methods: {
            ...mapMutations(['SET_FULL_LIST', "SET_GOODS_LIST"])
        },
        computed: {
            ...mapGetters(['GET_GOODS_LIST', 'GET_CATEGORY', 'GET_FULL_LIST'])
        },
        watch: {
            GET_CATEGORY(category) {
                if(category) {
                    let curr = this.GET_GOODS_LIST.filter(item => item.category == category.toLowerCase().slice(0, -1));
                    this.SET_FULL_LIST(curr);
                } else {
                    this.SET_FULL_LIST(this.GET_GOODS_LIST);
                }
            }
        }
    }
</script>

<style lang="scss">
    .goods {
        &__container {
            margin-left: 250px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }

        &__main {
            padding: 20px;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            grid-gap: 20px;
        }

        &__no-results {
            margin-top: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
</style>