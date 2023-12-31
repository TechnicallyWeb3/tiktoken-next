import { getContract, Address, Hash } from 'viem';
import { abi, address, client } from './abi';

const tiktokenAddress = address;
const tiktokenAbi = abi;
const tiktokenClient = client;
const contract = getContract({ address: tiktokenAddress, abi: tiktokenAbi, publicClient: tiktokenClient });

async function sendRawTransaction(sig: Hash) {
  const signedRequest = sig
  return await tiktokenClient.request({
    method: 'eth_sendRawTransaction',
    params: [signedRequest],
  })
}

const TikToken = {
  contract,
  address: tiktokenAddress,
  abi: tiktokenAbi,
  publicClient: tiktokenClient,

  async getInfo() {
    const [name, symbol, decimals, owner, totalSupply, remainingSupply, currentReward, getHalvingCount, getNextHalving, getUserCounter] = await Promise.all([
      contract.read.name(),
      contract.read.symbol(),
      contract.read.decimals(),
      contract.read.owner(),
      contract.read.totalSupply(),
      contract.read.remainingSupply(),
      contract.read.currentReward(),
      contract.read.getHalvingCount(),
      contract.read.getNextHalving(),
      contract.read.getUserCounter(),
    ]);

    return { name, symbol, decimals, owner, totalSupply, remainingSupply, currentReward, getHalvingCount, getNextHalving, getUserCounter };
  },

  async tokenName() {
    return await contract.read.name();
  },

  async tokenSymbol() {
    return await contract.read.symbol();
  },

  async tokenDecimals() {
    return await contract.read.decimals();
  },

  async contractOwner() {
    return await contract.read.owner();
  },

  async totalSupply() {
    return await contract.read.totalSupply();
  },

  async remainingSupply() {
    return await contract.read.remainingSupply();
  },

  async currentReward() {
    return await contract.read.currentReward();
  },

  async getHalvingCount() {
    return await contract.read.getHalvingCount();
  },

  async getNextHalving() {
    return await contract.read.getNextHalving();
  },

  async hasMinted(id: string) {
    return await contract.read.hasMinted([id]);
  },

  async getUserAccount(id: string) {
    return await contract.read.getUserAccount([id]);
  },

  async getUserIDs(account: Address) {
    return await contract.read.getUserIDs([account]);
  },

  async balanceOf(account: Address) {
    return await contract.read.balanceOf([account]);
  },

  async allowance(owner: Address, spender: Address) {
    return await contract.read.allowance([owner, spender]);
  },

  async transfer(sig: Hash) {
    return await sendRawTransaction(sig)
  },

  async transferFrom(sig: Hash) {
    return await sendRawTransaction(sig)
  },

  async approve(sig: Hash) {
    return await sendRawTransaction(sig)
  },

  async increaseAllowance(sig: Hash) {
    return await sendRawTransaction(sig)
  },

  async decreaseAllowance(sig: Hash) {
    return await sendRawTransaction(sig)
  },

  async batchMint(sig: Hash) {
    return await sendRawTransaction(sig)
  },

  async mint(sig: Hash) {
    return await sendRawTransaction(sig)
  },

  async updateAddress(sig: Hash) {
    return await sendRawTransaction(sig)
  },
};

export default TikToken;