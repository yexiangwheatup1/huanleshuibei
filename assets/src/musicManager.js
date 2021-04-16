cc.Class({
    extends: cc.Component,
    properties: {
        water: {
            type: cc.AudioClip,
            default: null
        },
        win: {
            type: cc.AudioClip,
            default: null
        },
        lose: {
            type: cc.AudioClip,
            default: null
        },
        complete: {
            type: cc.AudioClip,
            default: null
        },
        pen: {
            type: cc.AudioClip,
            default: null
        },
        button: {
            type: cc.AudioClip,
            default: null
        }
    },
    waterAudio: function() {
        cc.audioEngine.play(this.water, !1, .5)
    },
    winAudio: function() {
        cc.audioEngine.play(this.win, !1, .5)
    },
    loseAudio: function() {
        cc.audioEngine.play(this.lose, !1, .5)
    },
    completeAudio: function() {
        cc.audioEngine.play(this.complete, !1, .5)
    },
    buttonAudio: function() {
        cc.audioEngine.play(this.button, !1, .5)
    },
    penAudio: function() {
        this.penEffect && -1 != cc.audioEngine.getState(this.penEffect) || (this.penEffect = cc.audioEngine.play(this.pen, !1, .5))
    },
    stopPenAudio: function() {
        cc.audioEngine.stop(this.penEffect)
    }
})