<template>
    <div class="goods-item">
        <ItemType 
            :styleForPercentSale="item.percentSale"
            :styleForTop="item.isTop"
            :styleForNew="item.isNew"
            :styleForSale="item.sale" />
    
        <div class="goods-item__image">
            <img :src="item.img"/>
        </div>
        <h4 class="goods-item__title">
            {{item.title}}
        </h4>
        <div class="goods-item__price-before">
            {{priceBefore}}
            <span v-if="priceBefore">₴</span>
        </div>
        <div class="goods-item__price-after">
            {{priceAfter}}
            <span>₴</span>
        </div>
        <input :id="item.id+'-card'" 
                type="checkbox" 
                :name="item.id+'-card'" 
                @change="changeCard(item.id, $event)"
                :checked="GET_CARD_GOODS.find(goods => goods.id == item.id )"/>
        <label :for="item.id+'-card'" class="goods-item__card"></label>
    </div>
</template>

<script>
    import ItemType from './ItemType.vue'
    import {mapMutations, mapGetters, mapActions} from 'vuex'

    export default {
        name: 'GoodsItem',
        components: {
            ItemType
        },
        props: {
            item: Object
        },
        data() {
            return {
                cardFromStore: null
            }
        },
        computed: {
            priceBefore() {
                let price = '';

                if(this.item.percentSale || this.item.sale) {
                    price = this.item.price;
                }

                return price;
            },
            priceAfter() {
                let price = this.item.price;

                if(this.item.percentSale) {
                    price = this.item.price - (this.item.price * this.item.percentSale / 100);
                    price = Math.round(price);
                }
                if(this.item.sale) {
                    price = this.item.price - this.item.sale;
                }

                return price;
            },
            ...mapGetters(['GET_USER']),
            ...mapGetters(['GET_GOODS_LIST', 'GET_CARD_GOODS', 'GET_GOODS_MODAL_VISIBILITY'])
        },
        methods: {
            ...mapMutations(['SET_CARD_GOODS', 'SET_GOODS_MODAL_VISIBILITY', 'SET_CURRENT_GOODS']),
            changeCard(itemId, event) {
                let userCard = localStorage.getItem(`user ${this.GET_USER.id}`);
                let localCard = userCard ? JSON.parse(userCard) : [];

                if(event.target.checked) {
                    localCard = this.addToCard(localCard, itemId);
                } else {
                    localCard = this.removeFromCard(localCard, itemId);
                }

                this.SET_CARD_GOODS(localCard);
            },
            addToCard(localCard, itemId) {
                localCard.push(this.GET_GOODS_LIST[itemId-1]);
                localStorage.setItem(`user ${this.GET_USER.id}`, JSON.stringify(localCard));

                return localCard;
            },
            removeFromCard(localCard, itemId) {
                let newCard = localCard.filter(item => item.id !== itemId);
                
                if(newCard.length == 0) {
                    localStorage.removeItem(`user ${this.GET_USER.id}`);
                } else {
                    localStorage.setItem(`user ${this.GET_USER.id}`, JSON.stringify(newCard));
                }
                
                return newCard;
            }
        }
    }
</script>

<style scoped lang="scss">
    input {
        display: none;
    }

    .goods-item {
        position: relative;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 15px;
        transition: all 0.5s;

        &:hover {
            transform: scale(1.05);
            box-shadow: 0 0 5px 2px #000;
            cursor: pointer;
        }

        &__image {
            height: 170px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                display: block;
                max-width: 95%;
                max-height: 95%;
            }
        }

        &__title {
            text-align: left;
            font-weight: normal;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        &__price-before {
            height: 14px;
            font-size: 14px;
            margin: 5px 0;
            color: #a6a5a5;
            text-decoration: line-through;
        }

        &__price-after {
            height: 24px;
            font-size: 24px;
            margin: 5px 0;
            color: #f84147;
        }

        &__card {
            position: absolute;
            height: 40px;
            width: 45px;
            bottom: 20px;
            right: 10px;
            border-radius: 20px;
            background: #2a2f4a;
            &:before {
                content: '';
                height: 30px;
                width: 30px;
                top: 6px;
                left: 7px;
                position: absolute;
                background: url('../assets/sprite.png') -10px -60px;
            }
            &:after {
                content: '\2714';
                top: -2px;
                position: absolute;
                right: -2px;
                height: 16px;
                width: 16px;
                background-color: #49bd01;
                border-radius: 10px;
                font-size: 12px;
                color: #fff;
                display: none;
            }
            &:hover {
                cursor: pointer;
            }
            
        }
        &__remove {
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 20px;

            &:hover {
                cursor: pointer;
            }
        }
        input:checked ~ .goods-item__card:after {
            display: block;
        }
    }
</style>
