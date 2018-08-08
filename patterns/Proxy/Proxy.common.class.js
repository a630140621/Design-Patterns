/**
 * 玩家类, 不允许直接调用, 只有代理类才可以创建玩家实例
 */
class Player {
    constructor(playerProxy, name) {
        if (!(playerProxy instanceof PlayerProxy)) throw new Error('必须传入一个玩家代理类的实例')
        this.__name = name
    }

    login(account, password) {
        console.log(`player ${this.__name} login game`)
    }

    killBoss() {
        console.log(`kill boss ing`)
    }

    upgrade() {
        console.log(`player ${this.__name} upgrade again`)
    }

    logout() {
        console.log(`player ${this.__name} logout game`)
    }
}

/**
 * 玩家代理类, 可以在代理类中针对玩家的方法前后进行处理
 */
class PlayerProxy {
    constructor(name) {
        this.proxy = new Player(this, name)
    }

    login(account, password) {
        // 登录前通知玩家
        this.__sendMessage()
        this.proxy.login()
    }

    killBoss() {
        this.proxy.killBoss()
    }

    upgrade() {
        this.proxy.upgrade()
    }

    logout() {
        this.proxy.logout()
    }

    __sendMessage() {
        console.log(`hi, i am ready to login your account`)
    }
}

// 此时的业务场景中用法
function play() {
    let proxy = new PlayerProxy(`lovecrazy`)
    proxy.login('account', 'password')
    proxy.killBoss()
    proxy.upgrade()
    proxy.logout()
}

play()