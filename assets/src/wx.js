let env = {
    USER_DATA_PATH: "",
}
//白菜价出100多套cocoscreator源码9.9一个 也有联网99一个Q:2483367084
class FileSystemManager {
    stat() {
        return {}
    }
}

class WXColl {
    get() {
        return new Promise(()=>{}, ()=>{})
    }
}

class WXDB {
    collection() {
        return new WXColl
    }
}

class WXClcoud {
    constructor() {
    }

    database() {
        return new WXDB
    }
}

class wechat {
    constructor() {
        this.env = env
        this.cloud = new WXClcoud()
    }

    createInnerAudioContext () { 
        return {
            stop() {},
            play() {},
            onSeeked() {},
        }
    }
    getSystemInfoSync () {
        return {}
    }

    showShareMenu() {

    }

    updateShareMenu() {

    }

    onShareAppMessage() {
        
    }
    shareAppMessage() {
        
    }
    createRewardedVideoAd() {
        return {
            onLoad() {},
            onError() {},
            onClose() {},
            load() {
                return new Promise(()=>{}, ()=>{})
            }
        }
    }
    vibrateShort() {}

    createBannerAd() {
        return {
            onLoad() {},
            onResize() {},
            onError() {},
            show() {},
            hide() {},
            destroy() {},
        }
    }

    getFileSystemManager() {
        if (!this.fs) {
            this.fs = new FileSystemManager
        }
        return this.fs
    }

    login() {

    }

    getSystemInfo() {

    }

    onShow() {
        
    }
    postMessage() {
      
    }

    request(e) {
    }

    getNetworkType() {

    }

    getStorage(f) {
        f.success(this.getStorageSync(f.key))
    }
    getStorageSync(k) {
        return {data:cc.sys.localStorage.getItem(k)}
    }
    setStorage(f) {
        this.setStorageSync(f.key, f.data)
        if (f.success) {
            f.success()
        }
    }
    setStorageSync(k,v) {
        return cc.sys.localStorage.setItem(k, v)
    }

    showToast(o) {
        console.log(o)
    }

    onHide() {
        

    }

}

if (!window.wx) {
    window.wx = new wechat
}

