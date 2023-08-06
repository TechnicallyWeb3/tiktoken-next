import { PolygonInfo } from "@providers/PolygonInfo";
import TikTokenInfo from '@components/SmartContracts';
import Profile from "@components/Profile";
import { getTiktokData } from "@providers/web2";

const userData = await getTiktokData('devilking6105');

const AppInfo = () => {
  const symbol = "TIK"; // TikToken.tokenSymbol
  return (
    <div className="container">
      <div className="card-container">
        <h1 className="section-title">App Info</h1>
        <div className="card">
          <h2 className="card-title">Supported Chains</h2>
          <PolygonInfo />
        </div>
        <div className="card">
          <h2 className="card-title">Supported Contracts</h2>
          <TikTokenInfo />
        </div>
        <div>
          <h2>Wallet Info</h2>
          <Profile size="dev" profile={userData} />
        </div>
      </div>
    </div>
  );
};

export default AppInfo;