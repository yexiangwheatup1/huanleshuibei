require('PhysicsManager');
var i = require('WorldController'),
    o = 0,
    c = !1,
    a = cc.v2(0, 0),
    l = cc.v2(0, 0),
    r = 0,
    s = cc.v2(0, 0),
    d = cc.v2(0, 0),
    v = !1,
    h = [],
    p = i.totalLength;
cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function() {
        cc.PhysicsAABBQueryCallback.prototype.ReportFixture = function(e) {
            if (e.GetBody(), this._isPoint) {
                if (e.TestPoint(this._point)) return this._fixtures.push(e), !1
            } else this._fixtures.push(e);
            return !0
        };
        var e = cc.director.getPhysicsManager();
        e.enabled = !0;
        var t = this;
        new cc.Node("err" + r), this.node.on(cc.Node.EventType.TOUCH_START, function(n) {
            if (p > 0)
                if (c || 0 != r) {
                    l = n.getLocation(), a = this.convertToNodeSpaceAR(l);
                    var u = t.testrect(l.x, l.y);
                    if (t.wideRaycast(d.x, d.y, l.x, l.y), u && !v) {
                        var f = Math.sqrt(Math.pow(a.x - s.x, 2) + Math.pow(a.y - s.y, 2)),
                            g = this.getChildByName("line" + r);
                        g.getComponent(cc.Graphics).lineTo(a.x, a.y), g.getComponent(cc.Graphics).stroke(), g.getComponent(cc.Graphics).moveTo(a.x, a.y);
                        for (var m = 0; m < f / 10; m++) {
                            var y = g.addComponent(cc.PhysicsCircleCollider);
                            y.offset = cc.v2(s.x + 10 * m * (a.x - s.x) / f, s.y + 10 * m * (a.y - s.y) / f), y.radius = 4.5, y.density = 1, y.apply()
                        }
                        s = a, d = l, o += f, p -= f, cc.find("Canvas/lineLength").width = p / i.totalLength * 240
                    }
                    h.push(a)
                } else {
                    if (c = !0, n.getID(), l = n.getLocation(), a = this.convertToNodeSpaceAR(l), s = a, d = l, 0 != e.testAABB(cc.rect(a.x, a.y, 4.5, 4.5)).length) return void(c = !1);
                    v = !1, r++;
                    var C = new cc.Node("line" + r),
                        x = C.addComponent(cc.Graphics),
                        w = C.addComponent(cc.RigidBody);
                    this.addChild(C), w.gravityScale = 0, w.type = cc.RigidBodyType.Static, x.lineCap = cc.Graphics.LineCap.ROUND, x.lineWidth = 9, x.moveTo(a.x, a.y), h.push(a)
                }
        }, this.node)
    },
    clearLines: function() {
        h = [], this.node.getChildByName("line1") && this.node.getChildByName("line1").destroy(), cc.find("Canvas/lineLength").width = 240, p = i.totalLength, o = 0, r = 0, c = !1, this.getWaterNode() && this.getWaterNode().removeAllChildren()
    },
    getWaterNode: function() {
        return cc.find("Canvas/level/out/waterNode") ? cc.find("Canvas/level/out/waterNode") : cc.find("Canvas/level/outTop/waterNode") ? cc.find("Canvas/level/outTop/waterNode") : cc.find("Canvas/level/outRight/waterNode") ? cc.find("Canvas/level/outRight/waterNode") : void 0
    },
    getLinesData: function() {
        return h
    },
    startTest: function() {
        if (console.log("water!!!!!!!!!!!!"), p > 0 && o > 0) {
            var e = this.node.getChildByName("line1");
            e.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic, e.getComponent(cc.RigidBody).gravityScale = 3.5, e.group = "line", this.getWaterNode().getComponent("water").spawnWater()
        }
    },
    testrect: function(e, t) {
        var n = cc.director.getPhysicsManager(),
            i = n.testPoint(cc.v2(e - 4.5, t - 4.5));
        if (null == i || i.node.name == "line" + r) {
            var o = n.testPoint(cc.v2(e - 4.5, t + 4.5));
            if (null == o || o.node.name == "line" + r) {
                var c = n.testPoint(cc.v2(e + 4.5, t - 4.5));
                if (null == c || c.node.name == "line" + r) {
                    var a = n.testPoint(cc.v2(e + 4.5, t + 4.5));
                    if (null == a || a.node.name == "line" + r) {
                        var l = n.testPoint(cc.v2(e, t));
                        if (null == l || l.node.name == "line" + r) return !0
                    }
                }
            }
        }
        return !1
    },
    wideRaycast: function(e, t, n, i) {
        var o = cc.director.getPhysicsManager(),
            c = Math.sqrt(Math.pow(n - e, 2) + Math.pow(i - t, 2)),
            a = 4.5 * -(i - t) / c,
            l = 4.5 * (n - e) / c,
            s = o.rayCast(cc.v2(e - a, t - l), cc.v2(n - a, i - l), cc.RayCastType.Any);
        if (s.length > 0)
            for (var d = 0; d < s.length; d++) {
                if (s[d].collider.node.name != "line" + r) {
                    v = !0;
                    break
                }
                v = !1
            }
        var h = o.rayCast(cc.v2(e + a, t + l), cc.v2(n + a, i + l), cc.RayCastType.Any);
        if (h.length > 0)
            for (d = 0; d < h.length; d++) {
                if (h[d].collider.node.name != "line" + r) {
                    v = !0;
                    break
                }
                v = !1
            }
    }
})