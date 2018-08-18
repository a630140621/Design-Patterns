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
        return `exec sql`
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
                    // 对类中所有的方法进行代理
                    return new Proxy(target[propKey], {
                        apply(target, object, args) {
                            console.log('你调用的是一个 Mysql 实例的方法, 这里是预处理')
                            // console.log(`你正在调用函数 ${target.name} 参数为 ${args}`)
                            let ret = Reflect.apply(...arguments)
                            console.log(`这是函数调用的后续处理`)
                            return ret;
                        }
                    })
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
console.log(mysqlProxy.query('sql'))
mysqlProxy.say()
mysqlProxy.name
mysqlProxy.object
mysqlProxy.array