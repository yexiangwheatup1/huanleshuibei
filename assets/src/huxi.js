cc.Class({
    extends: cc.Component,
    properties: {},
    onEnable: function() {
        this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1, 1.2), cc.scaleTo(1, 1))))
    }
})