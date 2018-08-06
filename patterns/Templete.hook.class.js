/**
 * 在上一次的代码的基础下(`Templete.class.js`), 来了一个新的游戏, 要求是不需要选择角色, 这时候就需要用到带钩子的模板方法了
 */

class GameTemplete {
    // 开始游戏
    start() {}
    // 选择人物 return character
    choseCharacter() {}
    // 玩游戏
    play() {}
    // 关闭游戏
    close() {}
    // 钩子函数, 表示是否需要选角色(默认创建), 直接修改此模板并不会影响已经创建的游戏
    needToCreateCharacter(boolean) {
        return boolean || true
    }

    execute() {
        this.start();
        if (this.needToCreateCharacter()) {
            this.choseCharacter();
        }
        this.play();
        this.close();
    }
}

// 已经实现的具体类
class DNF extends GameTemplete {
    constructor() {
        super()
    }

    start() {
        console.log('welcome DNF')
    }

    choseCharacter() {
        console.log('chose character sword')
    }

    play() {
        console.log('play DNF')
    }

    close() {
        console.log('it is time to halt')
    }
}

class NewGame extends GameTemplete {
    constructor() {
        super()
    }

    start() {
        console.log('welcome newGame')
    }

    needToCreateCharacter(boolean) {
        return boolean
    }

    play() {
        console.log('play newGame')
    }

    close() {
        console.log('it is time to halt')
    }
}

new DNF().execute()

let newGame = new NewGame()
newGame.needToCreateCharacter(false)
newGame.execute()