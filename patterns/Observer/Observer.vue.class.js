/**
 * vue 中看到的 订阅观察模式
 */

// 订阅者 Dep.js
class Dep {
    constructor() {
        this.subs = []
    }

    addSub(sub) {
        // 因为 vue 是使用 ts 写的, 所以这里可以进行类型检查
        if (sub instanceof Watcher) {
            this.subs.push(sub)
        }
    }

    notify() {
        let subs = this.subs.slice()
        subs.forEach(sub => {
            // sub 必须实现 update 方法
            sub.update()
        })
    }
}

// 观察者 Watcher.js
class Watcher {
    constructor(name) {
        this.name = name
        Dep.target = this
    }

    update() {
        console.log(`warcher ${this.name} updated`)
    }
}

// Dep.target = null


// 使用
let liu = new Watcher('liu')
let zhang = new Watcher('zhang')
let dep = new Dep()
dep.addSub(liu)
dep.addSub(zhang)
dep.notify()