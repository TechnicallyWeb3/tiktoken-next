import TikToken from "@providers/tiktoken/contract";

// Define an async function named GET that takes in a request object and a params object as its arguments.
export async function GET(request: Request, { params }: { params: { contract: string } }) {

    // Check if the contract name in the params object is 'tik' (case insensitive).
    if (params.contract.toLowerCase() != 'tik') {
        console.log(params); // Output the params object to the console for debugging purposes.
        return new Response("unknown contract"); // Return a response indicating that the contract is unknown.
    }

    // Retrieve information about the TikToken contract using the TikToken.getInfo() function.
    const contractInfo = await TikToken.getInfo();

    // Prepare a data object containing relevant contract information.
    const data = {
        name: contractInfo?.name,
        symbol: contractInfo?.symbol,
        decimals: contractInfo?.decimals,
        owner: contractInfo?.owner,
        totalSupply: contractInfo?.totalSupply.toString(),
        remainingSupply: contractInfo?.remainingSupply.toString(),
        currentReward: contractInfo?.currentReward.toString(),
        getHalvingCount: contractInfo?.getHalvingCount.toString(),
        getNextHalving: contractInfo?.getNextHalving.toString(),
        getUserCounter: contractInfo?.getUserCounter.toString(),
    };

    // Return a response containing the data object in JSON format.
    return new Response(JSON.stringify(data));
}
