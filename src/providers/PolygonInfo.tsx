import { polygonClient } from "./ViemConfig"

async function bigintAsNumber(value:BigInt) {
    return Number(value);
}

async function bigintAsString(value:BigInt) {
    return String(value);
}

async function getPolygonBlockBigint() {
    const blockNumber = await polygonClient.getBlockNumber();
    return blockNumber;
}

async function getPolygonBlockString() {
    return String(await getPolygonBlockBigint());
}

async function getPolygonGasBigint() {
    const blockNumber = await polygonClient.getGasPrice();
    return blockNumber;
}

async function getPolygonGasNumber() {
    return Number(await getPolygonGasBigint());
}

export const PolygonInfo = () => {
    return (
        <div>
            <div>Polygon(POL)</div>
            <div>Block Number: {getPolygonBlockString()}</div>
            <div>Gas Estimate: {getPolygonGasNumber()}</div>
        </div>
    )
}
