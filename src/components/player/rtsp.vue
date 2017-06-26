<script>
    import Player from './ocx.js'
    export default {
        data() {
            return {
                player: null,
                player2: null,
                ratio: 0
            }
        },
        methods: {
            // init() {
            //     this.player = new Player('rtspPlayer');
            //     this.play('rtsp://192.168.17.236:8554/live/main');
            //     window.player = this.player
            // },
            // play(url) {
            //     // console.log("playing1", url);
            //     return this.player.playRtsp(url).catch(e => {
            //         console.log('fail');
            //         this.player._setStreamLostByIndex(1, 0);
            //         return this.stop();
            //     });
            // },

            // _button: function (e) {
            //     // console.log(this.player._IsFocusWindow());
            //     console.log(this.ratio);
            //     var res = this.player._setRatio(this.ratio)
            //     console.log('res:', res);
            // }
        },
        mounted() {
            // this.init();
            // var el = document.querySelector('#rtspPlayer');
            // console.log(el);
        },
    }

</script>

<template>
    <div>
        player
    </div>
</template>

<style lang="sass" scoped>
    .player {
        height: 480px;
        width: 640px;
    }

    .player2 {
        height: 240px;
        width: 320px;
        position: absolute;
        top: 100px;
        left: 100px;
    }

    .test {
        height: 200px;
        width: 200px;
        background: #000;
        position: absolute;
        z-index: 10000000;
        top: 50px;
        left: 50px;
    }
</style>