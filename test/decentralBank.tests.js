const web3 = require('web3');

const RWD = artifacts.require('RWD');
const Tether = artifacts.require('Tether');
const DecentralBank = artifacts.require('DecentralBank');

require('chai').use(require('chai-as-promised')).should();

function tokens(num) {
  return web3.utils.toWei(num, 'ether');
}

contract('decentralBank', ([owner, customer]) => {
  let tether, rwd;

  before(async () => {
    // load contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    // transfer all tokens to decentral bank (1 million)
    await rwd.transfer(decentralBank.address, tokens('1000000'));

    // transfer 100 mock tethers to customer
    await tether.transfer(customer, tokens('100'), { from: owner });
  });

  describe('Mock Tether Deployment', async () => {
    it('matches name successfully', async () => {
      const name = await tether.name();
      assert.equal(name, 'Mock Tether Token');
    });
  });

  describe('Reward Token Deployment', async () => {
    it('matches name successfully', async () => {
      const name = await rwd.name();
      assert.equal(name, 'Reward Token');
    });
  });

  describe('Decentral Bank Deployment', async () => {
    it('matches name successfully', async () => {
      const name = await decentralBank.name();
      assert.equal(name, 'Decentral Bank');
    });

    it('has tokens', async () => {
      const balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens('1000000'));
    });
  });
});
