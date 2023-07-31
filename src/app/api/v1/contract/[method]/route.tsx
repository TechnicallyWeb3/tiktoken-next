import TikToken from "@providers/tiktoken/contract"
import { Address } from "viem"

async function calculateCor(info:bigint) {
    return Number(info / await TikToken.currentReward())
}

async function calculateDec(info:bigint) {
    return Number(info) / (10 ** await TikToken.tokenDecimals())
}

function calculateStr(info:bigint) {
    return String(info)
}

async function calculateNot(info:bigint) {
    const dec = await calculateDec(info)
    return dec.toExponential()
}

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
            const format = searchParams.get('format')
            let value
            switch (format) {
                case 'cor' :
                    value = `${await calculateCor(info)} ${contractInfo?.symbol}cor`
                    break;
                case 'dec' :
                    value = `${await calculateDec(info)} ${contractInfo?.symbol}`
                    break;
                case 'str' :
                    value = `0.${calculateStr(info)} ${contractInfo?.symbol}`
                    break;
                case 'not' :
                    value = `${await calculateNot(info)} ${contractInfo?.symbol}`
                    break;
                case 'raw' :
                    value = info.toString()
                    break;
                default :
                    value = info.toString()
            }
            console.log(value)
            return new Response(JSON.stringify(value))
        } else {
            // default response of raw data
            return new Response(JSON.stringify(info?.toString()))
        }

    }

    if (params.method === 'hasMinted' || params.method === 'getUserAccount') {
        const hasId = searchParams.has('id')

        if (hasId) {
            const id = searchParams.get('id')
            // Check if 'id' is not null
            if (id) {
                return new Response(JSON.stringify(await TikToken?.[params.method](id)));
            } else {
                return "type error"
            }

        } else {
            return "id required"
        }
    }

    if (params.method === 'getAccountIDs' || params.method === 'balanceOf') {
        const hasId = searchParams.has('a')

        if (hasId) {
            let address = searchParams.get('a')
            // Check if 'id' is not null and is a non-empty string
            if (address) {
                address = address as Address
                const balance = await TikToken?.[params.method](address)
                return new Response(JSON.stringify(await calculateDec(balance)));
            } else {
                return "type error"
            }

        } else {
            return "id required"
        }
    }

    const hasAccount = searchParams.has('account')
    const hasOwner = searchParams.has('owner')
    const hasSpender = searchParams.has('spender')
    console.log(params)
    console.log(hasFormat)
    return new Response("Running method " + params.method + " with account " + hasAccount)
}
