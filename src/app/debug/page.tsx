import { PolygonInfo  } from "@providers/PolygonInfo"
import { TikToken } from "@providers/TikTokenInfo"
import TikTokenInfo from '@components/SmartContracts'
import { publicClient } from "@providers/ViemConfig"

const AppInfo = () => {
    const symbol = "TIK"//TikToken.tokenSymbol
  return (
    <div>
        <h1>App Info</h1>
        <h2>Supported Chains</h2>
        <PolygonInfo />
        <h2>Supported Contracts</h2>
        <TikTokenInfo />
        <h2>Wallet Info</h2>
    </div>
  )
}

export default AppInfo