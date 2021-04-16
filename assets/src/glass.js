var a = require('WorldController'),
    o = require('LocalStorageData');
cc.Class({
    extends: cc.Component,
    properties: {
        complete: cc.ParticleSystem,
        glass1Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass2Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass3Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass4Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass5Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass6Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass7Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass8Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass9999Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass8888Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass9Atlas: {
            default: [],
            type: cc.SpriteFrame
        },
        glass10Atlas: {
            default: [],
            type: cc.SpriteFrame
        }
    },
    onLoad: function() {
        this.waterNum = 0, this.glass = [];
        var e = o.get("selectGlass");
        switch (a.tryItem && (e = a.tryNum), e) {
            case 0:
                this.glass = this.glass1Atlas;
                break;
            case 1:
                this.glass = this.glass2Atlas;
                break;
            case 2:
                this.glass = this.glass3Atlas;
                break;
            case 3:
                this.glass = this.glass4Atlas;
                break;
            case 4:
                this.glass = this.glass5Atlas;
                break;
            case 5:
                this.glass = this.glass6Atlas;
                break;
            case 6:
                this.glass = this.glass7Atlas;
                break;
            case 7:
                this.glass = this.glass8Atlas;
                break;
            case 9:
                this.glass = this.glass9999Atlas;
                break;
            case 8:
                this.glass = this.glass8888Atlas;
                break;
            case 10:
                this.glass = this.glass9Atlas;
                break;
            case 11:
                this.glass = this.glass10Atlas;
                break;
            default:
                this.glass = this.glass1Atlas
        }
        this.node.parent.getComponent(cc.Sprite).spriteFrame = this.glass[0]
    },
    onBeginContact: function(e, t, n) {
        if (!(111 == n.tag && 666 == t.tag)) {
            return
        } 

        t.node.getComponent("glass").waterNum++
        e.disabled = !0
        n.tag = 0
        
        this.waterNum >= a.winWaterNum / 2 && this.waterNum < a.winWaterNum && (t.node.parent.getComponent(cc.Sprite).spriteFrame = this.glass[1])
        
        if (!(this.waterNum >= a.winWaterNum && !a.win)) {
            return
        }

        t.node.parent.getComponent(cc.Sprite).spriteFrame = this.glass[2]
        a.win = !0
        console.log("success")

        let gameover = cc.find("Canvas/gameOver")

        if (gameover && !gameover.active) {
            cc.find("Canvas/music").getComponent("musicManager").completeAudio()
            t.node.getComponent("glass").complete.resetSystem()

            this.timeout = setTimeout(function() {
                if (a.completeCount % 3 == 0) {
                    cc.find("Canvas/rollLayer").active = !0
                } else {
                    cc.find("Canvas/tryItem").active = !0
                    a.completeCount++
                }  
            }, 1e3)
        } 
    },
    onDestroy: function() {
        this.unscheduleAllCallbacks(), clearTimeout(this.timeout)
    }
})