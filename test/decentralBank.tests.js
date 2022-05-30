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

  describe('Yield Farming', async () => {
    it('rewards tokens for staking', async () => {
      let res;
      // check investor's balance before staking
      res = await tether.balanceOf(customer);
      assert.equal(
        res,
        tokens('100'),
        'customer mock tether balance before staking'
      );

      // stake 100 tethers to decentral bank
      await tether.approve(decentralBank.address, tokens('100'), {
        from: customer,
      });
      res = await tether.allowance(customer, decentralBank.address);
      assert.equal(res, tokens('100'), 'customer allowance');

      await decentralBank.depositTokens(tokens('100', { from: customer }));

      //check updated tokens of customer
      res = await decentralBank.stakingBalance(customer);
      assert.equal(
        res.toString(),
        tokens('0'),
        'customer tether balance after staking'
      );

      // check updated balance of decentral bank
      res = await tether.balanceOf(decentralBank.address);
      assert.equal(res.toString(), tokens('100'), 'decentral bank balance');

      res = await decentralBank.isStaking(customer);
      assert.equal(res, true, 'customer isStaking status after staking');
    });
  });
});
