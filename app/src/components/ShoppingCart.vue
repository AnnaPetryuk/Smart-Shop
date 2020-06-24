<template>
    <div class="cart">
        <modal v-show="GET_CARD_MODAL_VISIBILITY">
            <template v-slot:title>
                <div class="cart__title">Cart</div>
            </template>
            <template v-slot:content>
                <div class="cart__content" v-if="GET_CARD_GOODS.length">
                    <div v-for="item in GET_CARD_GOODS" v-bind:key="item.id">
                        <cart-item :item="item" @changeGoodsCost="sumOfGoods"></cart-item>
                    </div>
                    <div class="cart__summary">Total cost: <span>{{totalCost}} ₴</span></div>
                </div>
                <div v-else>
                    <img src="../assets/empty.jpg"/>
                </div>
            </template>
            <template v-slot:panel>
                <button class="cart__button" @click="send">Send</button>
                <button class="cart__button" @click="close">Cancel</button>
            </template>
        </modal>
    </div>
</template>

<script>
    import axios from 'axios'
    import Modal from './general/Modal.vue'
    import CartItem from './CartItem.vue'
    import {mapGetters, mapMutations, mapActions} from 'vuex';

    export default {
        name: 'ShoppingCart',
        components: {
            Modal,
            CartItem
        },
        data() {
            return {
                totalCost: 0,
                listOfCosts: {}
            }
        },
        computed: {
            ...mapGetters(['GET_USER']),
            ...mapGetters(['GET_CARD_MODAL_VISIBILITY', 'GET_CARD_GOODS'])
        },
        methods: {
            sumOfGoods(id, cost) {
                this.listOfCosts[id] = cost;
                this.totalCost = this.sumCosts();
            },
            sumCosts() {
                let sum = 0;

                for(let key in this.listOfCosts) {
                    sum += this.listOfCosts[key];
                }

                return sum;
            },
            send() {
                let dataToSend = [];
                for(let key in this.listOfCosts) {
                    let item = this.GET_CARD_GOODS.find(element => element.id == key);
                    item.totalCost = this.listOfCosts[key];
                    dataToSend.push(item); 
                }
                dataToSend.push(this.GET_USER.id);
                axios
                    .post('http://localhost:3003/create-card', dataToSend)
                    .then(response => {
                        localStorage.removeItem(`user ${response.data}`);
                        this.SET_CARD_MODAL_VISIBILITY(false);
                        this.SET_CARD_GOODS([]);
                    })
                    .catch(error => console.log(error));
            },
            close() {
                this.SET_CARD_MODAL_VISIBILITY(false)
            },
            ...mapMutations(['SET_CARD_MODAL_VISIBILITY', 'SET_CARD_GOODS'])
        },
        watch: {
            GET_CARD_GOODS(cardGoods) {
                for(let key in this.listOfCosts) {
                    const found = cardGoods.find(element => element.id == key);
                    if(!found) {
                        delete this.listOfCosts[key];
                    }
                }
                this.totalCost = this.sumCosts();
            }
        }
    }
</script>

<style lang="scss">

    .cart {
        position: fixed;
        color: #000;

        &__content {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            height: 400px;
            width: 100%;
            overflow-y: scroll;
        }

        &__goods {
            color: black;
            display: flex;
            align-items: center;
        }

        &__summary {
            display: flex;
            justify-content: flex-end;
            padding: 15px;
            font-size: 24px;
            span {
                margin-left: 5px;
                color: #f84147;
            }
        }

        &__title {
            font-size: 20px;
        }

        &__button {
            font-weight: bold;
            font-size: 14px;
            text-transform: uppercase;
            padding: 15px 20px;
	        color: #68c1de;
            border: 0;
            background: none;
            outline: none;
            
            &:hover {
                cursor: pointer;
            }
            &:active{
                outline: none;
            }
        }
    }
</style>