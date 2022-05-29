
pragma solidity >= 0.5.0;

import './Tether.sol';
import './RWD.sol';

contract DecentralBank {
	string public name = 'Decentral Bank';
	address public owner;
	Tether public tether;
	RWD public rwd;

	address[] public stakers;

	mapping(address => uint) public stakingBalances;
	mapping(address => bool) public hasStaked;
	mapping(address => bool) public isStaking;

	constructor(RWD _rwd, Tether _tether) {
		tether = _tether;
		rwd = _rwd;
		owner = msg.sender;
	}

	// staking function
	function depositTokens(uint256 _amount) public payable {
		require(_amount > 0, 'amount cannot be 0');

		// transfer tether to this contract address for staking
		tether.transferFrom(msg.sender, address(this), _amount);

		// update staking balance
		stakingBalances[msg.sender] += _amount;

		if(!hasStaked[msg.sender]) {
			stakers.push(msg.sender);
		}
		isStaking[msg.sender] = true;
		hasStaked[msg.sender] = true;
	}
}