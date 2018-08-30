/**
 * 这里实现的是将缓存 聚合 在 Page 类中, 业务端调用并不需要改变
 */
// 缓存类, 使用单例
class Store {
    constructor(name) {
        // if (!Store['instances'][name]) {
        //     Store['instances'][name] = this
        // }
        // this.name = name
        this.stores = {}
        // return Store['instances'][name]
    }

    set(key, value) {
        this['stores'][key] = value
    }

    get(key) {
        return this['stores'][key] || ''
    }
}
// Store.instances = {}

// 页面类
class Page {
    /**
     * 初始化的时候传入第一页的数据
     * @param {String} content 数据
     */
    constructor(content) {
        this.currentPage = 1
        this.content = content
        // 缓存页面数据
        this.store = new Store()
        this.store.set(this.currentPage, this.content)
    }

    getContent() {
        return this.store.get(this.currentPage)
    }

    nextPage() {
        this.currentPage++
        // 下一句为 从远程获取数据
        let content = `这是第 ${this.currentPage} 页的数据`
        this.store.set(this.currentPage, content)

        return content
    }

    prePage() {
        this.currentPage--
        if (this.currentPage < 1) {
            this.currentPage++
            throw new Error('已经是第一页了')
        }

        return this.store.get(this.currentPage)
    }

    go(n) {
        if (n < 1) throw new Error('传入的页数必须大于0')
        this.currentPage = n
        return this.store.get(n)
    }
}


// 业务端调用
let page = new Page(`这是第 1 页的数据`)
console.log(page.getContent())
console.log(page.nextPage())
console.log(page.nextPage())
console.log(page.nextPage())
console.log(page.nextPage())
console.log(page.prePage())
// 回到第一页
console.log(page.go(1))


// 这里虽然使用了 store 但是依然是一个浅拷贝, 即使改成 深拷贝 也不应再实际业务中使用, 因为数据直接保存在内存中是一件奢侈的事情
// 实际使用的话也应该用外置缓存 Redis, memoryCache 等中间件, 
// 此 Store 类可以用作一层封装提供给其他模块使用, 这样其他模块就不需要知道具体使用的是什么样的缓存