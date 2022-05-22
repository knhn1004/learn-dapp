pragma solidity >= 0.5.0;

contract Tether {
	string public name = 'Tether';
	string public symbol = 'USDT';
	uint256 public totalSupply = 1000000000000000000;
	uint8 public decimals = 18;

	event Transfer(
		address indexed _from,
		address indexed _to,
		uint value
	);

	event Approve(
		address indexed _owner,
		address indexed _spender,
		uint value
	);

	mapping(address => uint256) public balancesOf;

	constructor() {
		balancesOf[msg.sender] = totalSupply;
	}

	function transfer(address _to, uint _value) public  returns (bool success){
		require(balancesOf[msg.sender] >= _value);

		balancesOf[msg.sender] -= _value;
		balancesOf[_to] += _value;
		emit Transfer(msg.sender, _to, _value);
		return true;
	}


}