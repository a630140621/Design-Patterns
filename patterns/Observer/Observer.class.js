/**
 * 简单观察者模式
 * 
 * 用户观察商店物品的促销情况
 */
class PubSub {
    constructor() {
        this.topic = {}
    }

    // 发布
    publish(eventName, ...args) {
        if (!this.topic[eventName]) {
            throw new Error('没有这个事件')
        }

        for (let each of this.topic[eventName]) {
            each.fn.apply(each.fn, args)
        }
    }

    // 订阅
    subscribe(eventName, fn) {
        if (!this.topic[eventName]) this.topic[eventName] = []

        let id = this.__getID()
        this.topic[eventName].push({
            id: id,
            fn: fn
        })

        return id
    }

    // 退订
    unsubscribe(eventName, id) {
        this.topic[eventName] = this.topic[eventName].filter(each => {
            if (each.id !== id) return each
        })
    }

    // 获取唯一 id
    __getID() {
        return new Date().getTime() + Math.round(Math.random() * 1000000000000000000)
    }
}

class User {
    constructor(name) {
        this.name = name

        this.buy = this.buy.bind(this)
    }

    buy(product) {
        console.log(`我是 ${this.name}, ${product} 促销啦, 快去买啊`)
    }
}

// class Shop {
//     promote(product) {
//         console.log(`${product} 进行促销活动`)
//     }
// }


// let shop = new Shop()
let xiaohong = new User('小红')
let xiaolan = new User('小兰')
let xiaofang = new User('小芳')
let zhangsan = new User('张三')

let pubSub = new PubSub()
pubSub.subscribe('promotion', xiaohong.buy)
pubSub.subscribe('promotion', xiaolan.buy)
pubSub.subscribe('promotion', xiaofang.buy)
let id1 = pubSub.subscribe('promotion', zhangsan.buy)

pubSub.publish('promotion', '苹果')

// 退订
pubSub.unsubscribe('promotion', id1)
pubSub.publish('promotion', '香蕉')



console.log('--------------华丽的分割线----------------')
// 上述是通过第三个类来统一管理订阅和发布功能的
// 逻辑上应使用 user 来订阅 shop, 然后 shop 有商品促销的时候发布
// 参考 Event.class.js 中的做法, 将 PubSub 类的同一个实例聚集在 User 和 Shop 类中可以实现, 但是这又导致了紧耦合, 具体使用此方法时有待考虑
class User1 {
    constructor(name, pubSub) {
        this.name = name
        this.pubSub = pubSub

        this.buy = this.buy.bind(this)
    }

    buy(product) {
        console.log(`我是 ${this.name}, ${product} 促销啦, 快去买啊`)
    }

    subscribe(eventName, fn) {
        return this.pubSub.subscribe(eventName, fn)
    }
}

class Shop1 {
    constructor(pubSub) {
        this.pubSub = pubSub
    }

    promote(product) {
        console.log(`${product} 进行促销活动`)
        // 促销的同时发布(即通知 user)
        this.pubSub.publish('promotion', product)
    }
}


const pubSub1 = new PubSub()
let liu = new User1('刘', pubSub1)
let lu = new User1('卢', pubSub1)
let zhang = new User1('张', pubSub1)
let shop1 = new Shop1(pubSub1)

liu.subscribe('promotion', liu.buy)
lu.subscribe('promotion', lu.buy)
zhang.subscribe('promotion', zhang.buy)
shop1.promote('苹果')

// 事件被封装在了 Shop1 类中, 调用了 Shop1 类中的某些方法会自动发布一些事件, 只要和 传入 Shop1 中 pubSub 这个实例耦合均可对这些事件进行订阅
// 缺陷~~~耦合严重