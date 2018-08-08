/**
 * 玩家类(登录游戏, 打怪, 升级, 下线), 具体调用的时候业务场景直接调用该类, 依次实现上述功能
 */

class Player {
    constructor(name) {
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

// 以下为业务中调用
function play() {
    let player = new Player(`lovecrazy`)
    player.login('account', 'password')
    player.killBoss()
    player.upgrade()
    player.logout()
}

play()

console.log('------------')

/**
 * 玩家代理类: 代理实现玩家所有的功能, 客户端通过调用代理来实现玩家的操作
 */
class PlayerProxy {
    constructor(name) {
        this.proxy = new Player(name)
    }

    login(account, password) {
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
}

// 此时的业务场景中用法
function play_2() {
    let proxy = new PlayerProxy(`lovecrazy`)
    proxy.login('account', 'password')
    proxy.killBoss()
    proxy.upgrade()
    proxy.logout()
}

play_2()