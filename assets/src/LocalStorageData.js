

module.exports = {
    initItem: function(e) {
        var b;
        wx.getStorage({
            key: e.str,
            success: function(_) {
                console.log(_.data), null != (b = parseInt(_.data)) && 0 != b.length && !isNaN(b) || wx.setStorage({
                    key: e.str,
                    data: JSON.stringify(e.number)
                });
            },
            fail: function(b) {
                console.log(b), wx.setStorage({
                    key: e.str,
                    data: JSON.stringify(e.number),
                    success: function() {}
                });
            }
        });
    },
    initData: function() {
        console.log("初始化用户本地数据"), this.initItem({
            str: "level0",
            number: 0
        }), this.initItem({
            str: "starSum",
            number: 0
        }), this.initItem({
            str: "first",
            number: 0
        }), this.initItem({
            str: "gold",
            number: 0
        }), this.initItem({
            str: "count",
            number: 0
        }), this.initItem({
            str: "checkinDate",
            number: 0
        }), this.initItem({
            str: "ADDate",
            number: 0
        }), this.initItem({
            str: "water0",
            number: 1
        }), this.initItem({
            str: "glass0",
            number: 1
        }), this.initItem({
            str: "pen0",
            number: 1
        }), this.initItem({
            str: "selectWater",
            number: 0
        }), this.initItem({
            str: "selectGlass",
            number: 0
        }), this.initItem({
            str: "selectPen",
            number: 0
        }), this.initItem({
            str: "finish",
            number: 0
        }), this.initItem({
            str: "firstWeek",
            number: 0
        }), this.initItem({
            str: "levelNum",
            number: 0
        }), this.initItem({
            str: "lastTime",
            number: Date.now()
        });
    },
    get: function(e) {
        var b = cc.sys.localStorage.getItem(e);
        return parseInt(b);
    },
    set: function(e, b) {
        cc.sys.localStorage.setItem(e, b);
    },
    updateStars: function(e) {
        var b = this.get("starSum");
        isNaN(b) && isNaN(e) || (this.set("starSum", e + b), console.log("update starSum"));
    },
    updateGold: function(e) {
        var b = this.get("gold");
        isNaN(b) || isNaN(e) || (this.set("gold", e + b), console.log("update gold" + e));
    },
    updateCount: function() {
        var e = this.get("count");
        console.log(e), this.set("count", e + 1);
    },
   
    timer: -1,
    
    updateLevelStar: function(e, b, _) {
        if (cc.sys.localStorage.getItem(e) >= b) return _.active = !1,
            0;
        if (isNaN(cc.sys.localStorage.getItem(e))) return this.updateStars(b),
            _.active = !0, _.children[0].getComponent(cc.Label).string = "+" + 10 * b,
            this.updateGold(10 * b), cc.sys.localStorage.setItem(e, b),
            10 * b;
        this.updateStars(b - cc.sys.localStorage.getItem(e)), _.active = !0,
            _.children[0].getComponent(cc.Label).string = "+" + 10 * (b - cc.sys.localStorage.getItem(e)),
            this.updateGold(10 * (b - cc.sys.localStorage.getItem(e)));
        var x = cc.sys.localStorage.getItem(e);
        return cc.sys.localStorage.setItem(e, b), 10 * (b - x);
    }
}