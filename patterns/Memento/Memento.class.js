/**
 * 模仿 java 的备忘录模式
 */
// 备忘录类
class Memento {
    constructor(state) {
        this.state = state
    }

    getState() {
        return this.state
    }
}

// 源类
class Originator {
    setState(state) {
        this.state = state
    }

    getState() {
        return this.state
    }

    say() {
        console.log(`我的状态是 ${this.state}`)
    }

    /**
     * 保存用户状态, 并返回一个备忘录的实例
     * @return {Memento} 返回一个备忘录的实例
     */
    saveStateToMemento() {
        return new Memento(this.state)
    }

    /**
     * 从备忘录中获取状态
     * @param {Memento} memento 传入一个备忘录
     */
    restoreState(memento) {
        this.state = memento.getState()
    }
}

// 管理备忘录的类
class CareTaker {
    setMemento(memento) {
        this.memento = memento
    }

    getMemento() {
        return this.memento
    }
}


// 客户端(业务)使用
let originator = new Originator()
let careTaker = new CareTaker()
originator.setState('happy')
originator.say()
// 创建备忘录
careTaker.setMemento(originator.saveStateToMemento())
// 改变状态
originator.setState('sadly')
originator.say()
// 从备忘录恢复状态
originator.restoreState(careTaker.getMemento())
originator.say()


// 这是 java 中标准的备忘录模式, 此备忘录只能记录一个状态(可在备忘录中使用数组保存状态, 用于保存多个状态)
// 可以在备忘录管理类中也使用数组来保存备忘录, 用于保存多个备忘录(以便于返回指定的状态)
// 这里使用的是 浅拷贝 , 实际使用中如果状态是 数组 或者 对象, 则需要使用 深拷贝