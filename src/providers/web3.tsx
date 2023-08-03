import { Address, PublicClient } from "viem"
import TikToken from "./tiktoken/contract"
import { polygonClient } from "./ViemConfig"
import { FQID, UserData, getDefaultId, getTiktokData, isNum } from "./web2"

export class WalletData {
    account: Address = '0x0'
    balances: string[] = ['0']
    isRegistered: boolean = false
    defaultId?: UserData
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
    if (defaultFqid) {
        console.log(defaultFqid)
        const id = defaultFqid.split('@')[1]
        const balances = await getBalances(account)
        console.log(balances)
        const isRegistered = defaultFqid.length > 4
        if (isNum(id)) { // change to fqid check
            const defaultId: UserData = await getTiktokData(id)
            console.log(defaultId)
            const data: WalletData = {
                account: account,
                balances: balances,
                isRegistered: isRegistered,
                defaultId: defaultId,
            }

            return data
        }
    }
    return "fqid error"
}

export async function getLinkedIds(account: Address) {
    const ids = await TikToken.getUserIDs(account) //update to fqdn on switch
    const data: UserData[] = []
    for (let i = 0; i < ids.length; i++) {
        if (isNum(ids[i])) {
            const id = await getTiktokData(ids[i])
            data.push(id)
        }
    }
    return data
}