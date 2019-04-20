var timelineAbi =
	[{ "constant": true, "inputs": [], "name": "GetMyStatus", "outputs": [{ "name": "", "type": "address[6]", "value": ["0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000"] }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "uint256", "value": "0" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x25a127a7" }, { "constant": true, "inputs": [], "name": "GetProfile", "outputs": [{ "name": "loverAndFriends", "type": "address[6]" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x25fac7ef" }, { "constant": true, "inputs": [{ "name": "addr", "type": "address" }, { "name": "start_index", "type": "uint256" }], "name": "GetTimeLine", "outputs": [{ "name": "addrs", "type": "address[5][10]" }, { "name": "types", "type": "bytes1[10]" }, { "name": "times", "type": "uint256[10]" }, { "name": "descs", "type": "string" }, { "name": "size", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x498206bb" }, { "constant": false, "inputs": [{ "name": "new_name", "type": "string" }], "name": "SetName", "outputs": [{ "name": "status", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x4df9dcd3" }, { "constant": false, "inputs": [{ "name": "lover_addr", "type": "address" }], "name": "ProposeLove", "outputs": [{ "name": "status", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x817791b2" }, { "constant": false, "inputs": [{ "name": "partners", "type": "address[]" }, { "name": "desc", "type": "string" }], "name": "ProposeActivity", "outputs": [{ "name": "status", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x893f3a6d" }, { "constant": true, "inputs": [], "name": "Hello", "outputs": [{ "name": "", "type": "string", "value": "hello world!" }], "payable": false, "stateMutability": "pure", "type": "function", "signature": "0xbcdfe0d5" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }, { "name": "confirmation", "type": "uint256" }], "name": "ConfirmProposal", "outputs": [{ "name": "status", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xbe95dd1b" }, { "constant": true, "inputs": [{ "name": "user_addr", "type": "address" }], "name": "GetName", "outputs": [{ "name": "name", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xd3a72ea1" }, { "constant": true, "inputs": [{ "name": "addr", "type": "address" }, { "name": "start_index", "type": "uint256" }], "name": "GetProposals", "outputs": [{ "name": "types", "type": "bytes1[10]" }, { "name": "partners", "type": "address[5][10]" }, { "name": "confirmations", "type": "bytes1[5][10]" }, { "name": "times", "type": "uint256[10]" }, { "name": "descs", "type": "string" }, { "name": "size", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf33a3435" }]
export { timelineAbi }