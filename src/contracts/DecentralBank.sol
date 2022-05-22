
pragma solidity >= 0.5.0;

import './Tether.sol';
import './RWD.sol';

contract DecentralBank {
	string public name = 'Decental Bank';
	address public owner;
	Tether public tether;
	RWD public rwd;

	constructor(RWD _rwd, Tether _tether) {
		tether = _tether;
		rwd = _rwd;
		owner = msg.sender;
	}
}