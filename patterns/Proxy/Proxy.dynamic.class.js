/**
 * 使用动态代理, 代理一个类, 并在调用类的方法前进行预处理
 * 
 * 缺陷: 暂无在调用方法之后进行处理的办法
 */

class Mysql {
    constructor() {
        this.name = 'mysql'
        this.object = {
            a: 'a'
        }
        this.array = [1, 2, 3]
    }

    query(sql) {
        console.log(`exec sql`)
    }

    say() {
        console.log(`i am mysql class`)
    }
}

class MysqlProxy {
    constructor() {
        this.proxy = new Proxy(MysqlProxy.mysql, {
            get(target, propKey, receiver) {
                if (typeof target[propKey] === 'function') {
                    console.log('你调用的是一个 Mysql 实例的方法, 这里是预处理')
                    return Reflect.get(...arguments)
                } else {
                    return Reflect.get(...arguments)
                }
            }
        })

        return this.proxy
    }
}

MysqlProxy.mysql = new Mysql()


let mysqlProxy = new MysqlProxy()
mysqlProxy.query('sql')
mysqlProxy.say()
mysqlProxy.name
mysqlProxy.object
mysqlProxy.array