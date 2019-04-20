var timelineAbi = 
[
	{
		"constant": false,
		"inputs": [
			{
				"name": "new_name",
				"type": "string"
			}
		],
		"name": "SetName",
		"outputs": [
			{
				"name": "status",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "lover_addr",
				"type": "address"
			}
		],
		"name": "ProposeLove",
		"outputs": [
			{
				"name": "status",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "partners",
				"type": "address[]"
			},
			{
				"name": "desc",
				"type": "string"
			}
		],
		"name": "ProposeActivity",
		"outputs": [
			{
				"name": "status",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "Hello",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "confirmation",
				"type": "uint256"
			}
		],
		"name": "ConfirmProposal",
		"outputs": [
			{
				"name": "status",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user_addr",
				"type": "address"
			}
		],
		"name": "GetName",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
export { timelineAbi }