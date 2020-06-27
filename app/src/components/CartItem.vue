<template>
    <div class="cart-item">
        <div class="cart-item__image">
            <img :src="item.img"/>
        </div>
        <h4 class="cart-item__title">
            {{item.title}}
        </h4>
        <div class="cart-item__number">
            <span v-if="counter>1" @click="decreaseCounter">-</span>
            <input type="text" name="number" v-model="counter" value="1"/>
            <span @click="increaseCounter">+</span>
        </div>
        <div class="cart-item__price-after">
            <span class="cart-item__price-after--old">{{priceAfter}} ₴</span>
            {{sumOfGoods}}
            <span>₴</span>
        </div>
        <div class="cart-item__remove" @click="removeFromCard">&#10008;</div>
    </div>
</template>

<script>
    import ItemType from './ItemType.vue'
    import {mapMutations, mapGetters, mapActions} from 'vuex'

    export default {
        name: 'CartItem',
        components: {
            ItemType
        },
        props: {
            item: Object
        },
        data() {
            return {
                cardFromStore: null,
                counter: this.item.amount || 1
            }
        },
        computed: {
            ...mapGetters(['GET_USER']),
            ...mapGetters(['GET_GOODS_LIST', 'GET_CARD_GOODS']),
            
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
            
            sumOfGoods() {
                return this.priceAfter * (this.counter || 1);
            }
        },
        mounted() {
            this.changeCost(this.item.id, this.sumOfGoods)
        },
        methods: {
            ...mapMutations(['SET_CARD_GOODS']),
            changeCost(id, cost) {
				this.$emit('changeGoodsCost', id, cost);
			},
            increaseCounter() {
                this.counter += 1;
                this.changeCard(this.counter);
                this.changeCost(this.item.id, this.sumOfGoods);
            },
            decreaseCounter() {
                this.counter -= 1;
                this.changeCard(this.counter);
                this.changeCost(this.item.id, this.sumOfGoods);
            },
            changeCard(value) {
                let goods = this.GET_CARD_GOODS;

                goods.forEach((item) => {
                    if(item.id == this.item.id) {
                        item.amount = value;
                    }
                });
                this.SET_CARD_GOODS(goods);
                localStorage.setItem(`user ${this.GET_USER.id}`, JSON.stringify(goods));
            },
            removeFromCard() {
                let userCard = JSON.parse(localStorage.getItem(`user ${this.GET_USER.id}`));
                let newCard = userCard.filter(item => item.id !== this.item.id);
                
                if(newCard.length == 0) {
                    localStorage.removeItem(`user ${this.GET_USER.id}`);
                } else {
                    localStorage.setItem(`user ${this.GET_USER.id}`, JSON.stringify(newCard));
                }
                this.SET_CARD_GOODS(newCard);
            }
        }
    }
</script>

<style scoped lang="scss">

    .cart-item {
        position: relative;
        height: 150px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        margin: 5px 0;
        border: 1px solid #a0a0a0;

        &__image {
            height: 100%;
            width: 70px;
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
            width: 200px;
            text-align: left;
            text-align: left;
            font-weight: normal;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        &__number {
            width: 100px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            span {
                color: #2a2f4a;
                font-size: 24px;
                padding: 0 8px;
                &:hover {
                    cursor: pointer;
                }
            }
            input {
                width: 40px;
                height: 25px;
                border: 1px solid black;
                border-radius: 5px;
                text-align: center;
            }
        }

        &__price-after {
            width: 100px;
            font-size: 24px;
            margin: 5px 0;
            color: #f84147;
        }

        &__price-after--old {
            color: #8a8080;
        }

        &__remove {
            position: absolute;
            top: 5px;
            right: 5px;

            &:hover {
                cursor: pointer;
            }
        }
    }
</style>