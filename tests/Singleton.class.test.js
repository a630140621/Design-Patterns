const Singleton = require('../patterns/Singleton.class.js');
const assert = require('assert');


describe('Singleton',
    it('singleton', () => {
        assert(new Singleton('1') === new Singleton('1'));
        assert(new Singleton('1') !== new Singleton('2'));
        assert(new Singleton('2') === new Singleton('2'));
    }),
    it('getName', () => {
        new Singleton('1').getName() == '1'
        new Singleton('1').getName() == '1'
        new Singleton('1').getName() == '1'
        new Singleton('1').getName() == '1'
        new Singleton('1').getName() == '1'
        new Singleton('2').getName() == '2'
        new Singleton('2').getName() == '2'
    })
)