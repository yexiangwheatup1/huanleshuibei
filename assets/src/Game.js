var t = require('AudioManager'),
    i = require('GameDataManager'),
    n = require('LocalStorageData'),
    r = require('WorldController');
cc.Class({
    extends: cc.Component,
    properties: {
        maskLayer: cc.Node,
        shopLayer: cc.Node,
        goldLabel: cc.Label,
        shopGoldLabel: cc.Label,
        levelNum: cc.Label,
        levelSelect: cc.Node,
        shopBtn: cc.Node,
        levelData: cc.JsonAsset,
    },
    onLoad: function() {
        r.setLevelData(this.levelData.json)
    },
    onRewardAdClose: function() {
        var e = cc.find("Canvas").getComponent("Game");
        var _ = n.get("gold");
        n.set("gold", _ + 50), 
        e.goldLabel.string = n.get("gold"),
        e.shopGoldLabel.string = n.get("gold");
    },
    onRewardAdStop: function() {
        wx.showToast({
            title: "只有观看完整视频才能获得奖励哦",
            icon: "none",
            duration: 2500
        });
    },
    start: function() {
        cc.director.preloadScene("GameScene")
        if (isNaN(n.get("gold")) ? (this.goldLabel.string = 0, n.set("gold", 0)) : this.goldLabel.string = n.get("gold"),
            isNaN(n.get("gold")) ? (this.shopGoldLabel.string = 0,
                n.set("gold", 0)) : this.shopGoldLabel.string = n.get("gold"),
            isNaN(n.get("levelNum"))) this.levelNum.string = "第1关",
            n.set("levelNum", 0);
        else {
            var e = n.get("levelNum") + 1;
            this.levelNum.string = "第" + e + "关";
        }
        console.log("date", this.changeToDate(Date.now()) > n.get("checkInDate")),
            isNaN(n.get("checkInDate")) ? cc.find("Canvas/checkIn").active = !0 : this.changeToDate(Date.now()) > n.get("checkInDate") && (cc.find("Canvas/checkIn").active = !0);
    },
    changeToDate: function(e) {
        return Math.floor(e / 864e5);
    },
    showGameBox: function(e) {},
    setBlockInputEvents: function(e) {
        this.maskLayer.active = e;
    },
    inviteClicked: function(e) {
        this.inviteDialog.active = !0, this.setBlockInputEvents(!0), t.playButtonClickEffect();
    },
    closeClicked: function(e) {
        e.currentTarget.parent.active = !1, this.setBlockInputEvents(!1);
    },
    cleanInviteData: function() {

    },
    startBtn: function() {
        if (!this.click) {
            this.click = !0
            r.getcurrentLevel()
            if (r.currentLevel >= r.levelNum) {
                return wx.showToast({
                    title: "敬请期待后续关卡！",
                    icon: "none",
                    duration: 2e3
                })
            }

            this.click = !1
            this.startGame();
        }
    },
    startGame: function() {
        this.click = !1
        cc.director.loadScene("GameScene");
    },
    
    goldAddBtn: function() {
        this.rewardType = 0;
        var e = this;
        wx.showModal({
            title: "提示",
            content: "是否观看视频获取金币？",
            success: function(b) {
                b.confirm ? (console.log("用户点击确定"), i.setRewardCloseClass(e.onRewardAdClose),
                    i.setRewardStopClass(e.onRewardAdStop)) : b.cancel && console.log("用户点击取消");
            }
        });
    },
    openRank: function() {
    },
    closeRank: function() {
    },
    openShop: function() {
        this.shopLayer.active = !0;
    },
    closeShop: function() {
        this.shopLayer.active = !1;
    },
    selectBtn: function() {
        this.levelSelect.active = !0;
    },
    shareBtn: function() {
    },
    shareEvent: function() {
    },
    updateShopGold: function() {
        isNaN(n.get("gold")) ? (this.shopGoldLabel.string = 0, this.goldLabel.string = n.get("gold"),
            n.set("gold", 0)) : (this.shopGoldLabel.string = n.get("gold"),
            this.goldLabel.string = n.get("gold"));
    },
    changeTime: function(e) {
        var b = "",
            _ = Math.floor(e / 60);
        b = _ < 10 ? "0" + _ : _;
        var x = e % 60;
        return x < 10 ? b + ":0" + x : b + ":" + x;
    },
    update: function() {
    }
})