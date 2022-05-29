const _deploy_contracts = require('../migrations/2_deploy_contracts');

const RWD = artifacts.require('RWD');
const Tether = artifacts.require('Tether');
const DecentralBank = artifacts.require('DecentralBank');

require('chai').use(require('chai-as-promised')).should();

contract('decentralBank', accounts => {
  describe('Mock Tether Deployment', async () => {
    it('matches name successfully', async () => {
      const tether = await Tether.new();
      const name = await tether.name();
      assert.equal(name, 'Mock Tether Token');
    });
  });
});
