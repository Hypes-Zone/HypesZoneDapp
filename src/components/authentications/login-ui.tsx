'use client'

import { useMemo } from "react";
import { PublicKey } from "@solana/web3.js";
import { useParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { getBase58Decoder, getBase64Decoder, getUtf8Encoder } from "@solana/codecs-strings";

import bs58 from "bs58";
import nacl from 'tweetnacl'

const links: { label: string; href: string }[] = [
  {label: 'Solana Docs', href: 'https://docs.solana.com/'},
  {label: 'Solana Faucet', href: 'https://faucet.solana.com/'},
  {label: 'Solana Cookbook', href: 'https://solanacookbook.com/'},
  {label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/'},
  {label: 'Solana Developers GitHub', href: 'https://github.com/solana-developers/'},
]

export default function LoginUi() {
  const {publicKey, signMessage, disconnect, connected} = useWallet();
  if (!publicKey) {
    return <div>Error loading account</div>
  }

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
        return verified;
      } catch (error) {
        console.error("Error verifying signature:", error);
        return false;
      }
    };

    console.log("verifySignature(signature, publicKey));:", verifySignature(signature, publicKey));
  });


  const address = publicKey;

  return (
    <div>
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="space-y-2">

          <div className="flex w-full items-center justify-center">
              <span
                className="absolute mx-auto flex border w-fit bg-gradient-to-r blur-xl from-pink-500 via-indigo-500 to-green-500 bg-clip-text text-6xl box-content font-extrabold text-transparent text-center select-none">
                <p>Hypes.zone</p>
              </span>
            <h1
              className="relative top-0 w-fit h-auto justify-center flex bg-gradient-to-r items-center from-pink-500 via-indigo-500 to-green-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto">
              <p>Hypes.zone</p>
            </h1>
          </div>


          <p>Here are some helpful links to get you started.
            {address.toString()}</p>
          {links.map((link, index) => (
            <div key={index}>
              <a href={link.href} className="link" target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
