let instance = null;


class Singleton {
    /**
     * 单例模式, 使用模块级变量保存 单例
     */
    constructor() {
        if (instance) return instance
        instance = this
    }
}


module.exports = Singleton;