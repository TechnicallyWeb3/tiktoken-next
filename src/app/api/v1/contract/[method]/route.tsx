import TikToken from "@providers/tiktoken/contract"

export async function GET (request:Request,{ params }: { params: { method: string } }) {
    if (params.method === 'name' || params.method === 'symbol' || params.method === 'decimals' || params.method === 'owner' || params.method === 'getHalvingCount' || params.method === 'getUserCounter') {
        const contractInfo = await TikToken.getInfo()
        let info = contractInfo?.[params.method]
        // if type is BigInt convert to number
        if (typeof info === 'bigint') {
            info = Number(info);
        }
        return new Response(JSON.stringify(info))
    }

    const url = request.url
    const urlParams = url.split('?')[1]
    const searchParams = new URLSearchParams(urlParams)
    const hasFormat = searchParams.has('format')
    if (params.method === 'totalSupply' || params.method === 'remainingSupply' || params.method === 'currentReward' || params.method === 'getNextHalving') {
        const contractInfo = await TikToken.getInfo()
        let info = contractInfo?.[params.method]
        if (hasFormat) {
            return
        } else {
            // default response of raw data
            return new Response(JSON.stringify(info?.toString()))
        }

    }

    const hasId = searchParams.has('id')
    const hasAccount = searchParams.has('account')
    const hasOwner = searchParams.has('owner')
    const hasSpender = searchParams.has('spender')
    console.log(params)
    console.log(hasFormat)
    return new Response("Running method " + params.method + " with account " + hasAccount)
}
