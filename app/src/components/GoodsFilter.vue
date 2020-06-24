<template>
    <div class="goods-filter">
        <input id="sort" type="checkbox" name="sortByCost" v-model="checked" unchecked/>
        <label for="sort" class="goods-filter__sort">Cost</label>
        <div class="goods-filter__sort--reset" @click="resetSort">&#x2718;</div>
    </div>
</template>

<script>
    import {mapMutations, mapGetters} from 'vuex';

    export default {
        name: 'GoodsFilter',
        data() {
            return {
                checked: null
            }
        },
        methods: {
            resetSort(event) {
                this.checked = null;
            },
            ...mapMutations(['SET_FULL_LIST', "SET_GOODS_LIST"])
        },
        computed: {
            ...mapGetters(['GET_GOODS_LIST', 'GET_FULL_LIST'])
        },
        watch: {
            checked() {
                let changesPlace = this.GET_GOODS_LIST.length != this.GET_FULL_LIST ? this.GET_FULL_LIST.slice() : this.GET_GOODS_LIST.slice();
            
                if(this.checked) {
                    let curr = changesPlace.sort((a, b) => a.price > b.price ? 1 : -1);
                    this.SET_FULL_LIST(curr);
                }
                if(!this.checked) {
                    let curr = changesPlace.sort((a, b) => a.price > b.price ? -1 : 1);
                    this.SET_FULL_LIST(curr);
                }
                if(this.checked == null) {
                    this.SET_FULL_LIST(this.GET_GOODS_LIST);
                }
                
            }
        }
    }
</script>

<style lang="scss">
    #sort {
        display: none;
    }
    .goods-filter {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #a0a0a0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 20px;

        &__sort {
            width: 75px;
            font-size: 16px;
            position: relative;
            border-radius: 14px;
            border: 1px solid black;
            text-align: left;
            padding: 2px 10px;

            &:hover {
                cursor: pointer;
            }

            &:after {
                content: '\2191';
                font-size: 20px;
                position: absolute;
                right: 16px;
                bottom: 2px;
            }
        }

        &__sort--reset {
            margin: 0 5px;
            font-size: 8px;
            width: 14px;
            height: 14px;
            background: #ffffff;
            border-radius: 15px;
            text-align: center;
            border: 1px solid black;
            &:hover {
                cursor: pointer;
            }
        }

        #sort:checked ~ .goods-filter__sort:after {
            content: '\2193';
        }
    }
</style>