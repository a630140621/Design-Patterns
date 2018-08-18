/**
 * 装饰模式,模拟 ajax 表单提交，通过装饰模式在表单提交的前后执行其他操作
 */
function ajax(url) {
    console.log(`do ajax url = ${url}`)
}

Function.prototype.before = function(fn, args = []) {
    let self = this;
    return function() {debugger
        fn.apply(this, args)
        return self.apply(this, arguments)
    }
}

Function.prototype.after = function(fn, args = []) {
    let self = this;
    return function() {
        let ret = self.apply(this, arguments)
        fn.apply(this, args)
        return ret;
    }
}

// 装饰的具体函数
function beforeAjax(args) {
    console.log(`do something before ajax, args = ${args}`)
}

function afterAjax(args) {
    console.log(`do something after ajax, args = ${args}`)
}

// 单独运行 ajax
ajax('url1')

// 只有前置操作的 ajax
console.log(`---------一条华丽的分割线---------`)
ajax1 = ajax.before(beforeAjax, ['args1', 'args2'])
ajax1('url2')

// 只有后续操作的 ajax
console.log(`---------一条华丽的分割线---------`)
ajax2 = ajax.after(afterAjax, ['args1'])
ajax2('url3')

// 同时增加预处理和后续处理
console.log(`---------一条华丽的分割线---------`)
ajax3 = ajax.before(beforeAjax, ['arg1']).after(afterAjax, ['after args'])
ajax3('url4')

// ajax 函数并未被修改
console.log(`---------一条华丽的分割线---------`)
ajax('url5')