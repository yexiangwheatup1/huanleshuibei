//白菜价出100多套cocoscreator源码9.9一个 也有联网99一个Q:2483367084
var a = require('LocalStorageData'),
    o = require('WorldController')
cc.Class({
    extends: cc.Component,
    properties: {
        levelNum: cc.Label,
        star: cc.SpriteFrame,
        starNo: cc.SpriteFrame,
        starNode: cc.Node,
        lock: cc.Node
    },
    init: function(e) {
        var t = a.get("levelNum");
        if (e <= t) {
            this.lock.active = !1, this.levelNum.string = e + 1;
            var n = a.get("level" + e);
            3 == n ? (this.starNode.children[0].getComponent(cc.Sprite).spriteFrame = this.star, this.starNode.children[1].getComponent(cc.Sprite).spriteFrame = this.star, this.starNode.children[2].getComponent(cc.Sprite).spriteFrame = this.star) : 2 == n ? (this.starNode.children[0].getComponent(cc.Sprite).spriteFrame = this.star, this.starNode.children[1].getComponent(cc.Sprite).spriteFrame = this.star, this.starNode.children[2].getComponent(cc.Sprite).spriteFrame = this.starNo) : 1 == n ? (this.starNode.children[0].getComponent(cc.Sprite).spriteFrame = this.star, this.starNode.children[1].getComponent(cc.Sprite).spriteFrame = this.starNo, this.starNode.children[2].getComponent(cc.Sprite).spriteFrame = this.starNo) : (this.starNode.children[0].getComponent(cc.Sprite).spriteFrame = this.starNo, this.starNode.children[1].getComponent(cc.Sprite).spriteFrame = this.starNo, this.starNode.children[2].getComponent(cc.Sprite).spriteFrame = this.starNo)
        } else this.lock.active = !0;
        this.node.on(cc.Node.EventType.TOUCH_END, function() {
            this.lock.active ? wx.showToast && wx.showToast({
                title: "关卡未解锁",
                icon: "none",
                duration: 2e3
            }) : o.currentLevel = e,cc.director.loadScene("GameScene")
        }, this)
    }
})