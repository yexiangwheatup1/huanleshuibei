//白菜价出100多套cocoscreator源码9.9一个 也有联网99一个Q:2483367084
var a = require('WorldController'),
    o = require('LocalStorageData'),
    i = require('GameDataManager');
cc.Class({
    extends: cc.Component,
    properties: {
        closeBtn: cc.Node,
        glassIcon: cc.Node,
        shareNode: cc.Node,
        videoNode: cc.Node,
        useBtn: cc.Node,
        glass1Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass2Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass3Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass4Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass5Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass6Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass7Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass8Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        rewardGlass: {
            default: [],
            type: cc.SpriteFrame
        },
        glass9Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass10Atlas: {
            default: [],
            type: cc.SpriteFrame
        }
    },
    onLoad: function() {
        this.showItem = !1
    },
    onEnable: function() {
        var e = this;
        setTimeout(function() {
            e.closeBtn.active = !0
        }, 2e3), this.glass = [], this.scheduleOnce(function() {
            if (this.tryNum = this.getGlassNum(), this.showItem) this.glass = this.rewardGlass, this.videoNode.active = !1, this.shareNode.active = !1, this.useBtn.active = !0;
            else switch (a.currentLevel < 5 ? (this.videoNode.active = !0, this.shareNode.active = !1) : a.currentLevel % 2 == 1 ? (this.videoNode.active = !1, this.shareNode.active = !0) : (this.videoNode.active = !0, this.shareNode.active = !1), this.tryNum) {
                case 0:
                    this.glass = this.glass1Atlas;
                    break;
                case 1:
                    this.glass = this.glass2Atlas;
                    break;
                case 2:
                    this.glass = this.glass3Atlas;
                    break;
                case 3:
                    this.glass = this.glass4Atlas;
                    break;
                case 4:
                    this.glass = this.glass5Atlas;
                    break;
                case 5:
                    this.glass = this.glass6Atlas;
                    break;
                case 6:
                    this.glass = this.glass7Atlas;
                    break;
                case 7:
                    this.glass = this.glass8Atlas;
                    break;
                default:
                    this.glass = this.glass1Atlas
            }
            this.glassIcon.getComponent(cc.Sprite).spriteFrame = this.glass[0]
        }.bind(this), .02);
        var t = 0;
        this.schedule(function() {
            3 == t && (t = 0), this.glassIcon.getComponent(cc.Sprite).spriteFrame = this.glass[t], t++
        }, 1), a.tryItem = !1, a.tryWater = !1
    },
    onRewardAdClose: function() {
        var e = cc.find("Canvas/tryItem").getComponent("tryItem");
        switch (e.rewardType) {
            case 1:
                a.tryItem = !0, a.tryNum = e.tryNum, e.close()
        }
    },
    onRewardAdStop: function() {
        1 == cc.find("Canvas/tryItem").getComponent("tryItem").tishi ? wx.showToast({
            title: "只有观看完整视频才能获得奖励哦",
            icon: "none",
            duration: 2500
        }) : wx.showToast({
            title: a.shareError[Math.floor(3 * Math.random(0, .99))],
            icon: "none",
            duration: 2500
        })
    },
    getGlassNum: function() {
        for (var e = [], t = 0; t < 8; t++) isNaN(o.get("glass" + t)) && (this.tryType = 1, e.push(t));
        return e.length > 0 ? e[Math.floor(Math.random(0, .99) * e.length)] : this.showItem ? void 0 : this.close()
    },
    getWaterNum: function() {
        for (var e = 0; e < 12; e++)
            if (isNaN(o.get("water" + e))) return this.tryType = 2, e;
        return this.getPenNum()
    },
    getPenNum: function() {
        for (var e = 0; e < 6; e++)
            if (isNaN(o.get("pen" + e))) return this.tryType = 3, e;
        return this.close()
    },
    tryBtn: function() {
        this.rewardType = 1, this.tishi = 1, i.setRewardCloseClass(this.onRewardAdClose), i.setRewardStopClass(this.onRewardAdStop)
    },
    shareBtn: function() {
        this.rewardType = 1, this.tishi = 2, i.setRewardCloseClass(this.onRewardAdClose), i.setRewardStopClass(this.onRewardAdStop), a.share = !0
    },
    useEvent: function() {
        o.set("glass9", 1);
        var e = o.get("selectGlass");
        o.set("glass" + e, 0), o.set("selectGlass", 9), this.close()
    },
    close: function() {
        this.node.active = !1, cc.find("Canvas/complete").active = !0, cc.find("Canvas/complete").getComponent("complete").init(), cc.find("Canvas/music").getComponent("musicManager").winAudio()
    },
    onDisable: function() {
    }
})