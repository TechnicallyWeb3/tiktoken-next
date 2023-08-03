import { WalletData, getWalletData, getLinkedIds } from "@providers/web3"
import { Account, Address } from "viem"
export async function GET (request:Request) {
    const searchParams = new URLSearchParams(request.url.split('?')[1])
    const hasAccount = searchParams.has('account') || searchParams.has('a')
    if (hasAccount) {
        const account = searchParams.has('a') ? searchParams.get('a') : searchParams.get('account')
        if (account) {
            console.log(account)
            const walletData = await getWalletData(account as Address)
            console.log
            const linkedIds = await getLinkedIds(account as Address)
            return new Response (JSON.stringify({ walletData:walletData, linkedIds:linkedIds }))
        }
    }
    return new Response ('must include address')
}