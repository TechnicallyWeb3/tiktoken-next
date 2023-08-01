import { polygonClient } from "./ViemConfig"
import { Address } from 'viem'
import { abi } from "./tiktoken/abi"
export const tiktokenAbi = abi
export const tiktokenAddress = '0x359c3AD611e377e050621Fb3de1C2f4411684E92'

export const TikToken = () => {
    function asDecimal(value:BigInt, decimals:Number) {
        // const power = BigInt(10) ** BigInt(decimals)
    }

    async function tokenName() {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'name'
        })
        return data;
    }

    async function tokenSymbol() {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'symbol'
        })
        return data;
    }

    async function tokenDecimals() {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'decimals'
        })
        return data;
    }

    async function contractOwner() {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'owner'
        })
        return data;
    }

    async function totalSupply() {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'totalSupply'
        })
        return data;
    }

    // async function stringTotalSupply() {
    //     return String(getTotalSupply())
    // }

    async function remainingSupply() {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'remainingSupply'
        })
        return data;
    }

    async function currentReward() {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'currentReward'
        })
        return data;
    }

    async function getHalvingCount() {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'getHalvingCount'
        })
        return data;
    }

    async function getNextHalving() {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'getNextHalving'
        })
        return data;
    }

    async function getUserCounter() {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'getUserCounter'
        })
        return data;
    }

    async function hasMinted(id:string) {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'hasMinted',
            args: [id]
        })
        return data;
    }

    async function getUserAccount(id:string) {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'getUserAccount',
            args:[id]
        })
        return data;
    }

    async function getUserIDs(account:Address) {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'getUserIDs',
            args:[account]
        })
        return data;
    }

    async function balanceOf(account:Address) {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'balanceOf',
            args:[account]
        })
        return data;
    }

    async function allowance(owner:Address, spender:Address) {
        const data = await polygonClient.readContract({
            address: tiktokenAddress,
            abi: tiktokenAbi,
            functionName: 'allowance',
            args:[owner,spender]
        })
        return data;
    }
}

// export { tokenName, tokenSymbol, tokenDecimals, contractOwner, totalSupply, remainingSupply, currentReward, getHalvingCount, getNextHalving, getUserCounter, hasMinted, getUserAccount, getUserIDs, balanceOf, allowance }
