
var x = require('LocalStorageData');
module.exports = {
    totalLength: 1500,
    waterIsSpawn: !1,
    share: !1,
    winWaterNum: 24,
    win: !1,
    levelNum: 0,
    levelData: [],
    changeLevel: !1,
    currentLevel: 0,
    begin: !1,
    frames: 0,
    repeat: !1,
    tryItem: !1,
    playNum: 0,
    tryNum: 0,
    tryWater: !1,
    tryWaterNum: 0,
    completeCount: 0,
    shareError: ["分享失败，请分享到不同群！", "分享失败，请换个群分享试试！", "分享失败，请不要分享到同一个群！"],
    setLevelData(data) {
        this.levelData = data
        this.levelNum = data.length
    },
    getLevelData: function(e, b) {
        e(this.currentLevel, b)
    },
    getcurrentLevel: function() {
        if (isNaN(x.get("levelNum")) || void 0 === x.get("levelNum")) {
            x.set("levelNum", 0)
            this.currentLevel = 0
        } else {
            this.currentLevel = x.get("levelNum");
        }
    }
}