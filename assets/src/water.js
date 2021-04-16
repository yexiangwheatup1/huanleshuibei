//白菜价出100多套cocoscreator源码9.9一个 也有联网99一个Q:2483367084
var a = require('userType'),
    o = require('LocalStorageData'),
    c = require('WorldController'),
    i = cc.color(0, 0, 0);
cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function() {},
    spawnWater: function() {
        i = isNaN(o.get("selectWater")) ? a.waterColor[0] : a.waterColor[o.get("selectWater")]
        c.tryWater && (i = a.tryWaterColor[c.tryWaterNum]);
        var e = 0,
            t = 0;
        90 == this.node.parent.rotation ? t = 1 : 180 == this.node.parent.rotation && (t = 2), 
        this.schedule(function() {
            var n = new cc.Node("water" + e++);
            n.position = cc.v2(0, 0 + 50 * Math.random(0, 1)), n.group = "water";
            var a = n.addComponent(cc.RigidBody),
                o = n.addComponent(cc.PhysicsCircleCollider);
            o.radius = 12, o.tag = 111, o.friction = 0, a.gravityScale = 3.5, a.type = cc.RigidBodyType.Dynamic, 1 == t ? (a.linearVelocity.y = -300, a.linearDamping = 1) : 2 == t ? (a.linearVelocity.x = -300, a.linearDamping = 1) : (a.linearVelocity.x = 300, a.linearDamping = 1), a.enabledContactListener = !0, n.parent = this.node
        }, .05, 36), this.schedule(function() {
            cc.find("Canvas/music").getComponent("musicManager").waterAudio()
        }, .2, 9)
    },
    metaball: function(e, t, n, a) {
        var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2.4,
            c = Math.PI / 2,
            i = n.sub(a).mag(),
            s = e + 1.9 * t,
            r = (s - i) / s * 2.2 + .4,
            d = void 0,
            l = void 0;
        if (0 === e || 0 === t || i > s || i <= Math.abs(e - t)) return null;
        i < e + t ? (d = Math.acos((e * e + i * i - t * t) / (2 * e * i)), l = Math.acos((t * t + i * i - e * e) / (2 * t * i))) : (d = 0, l = 0);
        var h = n.sub(a).angle(cc.v2(-1, 0));
        n.y > a.y && (h = -h);
        var p = Math.acos((e - t) / i),
            g = h + d + (p - d) * r,
            m = h - d - (p - d) * r,
            v = h + Math.PI - l - (Math.PI - l - p) * r,
            u = h - Math.PI + l + (Math.PI - l - p) * r,
            C = this.getVector(n, g, e),
            w = this.getVector(n, m, e),
            y = this.getVector(a, v, t),
            f = this.getVector(a, u, t),
            N = e + t,
            S = Math.min(r * o, C.sub(y).mag() / N) * Math.min(1, 2 * i / (e + t)),
            b = e * S,
            R = t * S;
        return {
            pos1: C,
            pos2: w,
            pos3: y,
            pos4: f,
            con1: this.getVector(C, g - c, b),
            con2: this.getVector(w, m + c, b),
            con3: this.getVector(y, v + c, R),
            con4: this.getVector(f, u - c, R)
        }
    },
    getVector: function(e, t, n) {
        var a = n * Math.cos(t),
            o = n * Math.sin(t);
        return cc.v2(e.x + a, e.y + o)
    },
    update: function(e) {
        var t = this.node.getComponent(cc.Graphics);
        this.balls = this.node.children, t.clear(), t.fillColor = i;
        for (var n = 0; n < this.balls.length; n++) {
            var a = this.balls[n],
                o = a.position,
                c = 1.3 * a.getComponent("cc.PhysicsCircleCollider").radius;
            t.circle(o.x, o.y, c), t.fill();
            for (var s = n; s < this.balls.length; s++)
                if (n !== s) {
                    var r = this.balls[s],
                        d = r.position,
                        l = 1.2 * r.getComponent("cc.PhysicsCircleCollider").radius,
                        h = null;
                    (h = o.y < d.y ? this.metaball(c, l, o, d) : this.metaball(l, c, d, o)) && (t.moveTo(h.pos1.x, h.pos1.y), t.bezierCurveTo(h.con1.x, h.con1.y, h.con3.x, h.con3.y, h.pos3.x, h.pos3.y), t.lineTo(h.pos4.x, h.pos4.y), t.bezierCurveTo(h.con4.x, h.con4.y, h.con2.x, h.con2.y, h.pos2.x, h.pos2.y), t.lineTo(h.pos1.x, h.pos1.y), t.fill())
                }
        }
    }
})