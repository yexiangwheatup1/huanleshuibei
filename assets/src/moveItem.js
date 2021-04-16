cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function() {
        var e = this.node,
            t = cc.find("Canvas/level");
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(n) {
            e.position = t.convertToNodeSpaceAR(n.getLocation()), e.children[0] && (e.children[0].position = cc.v2(0, 0))
        }), this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(t) {
            e.destroy()
        })
    }
})