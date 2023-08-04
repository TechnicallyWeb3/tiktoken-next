import { PolygonInfo  } from "@providers/PolygonInfo"
import TikTokenInfo from '@components/SmartContracts'
import Profile from "@components/Profile"
import { getTiktokData } from "@providers/web2"

const userData = await getTiktokData('mancinotech')

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
        <Profile size="dev" profile={userData} />
    </div>
  )
}

export default AppInfo