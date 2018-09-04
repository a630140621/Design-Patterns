/**
 * 单状态以及组合状态
 * 
 * https://segmentfault.com/a/1190000012506631
 * 比如超级玛丽，就可能同时有好几个状态比如 跳跃，移动，射击，蹲下 等，
 * 如果对这些动作一个个进行处理判断，需要多个 if-else 或者 switch 不仅丑陋不说，而且在遇到有组合动作的时候，实现就会变的更为复杂，这里可以使用状态模式来实现。
 * 
 * 状态模式的思路是：
 *      首先创建一个状态对象或者数组，内部保存状态变量，然后内部封装好每种动作对应的状态，然后状态对象返回一个接口对象，它可以对内部的状态修改或者调用。
 * 
 * 状态通常为一个或多个枚举常量的表示。
 */
class State {
    jump() {
        console.log('跳跃!')
    }

    move() {
        console.log('移动!')
    }

    shoot() {
        console.log('射击!')
    }

    squat() {
        console.log('蹲下!')
    }
}

class SuperMarry {
    constructor() {
        this.currentState = []
        this.states = new State()
    }

    setState(stateArr) {
        this.currentState = stateArr
        return this
    }

    run() {
        this.currentState.map(state => {
            if (typeof this['states'][state] === 'function') {
                this['states'][state]()
            } else {
                console.log(`请设置正确的状态`)
            }
        })

        return this
    }
}

let superMarry = new SuperMarry()
superMarry.setState(['jump']).run().setState(['move', 'shoot']).run().setState(['jump', 'move', 'squat']).run()

// 这里没有体现从一个状态到另一个状态, 也没有体现一个状态下能做某些事情不能做某些事情