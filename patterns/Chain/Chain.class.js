/**
 * 情景: 财秘用户登录的三种情况 1. 普通用户登录 2. 体验用户登录 3. VIP 用户登录, (还有更多种, 如赠送的VIP用户,未注册用户登录等)
 */

// 定义全局常量
const GENERALUSER = 1;
const EXPERIENCEUSER = 2;
const VIPUSER = 3;

// 普通方案
class User1 {
    constructor(account) {
        this.account = account;
    }

    // 登录
    login(password) {
        let type = this.__getType()
        if (type == GENERALUSER) {
            console.log('普通用户登录')
        } else if (type == EXPERIENCEUSER) {
            console.log('体验用户登录')
        } else if (type == VIPUSER) {
            console.log('VIP用户登录')
        } else {
            console.log('尚未发现该类型用户')
        }
    }

    // 返回用户类型
    __getType() {
        return Math.round(Math.random() * 2 + 1)
    }
}

// 业务层直接调用 login 无需知道是什么类型用户进行登录
for (let i = 0; i < 10; i++) {
    new User1('test').login('password')
}

console.log('-------------一条华丽的分割线--------------')

/**
 * 责任链模式
 */
class User {
    constructor(account) {
        this.account = account
    }

    setNextHandler(handler) {
        this.__nextHandler = handler
    }

    // 默认责任链的第一个处理者进行处理
    login(password) {
        let type = this.getType()
        new VIPUser(this.account, type).login(password)
    }

    // 返回用户类型, 客户端并不知道登录用户的具体类型, 需要自行判断
    getType() {
        return Math.round(Math.random() * 2 + 1)
    }
}

class VIPUser extends User {
    constructor(account, type) {
        super(account)
        this.__nextHandler = new ExperienceUser(account, type)
        this.type = type
    }

    login(password) {
        if (this.type === VIPUSER) {
            console.log('VIP用户登录')
        } else if (this.__nextHandler) {
            this.__nextHandler.login(password)
        } else {
            console.log('这已经是最后一个处理者了')
        }
    }
}

class ExperienceUser extends User {
    constructor(account, type) {
        super(account)
        this.__nextHandler = new GeneralUser(account, type)
        this.type = type
    }

    login(password) {
        if (this.type === EXPERIENCEUSER) {
            console.log('体验用户登录')
        } else if (this.__nextHandler) {
            this.__nextHandler.login(password)
        } else {
            console.log('这已经是最后一个处理者了')
        }
    }
}

class GeneralUser extends User {
    constructor(account, type) {
        super(account)
        this.__nextHandler = null
        this.type = type
    }

    login(password) {
        if (this.type === GENERALUSER) {
            console.log('普通用户登录')
        } else if (this.__nextHandler) {
            this.__nextHandler.login(password)
        } else {
            console.log('这已经是最后一个处理者了')
        }
    }
}

// 业务层直接调用 login 无需知道是什么类型用户进行登录
for (let i = 0; i < 10; i++) {
    new User('test').login('password')
}