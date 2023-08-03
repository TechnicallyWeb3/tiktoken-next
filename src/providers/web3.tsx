import { Address, PublicClient } from "viem"
import TikToken from "./tiktoken/contract"
import { polygonClient } from "./ViemConfig"
import { FQID, UserData, getDefaultId, getTiktokData } from "./web2"

export class WalletData {
    account: Address = '0x0'
    balances: string[] = ['0']
    isRegistered: boolean = false
    defaultId?: UserData
}

export class IdCluster {
    ids?: UserData[]
}

export async function getBalances(account:Address, publicClients?:PublicClient[], tokens?:string[]) {
    const balances = []
    if (publicClients) {
        // get balances from all chains requested
    } else {
        balances.push(String(await polygonClient.getBalance({ address:account })))
    }
    if (tokens) {
        // get balances of requested tokens
    } else {
        balances.push(String(await TikToken.balanceOf(account)))
    }
    return balances
}
export async function getWalletData(account: Address) {
    const defaultFqid = await getDefaultId(account)
    const balances = await getBalances(account)
    const isRegistered = defaultFqid.length > 4
    const defaultId : UserData = await getTiktokData(defaultFqid)
    const data : WalletData = {
        account: account,
        balances: balances,
        isRegistered: isRegistered,
        defaultId: defaultId,
    }
}

export async function getLinkedIds(address: Address) {
    return "Some ID Data"
}