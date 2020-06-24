import axios from 'axios'
  
export default  {
    state: {
        goodsList: [],
        fullList: [],
        category: null,
        cardGoods: [],
        isCardModalVisible: false
    },
    mutations: {
        'SET_GOODS_LIST'(state, payload) {
            state.goodsList = payload;
        },
        'SET_FULL_LIST'(state, payload) {
            state.fullList = payload;
        },
        'SET_CATEGORY'(state, payload) {
            state.category = payload;
        },
        'SET_CARD_GOODS'(state, payload) {
            state.cardGoods = payload;
        },
        'SET_CARD_MODAL_VISIBILITY'(state, payload) {
            state.isCardModalVisible = payload;
        }
    },
    getters: {
        'GET_GOODS_LIST'({goodsList}) {
            return goodsList;
        },
        'GET_FULL_LIST'({fullList}) {
            return fullList;
        },
        'GET_CATEGORY'({category}) {
            return category;
        },
        'GET_CARD_GOODS'({cardGoods}) {
            return cardGoods;
        },
        'GET_CARD_MODAL_VISIBILITY'({isCardModalVisible}) {
            return isCardModalVisible;
        }
    },
    actions: {
        getGoodsList({commit}, payload) {
            axios
                .get('http://localhost:3003/get-goods')
                .then(response => {
                    commit('SET_GOODS_LIST', response.data);
                    commit('SET_FULL_LIST', response.data);
                })
                .catch(error => console.log(error));
        }
    }
}