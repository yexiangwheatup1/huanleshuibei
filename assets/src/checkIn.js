//白菜价出100多套cocoscreator源码9.9一个 也有联网99一个Q:2483367084
var a = require('LocalStorageData'),
    c = require('GameDataManager');
cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function() {
        this.changeToDate(Date.now()) % 2 == 1 ? (cc.find("Canvas/checkIn/矩形3@2x/体力拷贝7@2x").active = !0, cc.find("Canvas/checkIn/矩形3@2x/金币@2x").active = !1) : (cc.find("Canvas/checkIn/矩形3@2x/体力拷贝7@2x").active = !1, cc.find("Canvas/checkIn/矩形3@2x/金币@2x").active = !0)
    },
    onRewardAdClose: function() {
        var e = cc.find("Canvas/checkIn").getComponent("checkIn");
        switch (e.rewardType) {
            case 1:
                a.updateGold(150), wx.showToast({
                    title: "成功领取150金币",
                    icon: "none",
                    duration: 2e3
                }), cc.find("Canvas/ui/gold/goldNum").getComponent(cc.Label).string = a.get("gold"), e.close();
                break;
            case 2:
                a.updateGold(300), wx.showToast({
                    title: "成功领取300金币",
                    icon: "none",
                    duration: 2e3
                }), cc.find("Canvas/ui/gold/goldNum").getComponent(cc.Label).string = a.get("gold"), e.close();
                break;
        }
        cc.find("Canvas/checkIn/矩形3@2x/视频双倍领取@2x").getComponent(cc.Button).interactable = !1, 
        cc.find("Canvas/checkIn/矩形3@2x/领取@2x").getComponent(cc.Button).interactable = !1, 
        a.set("checkInDate", e.changeToDate(Date.now()))
    },
    changeToDate: function(e) {
        return Math.floor(e / 864e5)
    },
    onRewardAdStop: function() {
        cc.find("Canvas/checkIn").getComponent("checkIn"), wx.showToast({
            title: "只有观看完整视频才能获得奖励哦",
            icon: "none",
            duration: 2500
        })
    },
    checkIn: function() {
        cc.find("Canvas/checkIn/矩形3@2x/体力拷贝7@2x").active ? this.rewardType = 3 : this.rewardType = 1, this.onRewardAdClose()
    },
    doubleCheckIn: function() {
        cc.find("Canvas/checkIn/矩形3@2x/体力拷贝7@2x").active ? this.rewardType = 4 : this.rewardType = 2; 
        this.rewardType, c.setRewardCloseClass(this.onRewardAdClose), c.setRewardStopClass(this.onRewardAdStop)
    },
    close: function() {
        cc.find("Canvas/checkIn/矩形3@2x").runAction(cc.sequence(cc.scaleTo(.5, 0), cc.callFunc(function() {
            this.node.active = !1
        }, this)))
    }
})