import Web3 from 'web3'
import { timelineAbi } from './abis.mjs'
import {contract} from './bytecode.mjs'
import net from 'net'

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:16792"),
{clientOptions: {maxReceivedFrameSize: 100000000, maxReceivedMessageSize: 100000000}});
web3.eth.personal.getAccounts().then(console.log)
web3.eth.personal.unlockAccount('0x295e29ef1635a5215230327193a646c4513685b1', 'zhengfei', 1000).then(console.log).catch(console.log)
var timelineContract = new web3.eth.Contract(timelineAbi, "0x25E91e83E0049671284bd188F408f2666e748b3E")
/*timelineContract.deploy({data: "0x" + contract.object}).send({
    from: '0x295e29ef1635a5215230327193a646c4513685b1',
    gas: 3400000,
    gasPrice: '30000000000000'
}).then(console.log).catch(console.log)*/
//console.log(timelineContract.options)

// fullhash=0xda2a21fec8e8f11f3eebefb20786a736d003e19930be8ee9a79962d14aaec3cb contract=0xfb4d64916562730aFcD189386aD078C966b5ED28
timelineContract.methods.SetName("zf").send({from:'0x295e29ef1635a5215230327193a646c4513685b1', gas: 3000000},function(error, txHash){console.log(txHash);})
timelineContract.methods.GetName("0x295e29ef1635a5215230327193a646c4513685b1").call({from:'0x295e29ef1635a5215230327193a646c4513685b1', gas: 3000000}).then(console.log).catch(console.log)
//web3.eth.getTransactionReceipt("0x3aa9aff90228ce1ee6a4626531afd6a047c80acd285b52578e9b6b166005e122").then(console.log).catch(console.log)
//console.log(timelineContract.methods.Hello)
