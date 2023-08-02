import TikToken from "@providers/tiktoken/contract";
import { Address, Hash } from "viem";

// Set the default format for contract value representation.
const defaultFormat = 'dec';
// Initialize the 'contract' variable with TikToken class.
let contract = TikToken;

// Function to dynamically load the contract based on the provided contract name.
function loadContract(contractParam: string) {
    const contractName: string = contractParam.toLowerCase();
    if (contractName === 'tik') {
        return TikToken;
    } else {
        throw new Error("No such contract");
    }
}

// Function to convert a bigint value to different formats (cor, dec, str, not, raw).
async function getAsFormat(value: bigint, format: string) {
    const symbol = await contract.tokenSymbol();
    switch (format) {
        case 'cor': // Chunks of Reward
            return `${await calculateCor(value)} ${symbol}-cor`;
        case 'dec': // Decimal value
            return `${await calculateDec(value)} ${symbol}`;
        case 'str': // String for larger numbers
            return `0.${calculateStr(value)} ${symbol}`;
        case 'not': // Scientific Notation
            return `${await calculateNot(value)} ${symbol}`;
        case 'raw': // Chunks of Token (indivisible integer)
            return `${value} ${symbol}-cot`;
        default:
            return 'unknown format'; //value.toString()
    }
}

// Function to make a value compatible with React components (convert bigint to number if possible).
async function makeReactSafe(value: any, format?: string) {
    // Convert to react compatible format if value is a bigint.
    if (typeof value === 'bigint') {
        if (format) {
            return await getAsFormat(value, format);
        }
        // Returns a string if the BigInt is too big
        if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
            return String(value);
        }
        // Returns a number if possible.
        return Number(value);
    }
    // Passes through any react-safe values.
    return value;
}

// Function to calculate 'cor' or chunks of reward format value based on 'info' bigint value.
async function calculateCor(info: bigint) {
    return Number(info / await contract.currentReward());
}

// Function to calculate 'dec'or decimal format value based on 'info' bigint value.
async function calculateDec(info: bigint) {
    return Number(info) / (10 ** await contract.tokenDecimals());
}

// Function to convert bigint value to string format.
function calculateStr(info: bigint) {
    return String(info);
}

// Function to calculate 'not' format value based on 'info' bigint value.
async function calculateNot(info: bigint) {
    const dec = await calculateDec(info);
    return dec.toExponential();
}

// The main GET function handling requests with specific methods and contract name.
export async function GET(request: Request, { params }: { params: { method: string, contract: string } }) {
    if (params.contract.toLowerCase() != 'tik') {
        console.log(params);
        return new Response("unknown contract");
    }

    // Dynamically load the contract based on the provided contract name.
    contract = loadContract(params.contract);

    // Handle specific methods for retrieving contract information.
    if (params.method === 'name' || params.method === 'symbol' || params.method === 'decimals' || params.method === 'owner' || params.method === 'getHalvingCount' || params.method === 'getUserCounter') {
        const contractInfo = await contract.getInfo();
        let info = contractInfo?.[params.method];
        info = await makeReactSafe(info);
        return new Response(JSON.stringify(info));
    }

    // Handle specific methods that return values based on specific query parameters.
    const url = request.url;
    const urlParams = url.split('?')[1];
    const searchParams = new URLSearchParams(urlParams);
    const hasFormat = searchParams.has('format') || searchParams.has('f');

    if (params.method === 'totalSupply' || params.method === 'remainingSupply' || params.method === 'currentReward' || params.method === 'getNextHalving') {
        const contractInfo = await contract.getInfo();
        let info = contractInfo?.[params.method];
        let format = hasFormat ? searchParams.get('f') ? searchParams.get('f') : searchParams.get('format') : defaultFormat;
        let value = (format !== null) ? await getAsFormat(info, format) : await getAsFormat(info, defaultFormat);
        return new Response(JSON.stringify(value));
    }

    // Handle methods that require an 'id' parameter.
    if (params.method === 'hasMinted' || params.method === 'getUserAccount') {
        const hasId = searchParams.has('id');

        if (hasId) {
            const id = searchParams.get('id');
            // Check if 'id' is not null
            if (id) {
                return new Response(JSON.stringify(await contract?.[params.method](id)));
            } else {
                return "type error";
            }
        } else {
            return "id required";
        }
    }

    // Handle methods that require an 'account' parameter.
    if (params.method === 'getUserIDs' || params.method === 'balanceOf') {
        const hasAccount = searchParams.has('account') || searchParams.has('a');

        if (hasAccount) {
            const accountQuery = searchParams.has('a') ? searchParams.get('a') : searchParams.get('account');
            // Check if 'account' is not null
            if (accountQuery) {
                let address: Address = accountQuery as Address;
                let value: any = await contract?.[params.method](address);
                let format = hasFormat ? searchParams.get('f') ? searchParams.get('f') : searchParams.get('format') : defaultFormat;
                if (format == null) {
                    format = defaultFormat;
                }
                value = await makeReactSafe(value, format);
                return new Response(JSON.stringify(value));
            } else {
                return "type error";
            }
        } else {
            return "account required";
        }
    }

    // Handle methods that require both 'owner' and 'spender' parameters.
    if (params.method === 'allowance') {
        const hasOwner = searchParams.has('owner') || searchParams.has('o');
        const hasSpender = searchParams.has('spender') || searchParams.has('s');

        if (hasOwner && hasSpender) {
            const ownerQuery = searchParams.has('o') ? searchParams.get('o') : searchParams.get('owner');
            const spenderQuery = searchParams.has('s') ? searchParams.get('s') : searchParams.get('spender');
            if (ownerQuery && spenderQuery) {
                let owner: Address = ownerQuery as Address;
                let spender: Address = spenderQuery as Address;
                let value: any = await contract?.[params.method](owner, spender);
                let format = hasFormat ? searchParams.get('f') ? searchParams.get('f') : searchParams.get('format') : defaultFormat;

                if (format == null) {
                    format = defaultFormat;
                }
                value = await makeReactSafe(value, format);
                return new Response(JSON.stringify(value));
            } else {
                return "type error";
            }
        } else {
            return "owner and spender required";
        }
    }

    // Handle methods that require a 'signature' parameter.
    if (params.method === 'transfer' || params.method === 'transferFrom' || params.method === 'approve' || params.method === 'increaseAllowance' || params.method === 'decreaseAllowance' || params.method === 'batchMint' || params.method === 'mint' || params.method === 'updateAddress') {
        const hasSignature = searchParams.has('signature') || searchParams.has('s');
        if (hasSignature) {
            const signatureQuery = searchParams.has('s') ? searchParams.get('s') : searchParams.get('signature');
            if (signatureQuery) {
                const signature = signatureQuery as Hash;
                let value: Hash = await contract?.[params.method](signature);
                return new Response(JSON.stringify(value));
            }
        }
    }

    // If none of the valid methods are matched, return "unknown method".
    console.log(params);
    console.log(hasFormat);
    return "unknown method";
}
