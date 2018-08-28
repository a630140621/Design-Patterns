/**
 * 门面模式
 * 
 * 当微服务中的服务过多时, 客户端在使用一个功能的时候可能老是按照同样的方式调用相同的接口, 这时候就可以使用门面模式(可以尝试新建一个微服务, 专门用来提供此类服务)
 * 当然, 微服务也可以做到客户端只调用一个服务的接口, 然后由这个服务调用其他的服务
 */
class A {
    doSomeThingA() {
        console.log('do something a')
    }
}

class B {
    doSomeThingB() {
        console.log(`do something b`)
    }
}

class C {
    doSomeThingC() {
        console.log(`do something c`)
    }
}

// 不试用门面模式的情况下, 业务逻辑调用代码如下(经常这样组合)
function doSomeThingWithoutFacade() {
    let a = new A()
    let b = new B()
    let c = new C()
    a.doSomeThingA()
    b.doSomeThingB()
    c.doSomeThingC()
}

doSomeThingWithoutFacade()

console.log(`-----------华丽的分割线---------------`)

// 现在写一个门面模式(可以是一个函数, 也可以是一个类, 此处试用函数)
function facade() {
    let a = new A()
    let b = new B()
    let c = new C()
    a.doSomeThingA()
    b.doSomeThingB()
    c.doSomeThingC()
}

// 此时业务代码调用方式
function doSomeThingWithFacade() {
    facade()
}

doSomeThingWithFacade()