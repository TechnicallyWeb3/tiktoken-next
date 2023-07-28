import { getContract, Address } from 'viem';
import { abi } from './abi';
import { publicClient } from '@providers/ViemConfig';

const address = '0x359c3AD611e377e050621Fb3de1C2f4411684E92';
const contract = getContract({ address, abi, publicClient });

const TikToken = {
    contract,
    address,
    abi,
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
};

export default TikToken;
