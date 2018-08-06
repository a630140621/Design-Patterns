/**
 * 对于带钩子的模板模式(`Template.hook.class.js`), 有时我们还想在外部调用的时候指定不同的调用顺序;
 * 此时可在模板模式中增加一个函数来表示执行顺序(类hook, 例子可能有点不贴切);
 */

class GameTemplate {
    constructor() {
        this.__sequence = ["start", "character", "play", "close"]
        this.__needToCreateCharacter = true
    }
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
        this.__needToCreateCharacter = boolean || true
    }

    /**
     * 执行顺序 "start", "character", "play", "close"
     * 
     * 也可是使用这个来实现是否需要创建角色
     * @param {Array} sequence []
     */
    setSequence(sequence) {
        this.__sequence = sequence;
    }

    execute() {
        for (let seq of this.__sequence) {
            if (seq == "start") {
                this.start();
            } else if (seq == "character") {
                if (this.__needToCreateCharacter) {
                    this.choseCharacter();
                }
            } else if (seq == "play") {
                this.play();
            } else if (seq == "close") {
                this.close();
            }
        }
    }
}


class NewGame extends GameTemplate {
    constructor() {
        super()
    }

    start() {
        console.log('welcome newGame')
    }

    choseCharacter() {
        console.log('chose character')
    }

    play() {
        console.log('play newGame')
    }

    close() {
        console.log('it is time to halt')
    }
}

let newGame = new NewGame()
// 让我们先关闭游戏, 在玩游戏, 最后开始, 选择角色
newGame.setSequence(["close", "play", "start", "character"])
newGame.execute()
console.log('-----------')
// 让我们先 开始游戏, 选择角色, 玩游戏, 玩游戏, 玩游戏~
newGame.setSequence(["start", "character", "play", "play", "play"])
newGame.execute()