/**
 * 事件机制
 */

// 使用 node 原生模块实现
const EventEmitter = require('events')

class Shop extends EventEmitter {
    constructor() {
        super()
    }
}

class User {
    constructor(name) {
        this.name = name
        this.buy = this.buy.bind(this)
    }

    buy(product) {
        console.log(`我是${this.name}, ${product} 降价了, 快去买啊`)
    }
}

let zhangsan = new User('张三')
let lisi = new User('李四')

let shop = new Shop()
// 注册事件
shop.on('promotion', zhangsan.buy)
shop.on('promotion', lisi.buy)
// 触发事件
shop.emit('promotion', '苹果')

// 上面的视线中, shop 同时监听和发出了 'promotion' 事件, 虽然监听的事件中可以传入用户类的方法, 但是逻辑上还是有点问题
// 理论上应该是 shop 发出一个促销事件, user 监听促销事件, 并做出相应

console.log('--------------华丽的分割线----------------')

// 直接使用原生模块暂时没有想到解决办法,这里先用一个 中间人 来进行事件的发布和监听
class Mediator extends EventEmitter {
    constructor() {
        super()
    }
}

let mediator = new Mediator()
class Shop1 {
    emit(eventName, ...args) {
        mediator.emit(eventName, ...args)
    }
}

class User1 {
    constructor(name) {
        this.name = name

        // 绑定使用了 this 的方法, 学自 React
        this.buy = this.buy.bind(this)
    }

    on(eventName, fn, ...args) {
        mediator.on(eventName, fn, ...args)
    }

    buy(product) {
        console.log(`我是 ${this.name}, ${product} 促销啦, 快去买啊`)
    }
}

let wangwu = new User1('王五')
let xiaohong = new User1('小红')
wangwu.on('promotion', wangwu.buy)
xiaohong.on('promotion', xiaohong.buy)
xiaohong.on('promotion', xiaohong.buy)
let shop1 = new Shop1()
shop1.emit('promotion', '香蕉')

// 使用了一个中间人来进行事件的发布和监听, 可以在一个类中发布事件, 在另一个类中监听事件.
// 最好不要这么使用, 感觉有隐藏的风险
// 推荐使用第一种方法 或者 发布订阅