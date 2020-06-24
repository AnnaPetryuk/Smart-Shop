<template>
    <div class="header">
        <div class="header__logo"> Smart Shop </div>
        <div class="header__panel sprite">  
            <input id="for-search" type="checkbox" name="toggle-search"/>
            <label for="for-search" class="sprite__item sprite__item-search"></label>
            <input @input="searchByName" class="header__search" type="text" name="search" autocomplete="off" placeholder="Search"/>
            <div class="sprite__item sprite__item-card" @click="openCard">
                <div class="sprite__item-card--number" v-show="GET_CARD_GOODS.length">
                    {{GET_CARD_GOODS.length}}
                </div>
            </div>
            <div class="sprite__item sprite__item-profile">
                <div class="sprite__log-out" @click.stop="userLogout">Log out</div>
            </div>
        </div>
        <shopping-cart />
    </div>
</template>

<script>
    import {mapMutations, mapGetters, mapActions} from 'vuex';
    import ShoppingCart from './ShoppingCart.vue'

    export default {
        name: 'Header',
        components: {
            ShoppingCart
        },
        computed: {
            ...mapGetters(['GET_CARD_MODAL_VISIBILITY', 'GET_CARD_GOODS', 'GET_GOODS_LIST', 'GET_FULL_LIST']),
            ...mapGetters(['GET_USER', 'GET_AUTH_CONFIRMATION'])
        },
        mounted() {
            let card = localStorage.getItem(`user ${this.GET_USER.id}`);

            if(localStorage.getItem(`user ${this.GET_USER.id}`)) {
                this.SET_CARD_GOODS(JSON.parse(card));
            }
        },
        methods: {
            openCard() {
                this.SET_CARD_MODAL_VISIBILITY(true);
            },
            searchByName(event) {
                let changesPlace = this.GET_GOODS_LIST.length != this.GET_FULL_LIST ? this.GET_FULL_LIST.slice() : this.GET_GOODS_LIST.slice();
            
                if(event.target.value == '') {
                    changesPlace = this.GET_GOODS_LIST;
                }

                let curr = changesPlace.filter(item => 
                    item.title.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0
                );
                
                this.SET_FULL_LIST(curr);
            },
            userLogout() {
                this.$router.push('/');
                this.SET_AUTH_CONFIRMATION(false);
            },
            ...mapMutations(['SET_CARD_MODAL_VISIBILITY', 'SET_CARD_GOODS', 'SET_FULL_LIST']),
            ...mapMutations(['SET_AUTH_CONFIRMATION'])
        }
    }  
</script>

<style lang="scss">
    .header {
        position: fixed;
        z-index: 99999;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        background-color: #2a2f4a;
        color: #fff;

        &__logo {
            font-size: 26px;
        }

        &__panel {
            font-size: 18px;
        }

        &__search {
          background: none;
          border-bottom: 1px solid #ffffff;
          color: #ffffff;
          width: 0;
          visibility: hidden;
          transition: all 1s;
        }
    }

    #for-search {
        display: none;
    }

    #for-search:checked~.header__search  {
        visibility: visible;
        width: 200px;
    }

    .sprite {
        display: flex;
      
        &__item {
            margin: 0 10px;
            width: 30px;
            height: 30px;
            background: url('../assets/sprite.png');
            &:hover {
                cursor: pointer;
            }
        }

        &__item-search {
            background-position: -110px -60px;
        }
      
        &__item-card {
            position: relative;
            background-position: -10px -60px;
        }

        &__item-card--number {
            content: '';
            top: -3px;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            right: -3px;
            height: 14px;
            width: 14px;
            background-color: #49bd01;
            border-radius: 10px;
            font-size: 10px;
            color: #fff;
        }
        
        &__item-profile {
            background-position: -10px -10px;
            position: relative;
        }

        &__log-out {
            height: 30px;
            width: 80px;
            background-color: white;
            border-radius: 5px;
            position: absolute;
            top: 100%;
            right: 0;
            box-shadow: 0 14px 28px rgba(0,0,0,0.4), 
                        0 10px 10px rgba(0,0,0,0.4);
            visibility: hidden;
            color: #000;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .sprite__item-profile:hover > .sprite__log-out {
        visibility: visible;
    }
</style>