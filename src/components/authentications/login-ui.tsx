'use client'

import { useMemo, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { getBase58Decoder, getBase64Decoder, getUtf8Encoder } from "@solana/codecs-strings";

import bs58 from "bs58";
import nacl from 'tweetnacl'
import { ChatUiApp } from "@/components/chatdapp/chat-ui";

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
    const mm = "Hello, World!";

    const encodedMessage = new TextEncoder().encode(mm);

    signMessage?.(encodedMessage).then((signedMessage) => {

      const signature = bs58.encode(signedMessage as Uint8Array);
      console.log("Signature:", signature);

      let pkey = new PublicKey(publicKey);
      const verifySignature = (signature: any, publicKey: any) => {
        try {
          // Convert inputs to correct format

          const verified = nacl
            .sign
            .detached
            .verify( new TextEncoder().encode(mm), bs58.decode(signature), bs58.decode(pkey.toBase58())
            )

          // Verify signature

          console.log("Signature valid:", verified);
          setWalletSignedIn(verified);
          return verified;
        } catch (error) {
          console.error("Error verifying signature:", error);
          return false;
        }
      };

      console.log("verifySignature(signature, publicKey));:", verifySignature(signature, publicKey));
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
