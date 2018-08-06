/**
 * 简单工厂模式
 * 
 * 简单工厂的优点在于，你只需要一个正确的参数，就可以获取到你所需要的对象，而无需知道其创建的具体细节。(不仅仅是 new , 创建一个对象也包括后续的赋值等操作)
 * 
 * 参考: https://zhuanlan.zhihu.com/p/35323562
 */
class HumanFactory {
    /**
     * 创建人类
     * @param {Class} Human 传入一个 Human 的子类
     */
    static createHuman(Class) {
        if (!(new Class() instanceof Human)) {
            console.log('必须传入一个 Human 类的子类');
            return false
        }
        return new Class()
    }
}


class Human {
    constructor(color) {
        this.__color = color;
    }

    say() {}

    getColor() {
        return this.__color;
    }
}

class WhiteHuman extends Human {
    constructor() {
        super('white')
    }

    say() {
        console.log(`i am ${this.__color}`)
    }
}

class BlackHuman extends Human {
    constructor() {
        super('black')
    }

    say() {
        console.log(`i am ${this.__color}`)
    }
}

class YellowHuman extends Human {
    constructor() {
        super('yellow')
    }

    say() {
        console.log(`i am ${this.__color}`)
    }
}

module.exports = {
    HumanFactory: HumanFactory,
    WhiteHuman: WhiteHuman,
    BlackHuman: BlackHuman,
    YellowHuman: YellowHuman
}