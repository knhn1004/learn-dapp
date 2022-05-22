
pragma solidity >= 0.5.0;

contract RWD {
	string public name = 'Reward Token';
	string public symbol = 'RWD';
	uint256 public totalSupply = 1000000000000000000;
	uint8 public decimals = 18;

	event Transfer(
		address indexed _from,
		address indexed _to,
		uint value
	);

	event Approval(
		address indexed _owner,
		address indexed _spender,
		uint value
	);

	mapping(address => uint256) public balancesOf;

	mapping(address => mapping(address=>uint256)) public allowance;

	constructor() {
		balancesOf[msg.sender] = totalSupply;
	}

	function transfer(address _to, uint256 _value) public  returns (bool success){
		require(balancesOf[msg.sender] >= _value);

		balancesOf[msg.sender] -= _value;
		balancesOf[_to] += _value;
		emit Transfer(msg.sender, _to, _value);
		return true;
	}

	function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
		require(balancesOf[_from] >= _value);
		require(allowance[_from][msg.sender] >= _value);

		balancesOf[_to] += _value;
		balancesOf[_from] -= _value;

		// TODO: check if this is correct
		allowance[_from][msg.sender] -= _value;

		emit Transfer(_from, _to, _value);
		return true;
	}

	function approve(address _spender, uint256 _value) public returns (bool success) {
		allowance[msg.sender][_spender] = _value;
		emit Approval(msg.sender, _spender, _value);
		return true;
	}


}