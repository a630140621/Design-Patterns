class Singleton {
    /**
     * 单例模式的一个变种, 只要构造的时候传入相同的名称就会返回同一个对象
     * 
     * @param {String} name 单例名称
     */
    constructor(name) {
        this.__name = name;
        if (!Singleton['instances'][name]) {
            Singleton['instances'][name] = this;
        }
        return Singleton['instances'][name]
    }

    getName() {
        return this.__name;
    }
}

Singleton.instances = {}

module.exports = Singleton;