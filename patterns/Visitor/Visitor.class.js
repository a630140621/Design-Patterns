/**
 * 访问者模式
 * 
 * 由于此设计模式在java中利用了java中的重载和复写, 而js中只有复写, 没有重载, 所以改用回调实现
 * 
 * 统计公司人员的工资总额
 */
class Employee {
    constructor(name, salary) {
        this.name = name
        this.salary = salary
    }

    report() {
        console.log(`我的名字是: ${this.name}, 我的薪水是: ${this.salary}`)
    }

    /**
     * 传入一个 Function, 使用这个类的实例作为参数
     * @param {Function} visit 
     */
    accept(visit) {
        visit(this)
    }
}

// 普通员工类
class CommonEmployee extends Employee {
    constructor(name, salary, job) {
        super(name, salary)
        this.job = job
    }
}

// 管理人员类
class Manager extends Employee {
    constructor(name, salary, performance) {
        super(name, salary)
        this.performance = performance
    }
}

// 定义访问者
class Visitor {
    constructor() {
        this.__commonEmployeeSalary = 0
        this.__managerEmployeeSalary = 0

        this.visit = this.visit.bind(this)
    }

    visit(employee) {
        this.__employee = employee
        employee.report()
        if (employee instanceof CommonEmployee) {
            this.__calCommonEmployeeSalary()
        } else if (employee instanceof Manager) {
            this.__calManagerEmployeeSalary()
        } else {
            console.log(`该访问者暂不处理这个类`)
        }
    }

    // 普通打工者工资系数 1.2, 可以考虑作为常量
    __calCommonEmployeeSalary() {
        this.__commonEmployeeSalary = this.__employee.salary * 1.2
    }

    // 管理者工资系数 1.5, 可以考虑作为常量
    __calManagerEmployeeSalary() {
        this.__managerEmployeeSalary = this.__employee.salary * 1.5
    }

    getTotalSalary() {
        console.log(`总共的薪水是: ${this.__commonEmployeeSalary + this.__managerEmployeeSalary}`)
        return this.__commonEmployeeSalary + this.__managerEmployeeSalary
    }
}

// 业务端使用
let zhangsan = new CommonEmployee('张三', 1000, '天天无所事事')
let lisi = new CommonEmployee('李四', 1200, '咦, 我有一份工作吗')
let wangwu = new Manager('王舞', 5000, '我是灵剑山的五长老')

let visitor = new Visitor()
zhangsan.accept(visitor.visit)
lisi.accept(visitor.visit)
wangwu.accept(visitor.visit)
visitor.getTotalSalary()

// 此时在有一个新的需求, 则只需要拓展一个访问者类来实现, 而不需要修改已有代码