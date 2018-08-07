/**
 * 建造者模式通常由四个部分组成
 * 
 *  1. 具体的产品类
 *  2. 抽象的建造者类
 *  3. 具体的建造者类
 *  4. 导演类(调用具体的建造者类进行构建产品)
 */

// 具体的产品和构建顺序有关
class Product {
    setPartA() {
        console.log('setPartA')
    }

    setPartB() {
        console.log('setPartB')
    }

    setPartC() {
        console.log('setPartC')
    }
}

// 抽象建造者
class Builder {
    constructor(product) {
        this.__product = product;
    }

    build() {}
}

// 具体建造者, 按照ABC顺序建造对象
class ABCBuilder extends Builder {
    constructor(product) {
        super(product)
    }

    build() {
        this.__product.setPartA()
        this.__product.setPartB()
        this.__product.setPartC()
    }
}

// 具体建造者, 按照CAB顺序建造对象
class CABBuilder extends Builder {
    constructor(product) {
        super(product)
    }

    build() {
        this.__product.setPartC()
        this.__product.setPartA()
        this.__product.setPartB()
    }
}

// 导演类
class Director {
    static buildABCProduct() {
        let product = new Product()
        let abcBuilder = new ABCBuilder(product)
        abcBuilder.build()
    }

    static buildCABProduct() {
        let product = new Product()
        let cabBuilder = new CABBuilder(product)
        cabBuilder.build()
    }
}


// 业务端(客户端)
Director.buildABCProduct()
console.log('--------')
Director.buildCABProduct()