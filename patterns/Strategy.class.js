/**
 * 使用策略模式实现表单校验
 * 
 * 用户名不可为空，不允许以空白字符命名，用户名长度不能小于2位。
 * 密码长度不能小于6位。
 * 正确的手机号码格式（数字且长度等于11）。
 * 
 * 参考：
 *  https://github.com/jawil/blog/issues/19
 *  https://www.jianshu.com/p/6525a1917fed
 */

// 预计使用方式(https://github.com/jawil/blog/issues/19)
// // 获取表单form元素
// let registerForm = document.querySelector('#registerForm')

// // 创建表单校验实例
// let validator = new Validator();
// // 编写校验配置
// validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空')
// validator.add(registerForm.userName, 'minLength:6', '用户名长度不能小于6')

// // 开始校验，并接收错误信息
// let errorMsg = validator.start()

// // 如果有错误信息输出，说明校验未通过
// if(errorMsg){
// 	alert(errorMsg)
// 	return false//阻止表单提交
// }


// 非 class 写法
/**
 * 具体策略类
 * @return {Boolean}
 */
let strategies = {
    isEmpty(value) {
        if (value === "") return true
        return false
    },
    minLength(value, length) {
        if (value.length < length) return true
        return false
    },
    notMobile(value) {
        if (value.length !== 11) return true
        return false
    }
}

class Validator {
    constructor() {
        this.errorMsg = []
    }

    add(strategy, args = [], errorMsg) {
        switch (strategy) {
            case 'isEmpty':
                if (strategies.isEmpty(...args)) this.errorMsg.push(errorMsg)
                break;
            case 'minLength':
                if (strategies.minLength(...args)) this.errorMsg.push(errorMsg)
                break;
            case 'notMobile':
                if (strategies.notMobile(...args)) this.errorMsg.push(errorMsg)
                break;
        }
    }

    start() {
        if (this.errorMsg.length !== 0) {
            console.error(this.errorMsg)
        } else {
            console.log(`没有错误`)
        }
    }
}

// 最终使用方式
let name = ''
let password = 1578782344
let phone = 15273

let validator = new Validator()
validator.add('isEmpty', [name], `姓名不能为空`)
validator.add('minLength', [password, 6], `密码长度必须大于6位`)
validator.add('notMobile', [phone], `请输入正确的手机号码`)
validator.start()



/**
 * 上面的实现在添加一个策略的时候必须同时修改 Validator 类中的方法, 违反了开闭原则
 */
class Validator1 {
    constructor() {
        this.errorMsg = []
    }

    add(strategy, args = [], errorMsg) {
        if (strategies[strategy](...args)) this.errorMsg.push(errorMsg)
    }

    start() {
        if (this.errorMsg.length !== 0) {
            console.error(this.errorMsg)
        } else {
            console.log(`没有错误`)
        }
    }
}

let validator1 = new Validator1()
validator1.add('isEmpty', [name], `姓名不能为空`)
validator1.add('minLength', [password, 6], `密码长度必须大于6位`)
validator1.add('notMobile', [phone], `请输入正确的手机号码`)
validator1.start()