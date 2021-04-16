var a = require('WorldController');
cc.Class({
    extends: cc.Component,
    properties: {
        itemPrefab: cc.Prefab,
        content: cc.Node
    },
    start: function() {
        a.getLevelData(this.showItem, this)
    },
    showItem: function(e, t) {
        for (var n = 0; n < a.levelNum; n++) {
            var o = cc.instantiate(t.itemPrefab);
            o.getComponent("levelItem").init(n), o.parent = t.content
        }
    },
    close: function() {
        this.node.active = !1
    },
    show: function() {
        this.node.active = !0
    }
})