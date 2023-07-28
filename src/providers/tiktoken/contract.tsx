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
    try {
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
    } catch (error) {
      console.error('Error calling getInfo:', error);
      return null; // Handle the error gracefully or throw an exception as per your requirement
    }
  },

  async tokenName() {
    try {
      const data = await contract.read.name();
      return data;
    } catch (error) {
      console.error('Error calling tokenName:', error);
      return null; // Handle the error gracefully or throw an exception as per your requirement
    }
  },

  async tokenSymbol() {
    try {
      const data = await contract.read.symbol();
      return data;
    } catch (error) {
      console.error('Error calling tokenSymbol:', error);
      return null;
    }
  },

  async tokenDecimals() {
    try {
      const data = await contract.read.decimals();
      return data;
    } catch (error) {
      console.error('Error calling tokenDecimals:', error);
      return null;
    }
  },

  async contractOwner() {
    try {
      const data = await contract.read.owner();
      return data;
    } catch (error) {
      console.error('Error calling contractOwner:', error);
      return null;
    }
  },

  async totalSupply() {
    try {
      const data = await contract.read.totalSupply();
      return data;
    } catch (error) {
      console.error('Error calling totalSupply:', error);
      return null;
    }
  },

  async remainingSupply() {
    try {
      const data = await contract.read.remainingSupply();
      return data;
    } catch (error) {
      console.error('Error calling remainingSupply:', error);
      return null;
    }
  },

  async currentReward() {
    try {
      const data = await contract.read.currentReward();
      return data;
    } catch (error) {
      console.error('Error calling currentReward:', error);
      return null;
    }
  },

  async getHalvingCount() {
    try {
      const data = await contract.read.getHalvingCount();
      return data;
    } catch (error) {
      console.error('Error calling getHalvingCount:', error);
      return null;
    }
  },

  async getNextHalving() {
    try {
      const data = await contract.read.getNextHalving();
      return data;
    } catch (error) {
      console.error('Error calling getNextHalving:', error);
      return null;
    }
  },

  async hasMinted(id: string) {
    try {
      const data = await contract.read.hasMinted([id]);
      return data;
    } catch (error) {
      console.error('Error calling hasMinted:', error);
      return null;
    }
  },

  async getUserAccount(id: string) {
    try {
      const data = await contract.read.getUserAccount([id]);
      return data;
    } catch (error) {
      console.error('Error calling getUserAccount:', error);
      return null;
    }
  },

  async getUserIDs(account: Address) {
    try {
      const result = await contract.read.getUserIDs([account]);
      return result;
    } catch (error) {
      console.error('Error calling getUserIDs:', error);
      return [];
    }
  },

  async balanceOf(account: Address) {
    try {
      const result = await contract.read.balanceOf([account]);
      return result;
    } catch (error) {
      console.error('Error calling balanceOf:', error);
      return 0;
    }
  },

  async allowance(owner: Address, spender: Address) {
    try {
      const data = await contract.read.allowance([owner, spender]);
      return data;
    } catch (error) {
      console.error('Error calling allowance:', error);
      return null;
    }
  },
};

export default TikToken;
