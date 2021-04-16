cc.Class({
    extends: cc.Component,
    properties: {},
    onBeginContact: function(e, t, n) {
        111 == n.tag && n.node.destroy(), 
        999 == n.tag && 888 == t.tag && (t.tag = 0, console.log("fail"), 
        cc.find("Canvas/complete").active || (this.timeout = setTimeout(function() {
            cc.find("Canvas/gameOver").active = !0, cc.find("Canvas/music").getComponent("musicManager").loseAudio()
        }, 1e3)), n.node.destroy())
    },
    onDestroy: function() {
        this.unscheduleAllCallbacks(), clearTimeout(this.timeout)
    }
})