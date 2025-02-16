import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { getHypesTokenBalance } from "@/components/wallet/services/balanceServices";

export const WalletBalance = () => {
  const {publicKey} = useWallet();
  const [hypesBalance, setHypesBalance] = useState("");

  if (!publicKey) {
    return (
      <></>
    )
  }

  getHypesTokenBalance(publicKey.toString()).then(balance => {
    console.log(`Total SPL Token Balance: ${balance}`);
    // Trim decimals
    if (balance) {
      let balanceResult = (Math.floor((balance) * 100) / 100).toFixed(2);
      setHypesBalance(balanceResult);
    }
  });


  return (
    <p>Balance: {hypesBalance} $HYPES</p>
  )
}
