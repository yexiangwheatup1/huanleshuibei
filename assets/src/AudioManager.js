//白菜价出100多套cocoscreator源码9.9一个 也有联网99一个Q:2483367084

var x = require('GameDataManager')
module.exports = {
        bgm: null,
        audioResArray: [],
        preloadAudio: function(e) {
            var b = this;
            cc.loader.loadResDir(e, cc.AudioClip, function(e, _) {
                e ? console.error("资源加载错误") : b.audioResArray = _;
            }), cc.audioEngine.setMusicVolume(.3);
        },
        getAudioClipByName: function(e) {
            for (var b = 0; b < this.audioResArray.length; b++)
                if (this.audioResArray[b]._name == e) return this.audioResArray[b];
            return null;
        },
        playEffect: function(e) {
            var b = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
            if (x.sound) {
                var _ = this.getAudioClipByName(e);
                cc.audioEngine.playEffect(_, b);
            }
        },
        stopAllEffect: function() {
            cc.audioEngine.stopAllEffects();
        },
        playButtonClickEffect: function() {
            this.playEffect("click");
        },
        stopAllAudios: function() {
            cc.audioEngine.stopAll();
        },
        pauseAllAudios: function() {
            cc.audioEngine.pauseAll();
        },
        resumeAllAudio: function() {
            cc.audioEngine.resumeAll();
        },
        playBGM: function(e) {
            var b = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
            if ((this.bgm != e || !cc.audioEngine.isMusicPlaying()) && (this.bgm = e,
                    x.music)) {
                this.stopBGM();
                var _ = this.getAudioClipByName(e);
                cc.audioEngine.playMusic(_, b);
            }
        },
        pauseBGM: function() {
            this.stopBGM();
        },
        resumeBGM: function() {
            this.bgm && this.playBGM(this.bgm);
        },
        stopBGM: function() {
            cc.audioEngine.stopMusic();
        }
    };