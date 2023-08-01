import TikToken from "@providers/tiktoken/contract"
import { Address, Hash } from "viem"

const defaultFormat = 'dec'
let contract = TikToken

function loadContract(contractParam:string) {
    const contractName:string = contractParam.toLowerCase()
    if (contractName === 'tik') {
        return TikToken
    } else {
        throw new Error("No such contract")
    }
}

async function getAsFormat(value: bigint, format: string) {
    const symbol = await contract.tokenSymbol()
    switch (format) {
        case 'cor':
            return `${await calculateCor(value)} ${symbol}-cor`
        case 'dec':
            return `${await calculateDec(value)} ${symbol}`
        case 'str':
            return `0.${calculateStr(value)} ${symbol}`
        case 'not':
            return `${await calculateNot(value)} ${symbol}`
        case 'raw':
            return `${value} ${symbol}-cot`
        default:
            return 'unknown format' //value.toString()
    }
}

async function makeReactSafe(value: any, format: string) {
    // convert to react compatible format if value is bigint
    if (typeof value == 'bigint') {
        return await getAsFormat(value, format)
    }

    return value
}

async function calculateCor(info: bigint) {
    return Number(info / await contract.currentReward())
}

async function calculateDec(info: bigint) {
    return Number(info) / (10 ** await contract.tokenDecimals())
}

function calculateStr(info: bigint) {
    return String(info)
}

async function calculateNot(info: bigint) {
    const dec = await calculateDec(info)
    return dec.toExponential()
}

export async function GET(request: Request, { params }: { params: { method: string, contract: string } }) {
    if (params.contract.toLowerCase() != 'tik') {
        console.log(params)
        return new Response("unknown contract")
    }
    contract = loadContract(params.contract)
    if (params.method === 'name' || params.method === 'symbol' || params.method === 'decimals' || params.method === 'owner' || params.method === 'getHalvingCount' || params.method === 'getUserCounter') {
        const contractInfo = await contract.getInfo()
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
    const hasFormat = searchParams.has('format') || searchParams.has('f')

    if (params.method === 'totalSupply' || params.method === 'remainingSupply' || params.method === 'currentReward' || params.method === 'getNextHalving') {
        const contractInfo = await contract.getInfo()
        let info = contractInfo?.[params.method]
        let format = hasFormat ? searchParams.get('f') ? searchParams.get('f') : searchParams.get('format') : defaultFormat
        let value = (format !== null) ? await getAsFormat(info, format) : await getAsFormat(info, defaultFormat)
            return new Response(JSON.stringify(value))
    }

    if (params.method === 'hasMinted' || params.method === 'getUserAccount') {
        const hasId = searchParams.has('id')

        if (hasId) {
            const id = searchParams.get('id')
            // Check if 'id' is not null
            if (id) {
                return new Response(JSON.stringify(await contract?.[params.method](id)));
            } else {
                return "type error"
            }

        } else {
            return "id required"
        }
    }

    if (params.method === 'getUserIDs' || params.method === 'balanceOf') {
        const hasAccount = searchParams.has('account') || searchParams.has('a')

        if (hasAccount) {
            const accountQuery = searchParams.has('a') ? searchParams.get('a') : searchParams.get('account')
            // Check if 'account' is not null
            if (accountQuery) {
                let address: Address = accountQuery as Address
                let value: any = await contract?.[params.method](address)
                let format = hasFormat ? searchParams.get('f') ? searchParams.get('f') : searchParams.get('format') : defaultFormat
                if (format == null) {
                    format = defaultFormat
                }

                value = await makeReactSafe(value, format)
                return new Response(JSON.stringify(value));
            } else {
                return "type error"
            }

        } else {
            return "account required"
        }
    }

    if (params.method === 'allowance') {
        const hasOwner = searchParams.has('owner') || searchParams.has('o')
        const hasSpender = searchParams.has('spender') || searchParams.has('s')
        if (hasOwner && hasSpender) {
            const ownerQuery = searchParams.has('o') ? searchParams.get('o') : searchParams.get('owner')
            const spenderQuery = searchParams.has('s') ? searchParams.get('s') : searchParams.get('spender')
            if (ownerQuery && spenderQuery) {
                let owner: Address = ownerQuery as Address
                let spender: Address = spenderQuery as Address
                let value: any = await contract?.[params.method](owner, spender)
                let format = hasFormat ? searchParams.get('f') ? searchParams.get('f') : searchParams.get('format') : defaultFormat

                if (format == null) {
                    format = defaultFormat
                }
                value = await makeReactSafe(value, format)

                return new Response(JSON.stringify(value));
            } else {
                return "type error"
            }
        } else {
            return "owner and spender required"
        }

    }

    if (params.method === 'transfer' || params.method === 'transferFrom' || params.method === 'approve' || params.method === 'increaseAllowance' || params.method === 'decreaseAllowance' || params.method === 'batchMint' || params.method === 'mint' || params.method === 'updateAddress') {
        const hasSignature = searchParams.has('signature') || searchParams.has('s')
        if(hasSignature) {
            const signatureQuery = searchParams.has('s') ? searchParams.get('s') : searchParams.get('signature')
            if (signatureQuery) {
                const signature = signatureQuery as Hash
                let value: Hash = await contract?.[params.method](signature)
                return new Response(JSON.stringify(value))
            }
        }
    }


    console.log(params)
    console.log(hasFormat)
    return "unknown method"
}
