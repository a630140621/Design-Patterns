const SingletonMulti = require('../patterns/Singleton.multi.class.js');
const SingletonSimple = require('../patterns/Singleton.simple.class.js');
const SingletonSimple1 = require('../patterns/Singleton.simple1.class.js');
const assert = require('assert');


describe('Singleton',
    it('SingletonMulti', () => {
        let singleton01 = new SingletonMulti('1');
        let singleton02 = new SingletonMulti('2');
        assert(singleton01 === singleton01);
        assert(singleton01 !== singleton02);
        assert(singleton02 === singleton02);
    }),
    it('SingletonSimple', () => {
        let singleton01 = new SingletonSimple();
        let singleton02 = new SingletonSimple();
        assert(singleton01 === singleton01);
        assert(singleton01 === singleton02);
        assert(singleton02 === singleton02);
        singleton01.setName('name');
        assert(singleton02.getName() === 'name');
        let singleton03 = new SingletonSimple();
        assert(singleton03.getName() === 'name');
    }),
    it('SingletonSimple1', () => {
        let singleton01 = new SingletonSimple1();
        let singleton02 = new SingletonSimple1();
        assert(singleton01 === singleton01);
        assert(singleton01 === singleton02);
        assert(singleton02 === singleton02);
        singleton01.setName('name')
        assert(singleton02.getName() === 'name');
        let singleton03 = new SingletonSimple1();
        assert(singleton03.getName() === 'name');
    })
)