const {
    HumanFactory,
    WhiteHuman,
    BlackHuman,
    YellowHuman
} = require('../patterns/Factory.simple.class');
const assert = require('assert');

class Demo {}

describe('SimpleFactory',
    it('WhiteHuman', () => {
        assert(HumanFactory.createHuman(WhiteHuman).getColor() == 'white')
    }),
    it('BlackHuman', () => {
        assert(HumanFactory.createHuman(BlackHuman).getColor() == 'black')
    }),
    it('YellowHuman', () => {
        assert(HumanFactory.createHuman(YellowHuman).getColor() == 'yellow')
    }),
    it('Demo', () => {
        assert(!HumanFactory.createHuman(Demo))
    }),
)