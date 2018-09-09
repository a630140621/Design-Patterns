/**
 * 桥梁模式: 将抽象部分与它的实现部分分离，使它们都可以独立地变化。
 * 
 * 参考: 
 * 
 * https://www.jianshu.com/p/3f6db7ffe2f2
 * http://luopq.com/2015/11/11/design-pattern-bridge/
 */
class Maobi {
    write(color) {
        console.log(`use ${color.getColor()}`)
    }
}

class Color {}

class RedColor extends Color {
    constructor() {
        super()
        this.color = 'red'
    }

    getColor() {
        return this.color
    }
}

class BlueColor extends Color {
    constructor() {
        super()
        this.color = 'blue'
    }

    getColor() {
        return this.color
    }
}

// 使用
let maobi = new Maobi()
let redColor = new RedColor()
let blueColor = new BlueColor()
maobi.write(redColor)
maobi.write(blueColor)