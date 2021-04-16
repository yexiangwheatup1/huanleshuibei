var a = require('WorldController'),
    o = require('LocalStorageData'),
    i = require('GameDataManager'),
    s = require('userType');
cc.Class({
    extends: cc.Component,
    properties: {
        star1: cc.Node,
        star2: cc.Node,
        line: cc.Node,
        starsNode: cc.Node,
        goldLabel: cc.Label,
        levelShow: cc.Label,
        hand: cc.Node,
        wenzi: cc.Node,
        light: cc.Node,
        tryWaterNode: cc.Node,
        tishiNode: cc.Node,
        videoTishi: cc.SpriteFrame
    },
    onLoad: function() {
        isNaN(o.get("gold")) ? (this.goldLabel.string = 0, o.set("gold", 0)) : this.goldLabel.string = o.get("gold");
        var e = a.currentLevel + 1;
        this.levelShow.string = "第" + e + "关", a.getLevelData(this.showStarLine, this), this.lineLengthResume();
        var t = cc.find("Canvas/UILayer/pen/lineLength");
        this.schedule(function() {
            t.width < this.star1.x + 120 ? (this.starsNode.children[1].active = !1, this.starsNode.children[2].active = !1) : t.width < this.star2.x + 120 && (this.starsNode.children[2].active = !1)
        }, .5), a.currentLevel < 5 && (this.tryWaterNode.active = !1, this.tishiNode.getComponent(cc.Sprite).spriteFrame = this.videoTishi)
    },
    start: function() {
        if (0 == a.currentLevel) {
            a.getLevelData(this.getAnswer, this);
            var e = cc.v2(0, 0),
                t = cc.v2(0, 0);
            a.levelData[0].forEach(function(n) {
                if (!n.name) {
                    var a = n.answer;
                    e = cc.v2(a[0].x, a[0].y), t = cc.v2(a[1].x, a[1].y)
                }
            }), this.wenzi.active = !0, this.hand.active = !0;
            var n = cc.callFunc(function() {
                this.hand.position = e
            }, this);
            this.hand.runAction(cc.repeatForever(cc.sequence(cc.moveTo(1, t), cc.delayTime(.5), n))), o.set("first", 1)
        }

        var i = this;
        setTimeout(function() {
            a.repeat && i.light && (i.light.active = !0)
        }, 1e3), a.tryWaterNum = Math.floor(6 * Math.random(0, .99)), this.tryWaterNode.children[0].color = s.tryWaterColor[a.tryWaterNum]
    },
    onRewardAdClose: function() {
        var e = cc.find("Canvas/UILayer/tishi").getComponent("tishi");
        switch (console.log(e.rewardType), e.rewardType) {
            case 1:
                var t = o.get("gold");
                o.set("gold", t + 50), e.goldLabel.string = o.get("gold");
                break;
            case 2:
                e.light.active = !1, a.repeat = !1, a.getLevelData(e.getAnswer, e);
                break;
            case 3:
                a.totalLength = 3e3, cc.find("Canvas/level/drawLine").getComponent("drawlines").addCanDrawTotalLength();
                break;
            case 4:
                a.tryWater = !0, wx.showToast({
                    title: "试用成功！",
                    icon: "none",
                    duration: 2e3
                })
        }
    },
    onRewardAdStop: function() {
        1 == cc.find("Canvas/UILayer/tishi").getComponent("tishi").tishi || a.currentLevel < 5 ? wx.showToast({
            title: "只有观看完整视频才能获得奖励哦",
            icon: "none",
            duration: 2500
        }) : wx.showToast({
            title: a.shareError[Math.floor(3 * Math.random(0, .99))],
            icon: "none",
            duration: 2500
        })
    },
    goldAddBtn: function() {
        this.rewardType = 1;
        var e = this;
        wx.showModal({
            title: "提示",
            content: "是否观看视频获取金币？",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), i.setRewardCloseClass(e.onRewardAdClose), i.setRewardStopClass(e.onRewardAdStop)) : t.cancel && console.log("用户点击取消")
            }
        })
    },
    restartBtn: function() {
        a.waterIsSpawn = !1, a.begin = !1, a.win = !1, a.repeat = !0, cc.director.loadScene("GameScene")
    },
    backBtn: function() {
        a.waterIsSpawn = !1, a.begin = !1, cc.director.loadScene("MenuScene")
    },
    showTishi: function() {
        this.rewardType = 2, this.tishi = 1, i.setRewardCloseClass(this.onRewardAdClose), i.setRewardStopClass(this.onRewardAdStop)
    },
    shareTishi: function() {
        this.rewardType = 2, this.tishi = 2, 
        this.onRewardAdClose()
    },
    lineLengthAdd: function() {
        this.rewardType = 3, this.tishi = 1, i.setRewardCloseClass(this.onRewardAdClose), i.setRewardStopClass(this.onRewardAdStop)
    },
    lineLengthResume: function() {
        a.totalLength = 1500
    },
    tryWater: function() {
        this.rewardType = 4, this.tishi = 1, i.setRewardCloseClass(this.onRewardAdClose), i.setRewardStopClass(this.onRewardAdStop)
    },
    showStarLine: function(e, t) {
        a.levelData[e].forEach(function(e) {
            if (!e.name) {
                for (var n = e.answer, o = 0, c = 1; c < n.length; c++) o += Math.sqrt(Math.pow(n[c].x - n[c - 1].x, 2) + Math.pow(n[c].y - n[c - 1].y, 2));
                var i = o / a.totalLength;
                t.star2.x = 1.5 * i > .5 ? 0 : t.line.width / 2 - t.line.width * i * 1.5, 2 * i > .8 ? t.star1.x = .3 * -t.line.width : (t.star1.x = t.line.width / 2 - t.line.width * i * 2, (t.star1.x - t.star2.x) / 240 < .2 && (t.star1.x = t.star2.x - 48))
            }
        })
    },
    getAnswer: function(e, t) {
        a.levelData[e].forEach(function(e) {
            if (!e.name) {
                var n = e.answer,
                    a = t.node.getComponent(cc.Graphics);
                a.moveTo(n[0].x, n[0].y - 30), n.forEach(function(e) {
                    a.lineTo(e.x, e.y - 30), a.stroke(), a.moveTo(e.x, e.y - 30)
                })
            }
        })
    },
    onDestroy: function() {
        this.lineLengthResume()
    }
})