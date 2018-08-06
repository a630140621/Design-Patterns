const SingletonMulti = require('../patterns/Singleton.multi.class.js');
const SingletonMulti1 = require('../patterns/Singleton.multi1.class.js');
const SingletonSimple = require('../patterns/Singleton.simple.class.js');
const SingletonSimple1 = require('../patterns/Singleton.simple1.class.js');
const assert = require('assert');


describe('Singleton',
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
        assert(SingletonSimple1.instance === SingletonSimple1.instance);
        singleton01.setName('name')
        assert(singleton02.getName() === 'name');
        let singleton03 = new SingletonSimple1();
        assert(singleton03.getName() === 'name');
    }),
    it('SingletonMulti', () => {
        let singleton01 = new SingletonMulti('1');
        let singleton02 = new SingletonMulti('2');
        assert(singleton01 === singleton01);
        assert(singleton01 !== singleton02);
        assert(singleton02 === singleton02);
        assert(singleton01.getName() === '1');
        assert(singleton02.getName() === '2');
        let singleton03 = new SingletonMulti('1');
        assert(singleton03 === singleton01);
    }),
    it('SingletonMulti1', () => {
        let singleton01 = new SingletonMulti1('1');
        let singleton02 = new SingletonMulti1('2');
        assert(singleton01 === singleton01);
        assert(singleton01 !== singleton02);
        assert(singleton02 === singleton02);
        assert(singleton01.getName() === '1');
        assert(singleton02.getName() === '2');
        let singleton03 = new SingletonMulti1('1');
        assert(singleton03 === singleton01);
    }),
)