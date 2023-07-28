'use client'
import { useEffect, useState } from 'react';
import { Address } from 'viem'
import TikToken from '@providers/tiktoken/contract'; // Import the TikToken object

const TikTokenInfo: React.FC = () => {
  const [info, setInfo] = useState<any | null>(null);
  const [userIDs, setUserIDs] = useState<string[]>([]);
  const [balance, setBalance] = useState<bigint>(0n);

  useEffect(() => {
    // Get contract info
    TikToken.getInfo().then((info) => {
      setInfo(info);
    });

    const accountToCheck: Address = '0xD4F0A30Ff0DbF42fC795A7D2d9076bb3764df76c'; // Replace with the desired address

    // Get user IDs
    TikToken.getUserIDs(accountToCheck).then((ids) => {
      setUserIDs(Array.from(ids));
    });

    // Get balance
    TikToken.balanceOf(accountToCheck).then((bal) => {
      setBalance(BigInt(bal));
    });
  }, []);

  return (
    <div>
      <h1>Contract Info</h1>
      <div>Name: {info?.name}</div>
      <div>Symbol: {info?.symbol}</div>
      <div>Decimals: {info?.decimals}</div>
      <div>Owner: {info?.owner}</div>
      <div>Total Supply: {info?.totalSupply.toString()}</div>
      <div>Remaining Supply: {info?.remainingSupply.toString()}</div>
      <div>Current Reward: {info?.currentReward.toString()}</div>
      <div>Halving Count: {info?.getHalvingCount.toString()}</div>
      <div>Next Halving: {info?.getNextHalving.toString()}</div>

      <h1>User Info</h1>
      <div>User IDs: {userIDs.join(', ')}</div>
      <div>Balance: {balance.toString()}</div>
    </div>
  );
};

export default TikTokenInfo