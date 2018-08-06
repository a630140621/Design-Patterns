/**
 * 游戏类模板
 * 
 * 目前所有游戏都需要启动, 选择人物, 玩游戏, 关闭游戏
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

    execute() {
        this.start();
        this.choseCharacter();
        this.play();
        this.close();
    }
}


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


class QQSpeed extends GameTemplete {
    constructor() {
        super()
    }

    start() {
        console.log('welcome QQSpeed')
    }

    choseCharacter() {
        console.log('chose character speed one')
    }

    play() {
        console.log('play QQSpeed')
    }

    close() {
        console.log('exit QQSpeed')
    }
}

new DNF().execute()
new QQSpeed().execute()