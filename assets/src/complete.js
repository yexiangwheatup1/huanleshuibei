var a = require('WorldController'),
    o = require('LocalStorageData'),
    i = require('GameDataManager');
cc.Class({
    extends: cc.Component,
    properties: {
        star1: cc.Node,
        star2: cc.Node,
        starsNode: cc.Node,
        starSprite: cc.SpriteFrame,
        goldShow: cc.Node,
        shareButton: cc.Node,
        rewardIcon: cc.SpriteFrame
    },
    onLoad: function() {
        this.goldReward = 0
    },
    onEnable: function() {
        a.playNum++, 
        a.repeat = !1
    },
    init: function() {
        var e = o.get("levelNum");
        a.currentLevel == e && o.set("levelNum", e + 1), a.currentLevel < 5 ? (cc.find("Canvas/complete/completeNode/btnNode/shareBtn2").active = !1, cc.find("Canvas/complete/completeNode/btnNode/vedioBtn2").active = !0, cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active = !1, cc.find("Canvas/complete/completeNode/btnNode/vedioBtn").active = !0) : a.currentLevel % 2 == 1 ? (cc.find("Canvas/complete/completeNode/btnNode/shareBtn2").active = !0, cc.find("Canvas/complete/completeNode/btnNode/vedioBtn2").active = !1, cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active = !1, cc.find("Canvas/complete/completeNode/btnNode/vedioBtn").active = !0) : (cc.find("Canvas/complete/completeNode/btnNode/shareBtn2").active = !1, cc.find("Canvas/complete/completeNode/btnNode/vedioBtn2").active = !0, cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active = !0, cc.find("Canvas/complete/completeNode/btnNode/vedioBtn").active = !1);
        var t = cc.find("Canvas/UILayer/pen/lineLength").width,
            n = this,
            c = cc.callFunc(this.shake, this);
        t > this.star2.x + 120 ? (n.starsNode.children[1].children[1].active = !1, n.starsNode.children[2].children[1].active = !1, setTimeout(function() {
            n.starsNode.children[0].children[1].runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeCubicActionIn()), c)), setTimeout(function() {
                n.starsNode.children[0].children[0].getComponent(cc.ParticleSystem).resetSystem(), n.starsNode.children[1].children[1].active = !0, n.starsNode.children[1].children[1].runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeCubicActionIn()), c))
            }, 300), setTimeout(function() {
                n.starsNode.children[1].children[0].getComponent(cc.ParticleSystem).resetSystem(), n.starsNode.children[2].children[1].active = !0, n.starsNode.children[2].children[1].runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeCubicActionIn()), c))
            }, 600), setTimeout(function() {
                n.starsNode.children[2].children[0].getComponent(cc.ParticleSystem).resetSystem()
            }, 900)
        }, 500), this.goldReward = o.updateLevelStar("level" + a.currentLevel, 3, this.goldShow)) : t > this.star1.x + 120 ? (this.starsNode.children[2].children[1].active = !1, this.starsNode.children[2].children[0].active = !1, n.starsNode.children[1].children[1].active = !1, setTimeout(function() {
            n.starsNode.children[0].children[1].runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeCubicActionIn()), c)), setTimeout(function() {
                n.starsNode.children[0].children[0].getComponent(cc.ParticleSystem).resetSystem(), n.starsNode.children[1].children[1].active = !0, n.starsNode.children[1].children[1].runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeCubicActionIn()), c))
            }, 300), setTimeout(function() {
                n.starsNode.children[1].children[0].getComponent(cc.ParticleSystem).resetSystem()
            }, 600)
        }, 500), this.goldReward = o.updateLevelStar("level" + a.currentLevel, 2, this.goldShow)) : (this.starsNode.children[1].children[1].active = !1, this.starsNode.children[2].children[1].active = !1, this.starsNode.children[1].children[0].active = !1, this.starsNode.children[2].children[0].active = !1, setTimeout(function() {
            n.starsNode.children[0].children[1].runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeCubicActionIn()), c)), setTimeout(function() {
                n.starsNode.children[0].children[0].getComponent(cc.ParticleSystem).resetSystem()
            }, 300)
        }, 500), this.goldReward = o.updateLevelStar("level" + a.currentLevel, 1, this.goldShow))
    },
    shake: function() {
        var e = cc.find("Canvas/complete/completeNode");
        this.schedule(function() {
            e.position = cc.v2(0, 0), e.position = cc.v2(5 * (Math.random(0, 1) - .5), 5 * (Math.random(0, 1) - .5))
        }, .05, 4)
    },
    onRewardAdClose: function() {
        var e = cc.find("Canvas/complete").getComponent("complete");
        switch (e.rewardType) {
            case 2:
                o.updateGold(30), wx.showToast({
                    title: "成功领取30金币",
                    icon: "none",
                    duration: 2e3
                }), cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active ? (cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active = !1, cc.find("Canvas/complete/completeNode/btnNode/vedioBtn").active = !0) : (cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active = !0, cc.find("Canvas/complete/completeNode/btnNode/vedioBtn").active = !1), a.currentLevel < 5 && (cc.find("Canvas/complete/completeNode/btnNode/shareBtn2").active = !1, cc.find("Canvas/complete/completeNode/btnNode/vedioBtn2").active = !0, cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active = !1, cc.find("Canvas/complete/completeNode/btnNode/vedioBtn").active = !0);
                break;
            case 3:
                o.updateGold(2 * e.goldReward), wx.showToast({
                    title: "成功领取3倍奖励",
                    icon: "none",
                    duration: 2e3
                }), cc.find("Canvas/complete/completeNode/btnNode/shareBtn2").active ? cc.find("Canvas/complete/completeNode/btnNode/shareBtn2").getComponent(cc.Button).interactable = !1 : cc.find("Canvas/complete/completeNode/btnNode/vedioBtn2").getComponent(cc.Button).interactable = !1
        }
    },
    onRewardAdStop: function() {
        switch (cc.find("Canvas/complete").getComponent("complete").vedio) {
            case 1:
                wx.showToast({
                    title: "只有观看完整视频才能获得奖励哦",
                    icon: "none",
                    duration: 2500
                });
                break;
            case 2:
                a.currentLevel < 5 ? wx.showToast({
                    title: "只有观看完整视频才能获得奖励哦",
                    icon: "none",
                    duration: 2500
                }) : wx.showToast({
                    title: a.shareError[Math.floor(3 * Math.random(0, .99))],
                    icon: "none",
                    duration: 2500
                })
        }
    },
    nextLevelBtn: function() {
        if (a.waterIsSpawn = !1, a.win = !1, a.currentLevel + 1 >= a.levelNum) {
            return wx.showToast({
                title: "敬请期待后续关卡！",
                icon: "none",
                duration: 2e3
            }), void(this.click = !1);
        }
        this.nextLevel()
    },
    nextLevel: function(e) {
        a.currentLevel++, cc.director.loadScene("GameScene")
    },
    shareBtn: function() {
        this.rewardType = 2, this.vedio = 2, i.setRewardCloseClass(this.onRewardAdClose), i.setRewardStopClass(this.onRewardAdStop), a.share = !0
    },
    vedioBtn: function() {
        this.rewardType = 2, this.vedio = 1, i.setRewardCloseClass(this.onRewardAdClose), i.setRewardStopClass(this.onRewardAdStop)
    },
    shareBtn2: function() {
        this.rewardType = 3, this.vedio = 2, i.setRewardCloseClass(this.onRewardAdClose), i.setRewardStopClass(this.onRewardAdStop), a.share = !0
    },
    vedioBtn2: function() {
        this.rewardType = 3, this.vedio = 1, i.setRewardCloseClass(this.onRewardAdClose), i.setRewardStopClass(this.onRewardAdStop)
    },
    restartBtn: function() {
        a.waterIsSpawn = !1, a.win = !1;
        this.restart(e)
    },
    restart: function(e) {
        cc.director.loadScene("GameScene")
    },
    backBtn: function() {
        a.waterIsSpawn = !1, a.win = !1, cc.director.loadScene("MenuScene")
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