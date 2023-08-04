import { Address, PublicClient } from "viem"
import TikToken from "./tiktoken/contract"
import { polygonClient } from "./ViemConfig"
import { FQID, UserData, getDefaultId, getTiktokData, isNum } from "./web2"

export interface WalletData {
    account: Address
    balances: string[]
    isRegistered: boolean
    defaultId?: UserData
}

export interface LinkedIDs {
    ids?: UserData[]
}

export async function getBalances(account: Address, publicClients?: PublicClient[], tokens?: string[]) {
    const balances = []
    if (publicClients) {
        // get balances from all chains requested instead (temporary)
        balances.push(String(await polygonClient.getBalance({ address: account })))
    } else {
        balances.push(String(await polygonClient.getBalance({ address: account })))
    }
    if (tokens) {
        // get balances of requested tokens instead (temporary)
        balances.push(String(await TikToken.balanceOf(account)))
    } else {
        balances.push(String(await TikToken.balanceOf(account)))
    }
    return balances
}
export async function getWalletData(account: Address) {
    const defaultFqid = await getDefaultId(account)
    const balances = await getBalances(account)
    let isRegistered = false
    const data: WalletData = {
        account: account,
        balances: balances,
        isRegistered: isRegistered,
    }
    if (defaultFqid.length > 2) {
        const id = defaultFqid.split('@')[1]
        data.isRegistered = defaultFqid.length > 4
        if (isNum(id)) { // change to fqid check
            const defaultId: UserData = await getTiktokData(id)
            console.log(defaultId)
            data.defaultId = defaultId
        }
    }
    return data
}

export async function getLinkedIds(account: Address) {
    const ids = await TikToken.getUserIDs(account) //update to fqdn on switch
    const data: LinkedIDs = {ids:[]}
    for (let i = 0; i < ids.length; i++) {
        if (isNum(ids[i])) { // needs to include fqid and platform selection
            const id = await getTiktokData(ids[i]) //should create a getUserData(platform, id)
            data.ids?.push(id)
        }
    }
    return data
}