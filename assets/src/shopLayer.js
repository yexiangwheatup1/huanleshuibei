require('LocalStorageData'), cc.Class({
    extends: cc.Component,
    properties: {
        waterLayer: cc.Node,
        glassLayer: cc.Node,
        penLayer: cc.Node,
        waterBtn: cc.Node,
        glassBtn: cc.Node,
        penBtn: cc.Node,
        waterSelect: cc.SpriteFrame,
        waterNo: cc.SpriteFrame,
        glassSelect: cc.SpriteFrame,
        glassNo: cc.SpriteFrame,
        penSelect: cc.SpriteFrame,
        penNo: cc.SpriteFrame,
        usingSprite: cc.SpriteFrame,
        havedSprite: cc.SpriteFrame
    },
    onLoad: function() {
        for (var e = 0; e < this.waterLayer.children[0].children.length; e++) this.waterLayer.children[0].children[e].addComponent("shopItem").init(e, 1, this.usingSprite, this.havedSprite);
        for (var t = 0; t < this.glassLayer.children[0].children.length; t++) this.glassLayer.children[0].children[t].addComponent("shopItem").init(t, 2, this.usingSprite, this.havedSprite);
        for (var n = 0; n < this.penLayer.children[0].children.length; n++) this.penLayer.children[0].children[n].addComponent("shopItem").init(n, 3, this.usingSprite, this.havedSprite)
    },
    waterBtnEvent: function() {
        this.waterLayer.active = !0, this.glassLayer.active = !1, this.penLayer.active = !1, this.waterBtn.getComponent(cc.Sprite).spriteFrame = this.waterSelect, this.glassBtn.getComponent(cc.Sprite).spriteFrame = this.glassNo, this.penBtn.getComponent(cc.Sprite).spriteFrame = this.penNo
    },
    glassBtnEvent: function() {
        this.waterLayer.active = !1, this.glassLayer.active = !0, this.penLayer.active = !1, this.waterBtn.getComponent(cc.Sprite).spriteFrame = this.waterNo, this.glassBtn.getComponent(cc.Sprite).spriteFrame = this.glassSelect, this.penBtn.getComponent(cc.Sprite).spriteFrame = this.penNo
    },
    penBtnEvent: function() {
        this.waterLayer.active = !1, this.glassLayer.active = !1, this.penLayer.active = !0, this.waterBtn.getComponent(cc.Sprite).spriteFrame = this.waterNo, this.glassBtn.getComponent(cc.Sprite).spriteFrame = this.glassNo, this.penBtn.getComponent(cc.Sprite).spriteFrame = this.penSelect
    }
})