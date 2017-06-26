class Player {
    constructor(id) {
        var player = document.getElementById(id);
        if (!player) {
            throw new Error("Invalid player id");
        }
        var version = player.GetVersion && player.GetVersion();
        // console.log(player);
        if (!version) {
            throw new Error("Not supported");
        }
        console.log(version);
        // player.onWndDClik = function (index, x, y) {
        //     var isFullScreen = player.IsControlFullScreen();
        //     if (isFullScreen) {
        //         player.RestoreControlScreenShow();
        //     } else {
        //         player.SetControlFullScreen();
        //     }
        // };
        // player.onMouseDown = function (index, button, x, y) {
        //     console.log(index, button, x, y);
        // };

        this.player = player;
        // window.player = this.player;
    }

    // event(action) {
    //     let obj = {};
    //     this.player[action] = (i, b, m, n) => {
    //         obj.index = i;
    //         obj.button = b;
    //         obj.x = m;
    //         obj.y = n;
    //     }
    //     return obj
    // }

    destroy() {
        return this._cleanUp();
    }

    playRtsp(url, index = 0) {
        return new Promise((resolve, reject) => {
            var param = {
                type: 6,
                hwdecoder: 0,
                url: url,
                tcp: false,
                autoReconnect: true
            }
            var playCb = function (pos, result, userParam) {
                console.log('playCB:', result);
                if (result != 0) {
                    console.log("playRtsp failed play callback", result);
                    reject(result);
                }
            }
            var firstFrameCb = function (pos, result, userParam) {
                console.log('FFCB', result);
                if (result == 0) {
                    resolve(pos);
                } else {
                    console.log("playRtsp failed firstFrame callback", result);
                    reject(result);
                }
            }
            var ret = this.play(param, index, playCb, 0, firstFrameCb);
            if (ret != 0) {
                console.log("playRtsp failed", ret);
                reject(ret);
            }
        });
    }

    play(param, index = 0, playCb = undefined, playParam = 0
        , firstFrameCb = undefined, firstFrameParam = 0
        , endCb = undefined, endParam = 0) {
        if (!playCb) {
            playCb = function (pos, result, userParam) {
                console.log(pos, result, userParam, "play")
            }
        }
        if (!firstFrameCb) {
            firstFrameCb = function (pos, result, userParam) {
                console.log(pos, result, userParam, "firstFrame")
            }
        }
        if (!endCb) {
            endCb = function (pos, result, userParam) {
                console.log(pos, result, userParam, "end")
            }
        }
        return this._playEx2(JSON.stringify(param), index, playCb, playParam, firstFrameCb, firstFrameParam, endCb, endParam);
    }

    stop(index = 0, cb = undefined, param = 0) {
        return new Promise((resolve, reject) => {
            if (!cb) {
                cb = function (pos, result, userParam) {
                    if (result == 0) {
                        resolve();
                    } else {
                        console.log("stop failed callback", result);
                        reject(result);
                    }
                }
            }
            var ret = this._stopEx(false, index, cb, param);
            if (ret != 0) {
                console.log("stop failed", ret);
                reject(ret);
            }
        });
    }

    pause(index = 0) {
        return this._stopEx(true, index);
        // return this._stop(true, index);
    }

    _getVersion() {
        return this.player.GetVersion();
    }

    _cleanUp() {
        return this.player.CleanUp();
    }

    _play(param, index) {
        return this.player.Play(param, index);
    }

    _playEx2(param, index, playCb, playParam, firstFrameCb, firstFrameParam, endCb, endParam) {
        return this.player.PlayEx2(param, index, playCb, playParam, firstFrameCb, firstFrameParam, endCb, endParam);
    }

    _stop(pause, index) {
        return this.player.Stop(pause, index);
    }

    _stopEx(pause, index, cb, param) {
        return this.player.StopEx(pause, index, cb, param);
    }

    _setStreamLostByIndex(type, index) {
        return this.player.SetStreamLostByIndex(type, index);
    }

    capture(index, info) {
        return this.player.CapturePictureEx(index, info);
    }

    capture2(index, type) {
        return this.player.CatchPictrue(index, type);
    }

    capture3(index, type, width, height) {
        return this.player.CatchScaleDownPictureEx2(index, type, width, height);
    }

    _StartRecordVideo(index, path) {
        console.log(this.player);
        return this.player.StartDownLoadRecord(index, path)
    }

    _StopRecordVideo(index) {
        return this.player.StopDownLoadRecord(index)
    }

    _IsFocusWindow() {
        return this.player.IsFocusWindow()
    }

    _setRatio(type, index = -1) {
        return this.player.SetRatio(type, index)
    }
}

export default Player