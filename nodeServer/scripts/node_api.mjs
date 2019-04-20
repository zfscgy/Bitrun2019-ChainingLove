import Web3 from 'web3'
import { timelineAbi } from './abis.mjs'


const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:16792"));
var timelineContract = new web3.eth.Contract(timelineAbi, "0x4283779892dA9a08c91E396B529C558dbC7b9a6C",
{
    defaultAccount: "0x9B02DDdCEda3834E899bB695229Eeb9e57c7D1e2",
})
console.log(timelineContract)
console.log(timelineContract.methods.SetName)
var call = timelineContract.methods.Hello().call().then(resp=>{console.log("ok");console.log(resp)}).catch(console.log)