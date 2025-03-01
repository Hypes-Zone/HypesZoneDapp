'use client'

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import bs58 from "bs58";
import { ChatUiApp } from "@/components/chatdapp/chat-ui";
import { getCSRFMessage, getJWT, isJWTValid, setJWT, signIn } from "@/components/authentications/services/authServices";

const links: { label: string; href: string }[] = [
  {label: 'Solana Docs', href: 'https://docs.solana.com/'},
  {label: 'Solana Faucet', href: 'https://faucet.solana.com/'},
  {label: 'Solana Cookbook', href: 'https://solanacookbook.com/'},
  {label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/'},
  {label: 'Solana Developers GitHub', href: 'https://github.com/solana-developers/'},
]

export default function LoginUi() {
  const {publicKey, signMessage, disconnect, connected} = useWallet();

  const [walletSignedIn, setWalletSignedIn] = useState(false);

  useEffect(() => {
    const isSignedIn = () => {
      const jwt = getJWT();
      let result = !!(jwt && isJWTValid(jwt));
      setWalletSignedIn(result);
    }

    isSignedIn();
  }, []);

  if (!publicKey) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <p className="py-6">
              You really should connect your wallet first
            </p>
          </div>
        </div>
      </div>
    )
  }

  const onSignMessage = async () => {
    const message = await getCSRFMessage(publicKey);
    const encodedMessage = new TextEncoder().encode(message);

    signMessage?.(encodedMessage).then(async (signedMessage) => {

      const signature = bs58.encode(signedMessage as Uint8Array);

      const jwt = await signIn(publicKey, signature);
      if (jwt) {
        setJWT(jwt);
        setWalletSignedIn(true);
      } else {
        setWalletSignedIn(false);
      }
    });
  }

  if (!walletSignedIn) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <p className="py-6">
              You need to sign a message to continue.
              Why? Well, because you need to prove you own the wallet you say you own.
            </p>
            <button className="btn btn-primary" onClick={onSignMessage}>Sign in</button>
          </div>
        </div>
      </div>
    )
  }

  const address = publicKey;

  return (
    // <div className="hero bg-base-200 min-h-screen">
    //   <div className="hero-content text-center">
    //     <div className="max-w-md">
    //       <p className="py-6">
    //         Great success
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <>
    <ChatUiApp/>
    </>
  )
}
