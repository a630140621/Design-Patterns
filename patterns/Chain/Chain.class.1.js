/**
 * https://www.kancloud.cn/digest/design-pattern-of-js/128423
 * 
 * 
 * 假设这么一个场景：
 * 
 * 我们负责一个售卖手机的电商网站，经过分别缴纳500元定金和200元定金的两轮预定后，到了正式购买阶段。
 * 针对预定用户实行优惠，支付过500元定金的用户会收到100元的商城优惠券，
 * 支付过200元定金的用户会收到50元的商城优惠券，
 * 没有支付定金的用户归为普通购买，且在库存有限的情况下不一定保证买到。
 */

/* 传统方式实现 */
// orderType：[1:500, 2:200, 3:普通]，isPaid：true/false，stock：库存量
function order1(orderType, isPaid, stock) {
    if (orderType == 1) {
        if (isPaid) {
            console.log("500元定金预购，得到100优惠券")
        } else {
            if (stock > 0) {
                console.log("普通购买，无优惠券")
            } else {
                console.log("库存不足")
            }
        }
    } else if (orderType == 2) {
        if (isPaid) {
            console.log("200元定金预购，得到50优惠券")
        } else {
            if (stock > 0) {
                console.log("普通购买，无优惠券")
            } else {
                console.log("库存不足")
            }
        }
    } else {
        if (stock > 0) {
            console.log("普通购买，无优惠券")
        } else {
            console.log("库存不足")
        }
    }
}

order1(1, true, 500)


/* 责任链方式 */
let order500 = function (orderType, isPaid, stock) {
    if (orderType === 1 && isPaid === true) {
        console.log("500元定金预购，得到100优惠券")
    } else {
        return "nextHandler"
    }
}

let order200 = function (orderType, isPaid, stock) {
    if (orderType === 2 && isPaid === true) {
        console.log("200元定金预购，得到50优惠券")
    } else {
        return "nextHandler"
    }
}

let orderNormal = function (orderType, isPaid, stock) {
    if (stock > 0) {
        console.log("普通购买，无优惠券")
    } else {
        console.log("库存不足")
    }
}

Function.prototype.after = function (fn) {
    let self = this
    return function () {
        let ret = self.apply(this, arguments)
        if (ret === "nextHandler") {
            return fn.apply(this, arguments)
        }
        return ret
    }
}

let order = order500.after(order200).after(orderNormal)
order(2, true, 10)