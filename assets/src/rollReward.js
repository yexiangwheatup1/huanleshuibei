var a = require('LocalStorageData'),
    c = require('WorldController'),
    i = require('GameDataManager');
cc.Class({
    extends: cc.Component,
    properties: {
        zhuanpan: cc.Node,
        beginBtn: cc.Node,
        itemNum: 8,
        showLayer: cc.Node,
        shareBtn: cc.Node,
        videoBtn: cc.Node,
        closeBtn: cc.Node,
        reward2: cc.SpriteFrame
    },
    onLoad: function() {
        this.rewardNum = 0
    },
    onEnable: function() {
        isNaN(a.get("glass9")) || (this.zhuanpan.getComponent(cc.Sprite).spriteFrame = this.reward2)
    },
    onRewardAdClose: function() {
        var e = cc.find("Canvas/rollLayer").getComponent("rollReward");
        switch (e.rewardType) {
            case 1:
                e.zhuanpan.rotation = 0, e.rewardNum++, e.reward()
        }
    },
    onRewardAdStop: function() {
        var e = cc.find("Canvas/rollLayer").getComponent("rollReward");
        1 == e.tishi ? (wx.showToast({
            title: "只有观看完整视频才能获得奖励哦",
            icon: "none",
            duration: 2500
        }), e.videoBtn.getComponent("cc.Button").interactable = !0) : (wx.showToast({
            title: c.shareError[Math.floor(3 * Math.random(0, .99))],
            icon: "none",
            duration: 2500
        }), e.shareBtn.getComponent("cc.Button").interactable = !0)
    },
    getRandom: function(e, t) {
        return Math.floor(Math.random(0, .99) * (t - e)) + e
    },
    getEnd: function(e) {
        return console.log(e), e < 2 ? this.getRandom(0, 360 / this.itemNum - 1) : e < 17 ? 360 / this.itemNum + this.getRandom(0, 360 / this.itemNum - 1) : e < 27 ? 360 / this.itemNum * 2 + this.getRandom(0, 360 / this.itemNum - 1) : e < 47 ? 360 / this.itemNum * 3 + this.getRandom(0, 360 / this.itemNum - 1) : e < 55 ? 360 / this.itemNum * 4 + this.getRandom(0, 360 / this.itemNum - 1) : e < 70 ? 360 / this.itemNum * 5 + this.getRandom(0, 360 / this.itemNum - 1) : e < 80 ? 360 / this.itemNum * 6 + this.getRandom(0, 360 / this.itemNum - 1) : 360 / this.itemNum * 7 + this.getRandom(0, 360 / this.itemNum - 1)
    },
    beginBtnEvent: function() {
        this.reward(), this.beginBtn.getComponent("cc.Button").interactable = !1
    },
    reward: function() {
        var e = this,
            t = this.getRandom(0, 100),
            n = this.getEnd(t),
            a = cc.callFunc(function() {
                e.getReward(n), e.beginBtn.active = !1, e.rewardNum, c.currentLevel < 5 ? (e.videoBtn.active = !0, e.videoBtn.getComponent(cc.Button).interactable = !0) : e.shareBtn.active ? (e.videoBtn.active = !0, e.shareBtn.active = !1, e.videoBtn.getComponent(cc.Button).interactable = !0) : (e.shareBtn.active = !0, e.videoBtn.active = !1, e.shareBtn.getComponent(cc.Button).interactable = !0), e.closeBtn.active = !0
            }, this),
            o = cc.rotateBy(2, 2160).easing(cc.easeQuarticActionIn()),
            i = cc.rotateBy(3, n + 1080).easing(cc.easeQuarticActionOut());
        this.zhuanpan.runAction(cc.sequence(o, i, a))
    },
    getReward: function(e) {
        switch (Math.floor((360 - e) / (360 / this.itemNum))) {
            case 0:
                a.updateGold(20), wx.showToast({
                    title: "金币+20",
                    icon: "none",
                    duration: 2e3
                });
                break;
            case 1:
                a.updateGold(80), wx.showToast({
                    title: "金币+80",
                    icon: "none",
                    duration: 2e3
                });
                break;
            case 2:
                a.updateGold(50), wx.showToast({
                    title: "金币+50",
                    icon: "none",
                    duration: 2e3
                });
                break;
            case 3:
                a.updateGold(100), wx.showToast({
                    title: "金币+100",
                    icon: "none",
                    duration: 2e3
                });
                break;
            case 4:
                a.updateGold(20), wx.showToast({
                    title: "金币+20",
                    icon: "none",
                    duration: 2e3
                });
                break;
            case 5:
                a.updateGold(80), wx.showToast({
                    title: "金币+80",
                    icon: "none",
                    duration: 2e3
                });
                break;
            case 6:
                a.updateGold(50), wx.showToast({
                    title: "金币+50",
                    icon: "none",
                    duration: 2e3
                });
                break;
            case 7:
                isNaN(a.get("glass9")) ? (a.set("glass9", 0), this.showLayer.active = !0, this.showLayer.getComponent("tryItem").showItem = !0, this.node.active = !1) : (a.updateGold(100), wx.showToast({
                    title: "金币+100",
                    icon: "none",
                    duration: 2e3
                }))
        }
    },
    tryBtn: function() {
        this.rewardType = 1, this.tishi = 1, 
        i.setRewardCloseClass(this.onRewardAdClose), 
        i.setRewardStopClass(this.onRewardAdStop), 
        this.videoBtn.getComponent("cc.Button").interactable = !1
    },
    shareEvent: function() {
        this.rewardType = 1, this.tishi = 2, 
        i.setRewardCloseClass(this.onRewardAdClose), 
        i.setRewardStopClass(this.onRewardAdStop), c.share = !0, this.shareBtn.getComponent("cc.Button").interactable = !1
    },
    close: function() {
        this.node.active = !1, cc.find("Canvas/complete").active = !0, cc.find("Canvas/complete").getComponent("complete").init(), cc.find("Canvas/music").getComponent("musicManager").winAudio()
    },
    onDisable: function() {
    }
})