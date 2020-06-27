<template>
  <div class="db-categories">
        <div class="db-categories__item">
            <input id="db-item-1" type="radio" name="db-item" checked/>
            <label for="db-item-1" class="db-categories__title">Users</label>
            <div class="db-categories__content">
                <div class="db-categories__subitem">Add user</div>
                <div class="db-categories__subitem">Add administrator</div>
                <div class="db-categories__subitem">Change user</div>
                <div class="db-categories__subitem">Change administrator</div>
            </div>
        </div>
        <div class="db-categories__item">
            <input id="db-item-2" type="radio" name="db-item"/>
            <label for="db-item-2" class="db-categories__title">Goods</label>
            <div class="db-categories__content">
                <div class="db-categories__subitem">Add goods</div>
                <div class="db-categories__subitem">Change goods</div>
                <div class="db-categories__subitem">Delete goods</div>
            </div>
        </div>
  </div>
</template>

<script>
    import {mapMutations, mapGetters} from 'vuex';
  
    export default {
        name: 'DataBaseCategories',
        data() {
            return {
            }
        },
        methods: {
        },
        computed: {
        }
    }
</script>

<style lang="scss">
    #db-item-1, #db-item-2 {
        display: none;
    }

    #db-item-1:checked ~ .db-categories__content,
    #db-item-2:checked ~ .db-categories__content {
        height: 150px;
    }

    #db-item-1:checked ~ .db-categories__title:after,
    #db-item-2:checked ~ .db-categories__title:after {
        content: '-';
    }

    .db-categories {
        width: 100%;

        &__item {
            margin-bottom: 5px;
        }

        &__title {
            display: block;
            height: 30px;
            width: 100%;
            background-color: #4a517d;
            color: white;
            display: flex;
            padding: 15px;
            align-items: center;
            text-transform: uppercase;
            position: relative;
            font-weight: bold;

            &:after {
                content: '+';
                position: absolute;
                right: 20px;
            }

            &:hover {
                cursor: pointer;
            }
        }

        &__content {
            height: 0;
            transition: all 1s;
            overflow: hidden;
        }

        &__subitem {
            margin: 10px 0;
            padding: 0 20px;
            text-align: left;
            padding-bottom: 5px;
            border-bottom: 1px solid #a0a0a0;
            transition: all 0.5s;

            &:hover {
                cursor: pointer;
                color: #97a5ff;
            }
        }
    }
</style>