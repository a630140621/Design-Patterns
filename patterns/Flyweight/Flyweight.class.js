/**
 * 模仿 java 的享元模式
 */
class FlyweightFactory {
    constructor() {
        this.factory = {}
    }

    getFlyweight(key) {
        if (!this['factory'][key]) this['factory'][key] = new Flyweight()
        return this['factory'][key]
    }
}

class Flyweight {
    doSomething() {
        console.log('do some thing')
    }
}


// 和 java 的享元模式相似的结构, 但是省略了 享元类的接口
// 客户端访问 享元工厂, 工厂根据 key 是否相同决定返回已有的类还是创建新类

// 和之前实现的 单例模式拓展基本相同
// Singleton.multi1.class.js