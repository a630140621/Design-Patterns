class Singleton {
    /**
     * 单例模式, 使用静态变量保存实例
     */
    constructor() {
        return Singleton.instance;
    }
}

Singleton.instance = new Singleton();


module.exports = Singleton;