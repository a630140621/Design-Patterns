/**
 * 一个简单的翻页
 */
class Page {
    /**
     * 初始化的时候传入第一页的数据
     * @param {String} content 数据
     */
    constructor(content) {
        this.currentPage = 1
        this.content = content
        // 缓存页面数据
        this.caches = [{
            page: this.currentPage,
            content: this.content
        }]
    }

    getContent() {
        for (let cache of this.caches) {
            if (cache.page == this.currentPage) return cache.content
        }
        return ''
    }

    nextPage() {
        this.currentPage++
        let content = `这是第 ${this.currentPage} 页的数据`
        this.caches.push({
            page: this.currentPage,
            content: content
        })

        return content
    }

    prePage() {
        this.currentPage--
        if (this.currentPage < 1) {
            this.currentPage++
            throw new Error('已经是第一页了')
        }

        return this.getContent()
    }

    go(n) {
        if (n < 1) throw new Error('传入的页数必须大于0')
        this.currentPage = n
        return this.getContent()
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

// 这个类违反了 单一职责 因为 Page 类既有翻页的功能又具有 缓存的功能
// 应该把缓存独立开来
// 缓存独立开来又有两种方法, 一种是 业务端调用时 手动添加缓存
// 还有一种是在 Page 类中实现缓存, 这样业务端调用就不需要知道这个类是否使用了缓存, 只需要直接调用即可
// 见下一个例子 `Memento.sample2.class.js`