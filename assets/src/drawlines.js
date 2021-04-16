//白菜价出100多套cocoscreator源码9.9一个 也有联网99一个Q:2483367084
require('PhysicsManager');
var a = require('WorldController'),
    o = require('userType'),
    c = require('LocalStorageData'),
    i = 0,
    s = 0,
    r = !1,
    d = cc.v2(0, 0),
    l = cc.v2(0, 0),
    h = !1,
    p = 0,
    g = 0,
    m = cc.v2(0, 0),
    v = cc.v2(0, 0),
    u = !1,
    C = ["moveBox1", "moveBox2", "moveBox3", "moveBox4", "moveBox5", "glass"];
cc.Class({
    extends: cc.Component,
    properties: {
        percentShow: cc.Label,
        penSprite: {
            default: [],
            type: cc.SpriteFrame
        },
        penNode: cc.Node
    },
    onLoad: function() {
        cc.PhysicsAABBQueryCallback.prototype.ReportFixture = function(e) {
            if (e.GetBody(), this._isPoint) {
                if (e.TestPoint(this._point)) return this._fixtures.push(e), !1
            } else this._fixtures.push(e);
            return !0
        };
        var e = cc.director.getPhysicsManager();
        e.enabled = !0, p = 0, i = 0, s = a.totalLength;
        var t = this,
            n = new cc.Node("err" + p);
        this.node.on(cc.Node.EventType.TOUCH_START, function(t) {
            if (s && !r) {
                if (r = !0, g = t.getID(), 0 == a.currentLevel && (cc.find("Canvas/UILayer/hand").stopAllActions(), cc.find("Canvas/UILayer/hand").active = !1), l = t.getLocation(), d = this.convertToNodeSpaceAR(l), m = d, v = l, 0 != e.testAABB(cc.rect(d.x, d.y, 4.5, 4.5)).length) return void(r = !1);
                h = !0, u = !1, p++;
                var n = new cc.Node("line" + p),
                    i = n.addComponent(cc.Graphics),
                    C = n.addComponent(cc.RigidBody);
                this.addChild(n), C.gravityScale = 0, C.type = cc.RigidBodyType.Static, i.strokeColor = o.penColor[c.get("selectPen")], i.lineCap = cc.Graphics.LineCap.ROUND, i.lineWidth = 9, i.moveTo(d.x, d.y), this.getComponent("drawlines").penNode.getComponent(cc.Sprite).spriteFrame = this.getComponent("drawlines").penSprite[c.get("selectPen")], this.getComponent("drawlines").penNode.position = d, this.getComponent("drawlines").penNode.active = !0, this.getComponent("drawlines").penNode.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(.2, 15), cc.rotateTo(.2, -15)))), cc.find("Canvas/UILayer/btnLayer/tishiBtn").getComponent(cc.Button).interactable = !1, cc.find("Canvas/UILayer/btnLayer/drawAdd").getComponent(cc.Button).interactable = !1, cc.find("Canvas/UILayer/btnLayer/tryItem").getComponent(cc.Button).interactable = !1
            }
        }, this.node), this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
            if (h) {
                if (g === e.getID()) {
                    if (l = e.getLocation(), d = this.convertToNodeSpaceAR(l), s <= 0) return (C = this.getChildByName("line" + p)).getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic, C.getComponent(cc.RigidBody).gravityScale = 3.5, C.group = "line", void(a.waterIsSpawn || (a.waterIsSpawn = !0, a.frames = cc.director.getTotalFrames(), a.begin = !0, t.getWaterNode().getComponent("water").spawnWater()));
                    if (b = t.testrect(l.x, l.y), t.wideRaycast(v.x, v.y, l.x, l.y), b && !u) {
                        var C, w = Math.sqrt(Math.pow(d.x - m.x, 2) + Math.pow(d.y - m.y, 2));
                        if ((C = this.getChildByName("line" + p)).getComponent(cc.Graphics).lineTo(d.x, d.y), C.getComponent(cc.Graphics).stroke(), C.getComponent(cc.Graphics).moveTo(d.x, d.y), w > 8) {
                            if (w < 10)(N = C.addComponent(cc.PhysicsCircleCollider)).offset = cc.v2(d.x, d.y), N.radius = 4.5, N.density = 1, N.apply();
                            else {
                                for (var y = w / 10, f = 1; f < y; f++)(N = C.addComponent(cc.PhysicsCircleCollider)).offset = cc.v2(m.x + 10 * f * (d.x - m.x) / w, m.y + 10 * f * (d.y - m.y) / w), N.radius = 4.5, N.density = 1, N.apply();
                                var N;
                                (N = C.addComponent(cc.PhysicsCircleCollider)).offset = cc.v2(d.x, d.y), N.radius = 4.5, N.density = 1, N.apply()
                            }
                            m = d, v = l, i += w, (s -= w) / a.totalLength * 240 > 0 ? (cc.find("Canvas/UILayer/pen/lineLength").width = s / a.totalLength * 240, 3e3 == a.totalLength ? t.percentShow.string = (s / a.totalLength * 200).toFixed(0) + "%" : t.percentShow.string = (s / a.totalLength * 100).toFixed(0) + "%") : (cc.find("Canvas/UILayer/pen/lineLength").width = 0, t.percentShow.string = "0%")
                        }
                        cc.find("Canvas/music").getComponent("musicManager").penAudio(), t.getComponent("drawlines").penNode.position = d, t.getComponent("drawlines").penNode.active = !0
                    } else {
                        var S = n.addComponent(cc.Graphics);
                        S.getComponent(cc.Graphics).clear(), S.getComponent(cc.Graphics).moveTo(m.x, m.y), S.getComponent(cc.Graphics).strokeColor = cc.color(255, 0, 0), S.getComponent(cc.Graphics).lineTo(d.x, d.y), S.getComponent(cc.Graphics).stroke()
                    }
                }
            } else if (!r) {
                var b;
                if (r = !0, g = e.getID(), l = e.getLocation(), d = this.convertToNodeSpaceAR(l), m = d, v = l, !(b = t.testrect(l.x, l.y))) return void(r = !1);
                h = !0, u = !1, p++;
                var R = new cc.Node("line" + p),
                    L = R.addComponent(cc.Graphics),
                    A = R.addComponent(cc.RigidBody);
                this.addChild(R), A.gravityScale = 0, A.type = cc.RigidBodyType.Static, L.strokeColor = o.penColor[c.get("selectPen")], L.lineCap = cc.Graphics.LineCap.ROUND, L.lineWidth = 9, L.moveTo(d.x, d.y), this.getComponent("drawlines").penNode.getComponent(cc.Sprite).spriteFrame = this.getComponent("drawlines").penSprite[c.get("selectPen")], this.getComponent("drawlines").penNode.position = d, this.getComponent("drawlines").penNode.active = !0, this.getComponent("drawlines").penNode.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(.2, 15), cc.rotateTo(.2, -15)))), cc.find("Canvas/UILayer/btnLayer/tishiBtn").getComponent(cc.Button).interactable = !1, cc.find("Canvas/UILayer/btnLayer/drawAdd").getComponent(cc.Button).interactable = !1, cc.find("Canvas/UILayer/btnLayer/tryItem").getComponent(cc.Button).interactable = !1
            }
        }, this.node), this.node.on(cc.Node.EventType.TOUCH_END, function(e) {
            if (h && g === e.getID()) {
                if (s > 0 && i > 0) {
                    var n = this.getChildByName("line" + p);
                    n.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic, n.getComponent(cc.RigidBody).gravityScale = 3.5, n.group = "line", a.waterIsSpawn || (a.waterIsSpawn = !0, t.getWaterNode().getComponent("water").spawnWater()), this.parent.children.forEach(function(e) {
                        for (var t = 0; t < C.length; t++) {
                            if (e.name == C[4]) return void(e.children[0].getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic);
                            e.name == C[t] && (e.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic)
                        }
                    }), a.frames = cc.director.getTotalFrames(), a.begin = !0
                }
                cc.find("Canvas/music").getComponent("musicManager").stopPenAudio(), cc.find("Canvas/UILayer/wenzi").active = !1, h = !1, r = !1, this.getComponent("drawlines").penNode.active = !1
            }
        }, this.node), this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {
            if (h && g === e.getID()) {
                if (s > 0 && i > 0) {
                    var n = this.getChildByName("line" + p);
                    n.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic, n.getComponent(cc.RigidBody).gravityScale = 3.5, n.group = "line", a.waterIsSpawn || (a.waterIsSpawn = !0, t.getWaterNode().getComponent("water").spawnWater()), this.parent.children.forEach(function(e) {
                        for (var t = 0; t < C.length; t++) {
                            if (e.name == C[4]) return void(e.children[0].getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic);
                            e.name == C[t] && (e.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic)
                        }
                    }), a.frames = cc.director.getTotalFrames(), a.begin = !0
                }
                cc.find("Canvas/music").getComponent("musicManager").stopPenAudio(), h = !1, r = !1, this.getComponent("drawlines").penNode.active = !1
            }
        }, this.node)
    },
    getWaterNode: function() {
        return cc.find("Canvas/level/out/waterNode") ? cc.find("Canvas/level/out/waterNode") : cc.find("Canvas/level/outTop/waterNode") ? cc.find("Canvas/level/outTop/waterNode") : cc.find("Canvas/level/outRight/waterNode") ? cc.find("Canvas/level/outRight/waterNode") : void 0
    },
    testrect: function(e, t) {
        var n = cc.director.getPhysicsManager(),
            a = n.testPoint(cc.v2(e - 4.5, t - 4.5));
        if (null == a || a.node.name == "line" + p) {
            var o = n.testPoint(cc.v2(e - 4.5, t + 4.5));
            if (null == o || o.node.name == "line" + p) {
                var c = n.testPoint(cc.v2(e + 4.5, t - 4.5));
                if (null == c || c.node.name == "line" + p) {
                    var i = n.testPoint(cc.v2(e + 4.5, t + 4.5));
                    if (null == i || i.node.name == "line" + p) {
                        var s = n.testPoint(cc.v2(e, t));
                        if (null == s || s.node.name == "line" + p) return !0
                    }
                }
            }
        }
        return !1
    },
    wideRaycast: function(e, t, n, a) {
        var o = cc.director.getPhysicsManager(),
            c = Math.sqrt(Math.pow(n - e, 2) + Math.pow(a - t, 2)),
            i = 4.5 * -(a - t) / c,
            s = 4.5 * (n - e) / c,
            r = o.rayCast(cc.v2(e - i, t - s), cc.v2(n - i, a - s), cc.RayCastType.All);
        if (r.length > 0)
            for (var d = 0; d < r.length; d++) {
                if (r[d].collider.node.name != "line" + p) {
                    u = !0;
                    break
                }
                u = !1
            }
        var l = o.rayCast(cc.v2(e + i, t + s), cc.v2(n + i, a + s), cc.RayCastType.All);
        if (l.length > 0)
            for (d = 0; d < l.length; d++) {
                if (l[d].collider.node.name != "line" + p) {
                    u = !0;
                    break
                }
                u = !1
            }
    },
    addCanDrawTotalLength: function() {
        s = 3e3, this.percentShow.string = (s / a.totalLength * 200).toFixed(0) + "%"
    },
    onDestroy: function() {
        this.unscheduleAllCallbacks()
    },
    update: function(e) {
        a.begin && cc.director.getTotalFrames() - a.frames > 480 && (a.win || (cc.find("Canvas/gameOver").active = !0, cc.find("Canvas/music").getComponent("musicManager").loseAudio()))
    }
})