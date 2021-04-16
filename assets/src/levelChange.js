require('LocalStorageData')
require('WorldController')


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
        this.lock.active = !1, this.levelNum.string = e + 1, this.node.on(cc.Node.EventType.TOUCH_END, function() {
            this.lock.active ? wx.showToast && wx.showToast({
                title: "关卡未解锁",
                icon: "none",
                duration: 2e3
            }) : (cc.find("Canvas/level").getComponent("test").levelChange(e), cc.find("Canvas/levelSelect").getComponent("levelSelect").close())
        }, this)
    }
})