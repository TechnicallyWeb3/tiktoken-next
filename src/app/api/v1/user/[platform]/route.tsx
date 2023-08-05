import { getTiktokData, getUserData } from "@providers/web2"
import { getWalletData, getLinkedIds } from "@providers/web3"

export async function GET (request:Request, { params }: { params: { platform: string } }) {
    const platform = params.platform.toLowerCase()
    const searchParams = new URLSearchParams(request.url.split('?')[1])
    const user = searchParams.get('id') ? searchParams.get('id') : searchParams.get('h') ? searchParams.get('h') : searchParams.get('handle')
    const userData = user? await getUserData(platform, user) : 'handle or id required'
    const walletData = typeof userData != 'string' ? await getWalletData(userData.account) : 'no account data'
    const linkedIds = typeof userData != 'string' ? await getLinkedIds(userData.account) :'no linked ids'
    return new Response (JSON.stringify({ userData:userData, walletData:walletData, linkedIds:linkedIds }))
}
