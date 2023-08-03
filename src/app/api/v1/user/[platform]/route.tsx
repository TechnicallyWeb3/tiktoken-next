import { getTiktokData } from "@providers/web2"
import { getWalletData, getLinkedIds } from "@providers/web3"

export async function GET (request:Request, { params }: { params: { platform: string } }) {
    const searchParams = new URLSearchParams(request.url.split('?')[1])
    const hasHandle = searchParams.has('handle') || searchParams.has('h')
    const hasId = searchParams.has('id')
    const platform = params.platform.toLowerCase()
    switch (platform) {
        case 'dev' :
        case 'developer':
            if (hasHandle) {
                const user = searchParams.get('h') ? searchParams.get('h') : searchParams.get('handle')
                const isDev = user == 'mancinotech' || user == 'mancinotech'
                return new Response("Developer")
            }
        case 'tiktok' :
            if (hasHandle || hasId) {
                const user = hasHandle ? searchParams.has('h') ? searchParams.get('h'): searchParams.get('handle') : searchParams.get('id')
                if (user) {
                const userData =await getTiktokData(user)
                const walletData = await getWalletData(userData?.account)
                const linkedIds = await getLinkedIds(userData?.account)
                return new Response (JSON.stringify({ userData:userData, walletData:walletData, linkedIds:linkedIds }))
                } else {
                    return new Response (JSON.stringify("undefined user"))
                }
            } else {
                return new Response ("handle or id required for TikTok users")
            }
        default :
            return new Response("unsupported platform")
    }
}
