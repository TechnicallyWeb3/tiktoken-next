import TikToken from "@providers/tiktoken/contract"

export async function GET (request:Request) {

    const contractInfo = await TikToken.getInfo()
    const data = {
        name:contractInfo?.name,
        symbol:contractInfo?.symbol,
        decimals:contractInfo?.decimals,
        owner:contractInfo?.owner,
        totalSupply:contractInfo?.totalSupply.toString(),
        remainingSupply:contractInfo?.remainingSupply.toString(),
        currentReward:contractInfo?.currentReward.toString(),
        getHalvingCount:contractInfo?.getHalvingCount.toString(),
        getNextHalving:contractInfo?.getNextHalving.toString(),
        getUserCounter:contractInfo?.getUserCounter.toString(),
    }
    return new Response(JSON.stringify(data))
}
