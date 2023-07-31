import { getContract, Address } from 'viem';
import { abi } from './abi';
import { publicClient } from '@providers/ViemConfig';

const tiktokenAddress = '0x359c3AD611e377e050621Fb3de1C2f4411684E92';
const tiktokenAbi = abi;
const contract = getContract({ address: tiktokenAddress, abi: tiktokenAbi, publicClient });

const TikToken = {
  contract,
  address: tiktokenAddress,
  abi: tiktokenAbi,
  publicClient,

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
};

export default TikToken;