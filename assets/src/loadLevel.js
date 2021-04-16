var i = require('WorldController')
cc.Class({
    extends: cc.Component,
    properties: {
        itemNode: cc.Node,
        prefabAtlas: {
            default: [],
            type: cc.Prefab
        }
    },
    onLoad: function() {
        cc.director.getPhysicsManager().enabled = !0, i.getLevelData(this.getLevelData, this)
    },
    getLevelData: function(e, t) {
        e < 11, i.levelData[e].forEach(function(e) {
            if (e.name && "drawline" != e.name) {
                var n = t.getPrefab(e.name),
                    i = cc.instantiate(t.prefabAtlas[n]);
                i.x = e.x, i.y = e.y, i.parent = t.itemNode, "out" != e.name && "outTop" != e.name && "outRight" != e.name || i.setSiblingIndex(0)
            }
        })
    },
    getPrefab: function(e) {
        for (var t = 0; t < this.prefabAtlas.length; t++)
            if (this.prefabAtlas[t].name == e) return t
    }
})