let instances = {};


class Singleton {
    constructor(name) {
        this.__name = name;
        if (instances[this.__name]) return instances[this.__name];
        // console.log(`do not have this instance#${this.__name} now create one`);
        instances[this.__name] = this;
    }

    say() {
        console.log(`my name is ${this.__name}`);
    }

    getName() {
        return this.__name;
    }
}

module.exports = Singleton;