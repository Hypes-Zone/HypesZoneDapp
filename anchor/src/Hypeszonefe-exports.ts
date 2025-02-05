// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import HypeszonefeIDL from '../target/idl/Hypeszonefe.json'
import type { Hypeszonefe } from '../target/types/Hypeszonefe'

// Re-export the generated IDL and type
export { Hypeszonefe, HypeszonefeIDL }

// The programId is imported from the program IDL.
export const HYPESZONEFE_PROGRAM_ID = new PublicKey(HypeszonefeIDL.address)

// This is a helper function to get the Hypeszonefe Anchor program.
export function getHypeszonefeProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...HypeszonefeIDL, address: address ? address.toBase58() : HypeszonefeIDL.address } as Hypeszonefe, provider)
}

// This is a helper function to get the program ID for the Hypeszonefe program depending on the cluster.
export function getHypeszonefeProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Hypeszonefe program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return HYPESZONEFE_PROGRAM_ID
  }
}
