class Handler {
    constructor() {
        console.log('Handler Class created');
    }

    handleRequest() {
        console.log('Handler.handleRequest invoked');
    }
}

class ConcreteHandler1 extends Handler {
    constructor() {
        super();
        console.log('ConcreteHandler1 Class created');
    }

    setNextHandler(handler) {
        this.nextHandler = handler;
    }

    handleRequest(request) {
        console.log('ConcreteHandler1.handleRequest invoked');
        if (request === 'run')
            console.log('ConcreteHandler1 has handled the request');
        else {
            console.log('ConcreteHandler1 calls his nextHandler');
            this.nextHandler.handleRequest(request);
        }
    }
}

class ConcreteHandler2 extends Handler {
    constructor() {
        super();
        console.log('ConcreteHandler2 Class created');
    }

    handleRequest(request) {
        console.log('ConcreteHandler2.handleRequest invoked');
    }
}

let handle1 = new ConcreteHandler1();
let handle2 = new ConcreteHandler2();
handle1.setNextHandler(handle2);
handle1.handleRequest('run');
handle1.handleRequest('stay');