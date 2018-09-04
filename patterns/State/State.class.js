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
class State {
    constructor() {

    }

    setContext(context) {
        this.context = context
    }

    download() {
        throw new Error(`子类必须覆写这个方法`)
    }

    pause() {
        throw new Error(`子类必须覆写这个方法`)
    }

    stop() {
        throw new Error(`子类必须覆写这个方法`)
    }
}

class DownloadState extends State {
    constructor() {
        super()
    }

    download() {
        console.log(`开始下载...`)
    }

    pause() {
        this.context.setCurrentState(this.context.PauseState)
        this.context.pause()
    }

    stop() {
        this.context.setCurrentState(this.context.StopState)
        this.context.stop()
    }
}

class PauseState extends State {
    constructor() {
        super()
    }

    download() {
        this.context.setCurrentState(this.context.DownloadState)
        this.context.download()
    }

    pause() {
        console.log(`下载暂停...`)
    }

    stop() {
        this.context.setCurrentState(this.context.StopState)
        this.context.stop()
    }
}

class StopState extends State {
    constructor() {
        super()
    }

    download() {
        this.context.setCurrentState(this.context.DownloadState)
        this.context.download()
    }

    pause() {
        throw new Error(`下载已经结束了, 不能暂停了`)
    }

    stop() {
        console.log(`下载结束...`)
    }
}

class Context {
    constructor() {
        this.DownloadState = new DownloadState()
        this.PauseState = new PauseState()
        this.StopState = new StopState()

        this.setCurrentState = this.setCurrentState.bind(this)
        this.download = this.download.bind(this)
        this.pause = this.pause.bind(this)
        this.stop = this.stop.bind(this)
    }

    setCurrentState(currentState) {
        this.currentState = currentState
        // 切换状态
        this.currentState.setContext(this)
    }

    download() {
        this.currentState.download()
    }

    pause() {
        this.currentState.pause()
    }

    stop() {
        this.currentState.stop()
    }
}


// 业务调用
let context = new Context()
context.setCurrentState(new DownloadState())
context.download()
context.pause()
context.download()
context.stop()


// 虽然可以正常运行了, 但是我还是有点没有理解原因, 而且这种写法对js来说实在是太复杂(绕)了
// js 和 java 在类上的差异太大, 所以在js中, 可以使用函数这个一等公民来解决很多麻烦的事情