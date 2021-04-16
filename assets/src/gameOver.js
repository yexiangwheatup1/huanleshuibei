var a = require('WorldController')
cc.Class({
    extends: cc.Component,
    properties: {
    },
    onLoad: function() {
    },
    onEnable: function() {
        a.begin = !1, a.tryItem = !1, a.tryWater = !1, a.playNum++, a.playNum % 3 == 0 
    },
    onRewardAdClose: function() {
        var e = cc.find("Canvas/gameOver").getComponent("gameOver")
    },
    onRewardAdStop: function() {
        wx.showToast({
            title: "只有观看完整视频才能获得奖励哦",
            icon: "none",
            duration: 2500
        })
    },
    shareBtn: function() {
    },
    restartBtn: function() {
        a.waterIsSpawn = !1, a.win = !1;
        this.restart(e)
    },
    restart: function(e) {
        cc.director.loadScene("GameScene")
    },
    backBtn: function() {
        a.waterIsSpawn = !1, a.win = !1,cc.director.loadScene("MenuScene")
    },
    changeTime: function(e) {
        var t = "",
            n = Math.floor(e / 60);
        t = n < 10 ? "0" + n : n;
        var a = e % 60;
        return t = a < 10 ? t + ":0" + a : t + ":" + a
    },
    update: function() {
    }
})