

var x = {
    GAMEMODE: cc.Enum({
        CLASSIC: 0,
        PUZZLE: 1
    }),
    bSound: !0,
    bMusic: !0,
    init: function() {
        this.nCoins = cc.sys.localStorage.getItem("coins"),
            this.bSound = cc.sys.localStorage.getItem("sound"),
            this.bMusic = cc.sys.localStorage.getItem("music"),
            this.nCoins = this.nCoins || "0" == this.nCoins ? this.nCoins : 10,
            this.bSound = "0" != this.bSound ? "1" : "0",
            this.bMusic = this.bMusic ? this.bMusic : "true";
    },
    set sound(e) {
        this.bSound = e ? 1 : 0, cc.sys.localStorage.setItem("sound", this.bSound);
    },
    get sound() {
        return 1 == this.bSound;
    },
    set music(e) {
        this.bMusic = e + "", cc.sys.localStorage.setItem("music", this.bMusic);
    },
    get music() {
        return "true" == this.bMusic;
    },
    set coins(e) {
        this.nCoins = e, cc.sys.localStorage.setItem("coins", this.nCoins);
    },
    get coins() {
        return this.nCoins;
    },
    updateInviteData: function(e) {
        cc.sys.localStorage.setItem("invitedata", e);
    },
    getInviteData: function() {
        return cc.sys.localStorage.getItem("invitedata");
    },
    setRewardInvited: function(e) {
        var b = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
        cc.sys.localStorage.setItem("invited" + e, b);
    },
    isRewardInvited: function(e) {
        return 1 == cc.sys.localStorage.getItem("invited" + e);
    },
    onRewardAdClose: function() {
        this.CClass();
    },
    onRewardAdStop: function() {
        this.CStopClass();
    },
    setRewardCloseClass: function(e) {
        this.CClass = e;
    },
    setRewardStopClass: function(e) {
        this.CStopClass = e;
    }
};

module.exports = x