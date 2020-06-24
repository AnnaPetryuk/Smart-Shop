<template>
    <div class="modal-container">
        <div class="modal-container__block modal-container__block--shadow modal-container__block--centring">
            <div class="modal-container__title">
                <slot name="title"></slot>
            </div>

            <div class="modal-container__content">
                <slot name="content"></slot>
            </div>

            <div class="modal-container__panel">
                <slot name="panel"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal'
    }
</script>

<style lang="scss">

    .modal-container {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(1,1,1,0.2);
        transition: all 0.6s;

        &__block {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 800px;
            border-radius: 5px;
            background: #fff;
        }

        &__block--shadow {
            box-shadow: 0 14px 28px rgba(0,0,0,0.4),
                        0 10px 10px rgba(0,0,0,0.4);
        }

        &__block--centring {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        &__title {
            border-bottom: 1px solid #d3d3d3;
            text-align: center;
            font-size: 20px;
            padding: 10px;
        }

        &__content {
            padding: 30px 15px;
        }

        &__panel {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: flex-end;
            border-top: 1px solid #d3d3d3;
        }
    }
</style>
