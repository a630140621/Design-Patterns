/**
 * 状态模式
 * 
 * java 中的状态模式是从状态的角度建模, 以存在状态接口定义所有的功能, 然后每种状态为具体的实现类, 实现他们这个状态下的功能以及调用其他功能时状态的转移
 * 此外还有一个 context 类来封装状态的变化
 * 
 * 比如我们下载一个文件有好几种状态, 下载, 暂停, 结束(成功, 失败), 停止, 重新开始, 等等
 * 下面使用 js 来模拟 java 的状态模式
 * java 写法状态过多导致类和需要实现的函数都变得很多, 这里的实现只使用三个状态 下载, 暂停, 停止
 */
class Context {
    constructor(state) {
        this.state = state
    }

    setState(state) {
        // 是否需要判断传入类型是否为 状态类的实例, 有待进一步思考???
        if (state instanceof State) {
            this.state = state
        } else {
            throw new Error(`请传入一个状态类的子类`)
        }
    }
}

class State {
    download(context) {
        throw new Error(`子类必须覆写这个方法`)
    }
    pause(context) {
        throw new Error(`子类必须覆写这个方法`)
    }
    stop(context) {
        throw new Error(`子类必须覆写这个方法`)
    }
}

class ReadyState extends State {
    download(context) {
        console.log(`开始下载`)
        context.setState()
    }
    pause(context) {
        throw new Error(`准备状态下点了暂停也没有用`)
    }
    stop(context) {
        throw new Error(`准备状态下点了停止也没有用`)
    }
}

class DownloadState extends State {
    download(context) {
        console.log(`已经在下载了...`)
        context.setState(this)
    }
    pause(context) {
    }
    stop(context) {
    }
}

class PauseState extends State {
    download(context) {
        console.log(`已经在下载了...`)
    }
    pause(context) {
        console.log(`下载暂停...`)
        context.setState(this)
    }
    stop(context) {
        console.log(`下载停止...`)
    }
}

class StopState extends State {
    download(context) {
    }
    pause(context) {
        throw new Error(`下载已经结束了, 不能暂停了`)
    }
    stop(context) {
        console.log(`下载结束...`)
        context.setState(this)
    }
}