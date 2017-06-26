<script>
    import player from 'components/player/rtsp.vue'
    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        components: {
        },
        beforeCreate() {
            this.$parent.$el.style.height = '100%';
        }
    };

</script>

<template class="main-body">
    <div class="main">
        <div class="main-top">

        </div>
        <div class="main-nav">

        </div>
        <div class="main-content">
            <router-view></router-view>
        </div>
    </div>
</template>


<style lang="sass" scoped>
    .main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .a {
        background: #000;
    }
</style>