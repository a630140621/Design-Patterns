let instances = {};


class Singleton {
    /**
     * 单例模式的一个变种, 只要构造的时候传入相同的名称就会返回同一个对象
     * 
     * @param {String} name 单例名称
     */
    constructor(name) {
        this.__name = name;
        if (instances[this.__name]) return instances[this.__name];
        // console.log(`do not have this instance#${this.__name} now create one`);
        instances[this.__name] = this;
    }
}

module.exports = Singleton;