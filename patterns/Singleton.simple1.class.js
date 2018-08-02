class Singleton {
    /**
     * 单例模式, 使用静态变量保存实例
     */
    constructor() {
        return Singleton.instance;
    }

    setName(name) {
        this.__name = name;
    }

    getName() {
        return this.__name;
    }
}

Singleton.instance = new Singleton();


module.exports = Singleton;