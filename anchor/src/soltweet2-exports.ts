// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import Soltweet2IDL from '../target/idl/soltweet2.json'
import type { Soltweet2 } from '../target/types/soltweet2'

// Re-export the generated IDL and type
export { Soltweet2, Soltweet2IDL }

// The programId is imported from the program IDL.
export const SOLTWEET2_PROGRAM_ID = new PublicKey(Soltweet2IDL.address)

// This is a helper function to get the Soltweet2 Anchor program.
export function getSoltweet2Program(provider: AnchorProvider, address?: PublicKey) {
  return new Program(
    { ...Soltweet2IDL, address: address ? address.toBase58() : Soltweet2IDL.address } as Soltweet2,
    provider,
  )
}

// This is a helper function to get the program ID for the Soltweet2 program depending on the cluster.
export function getSoltweet2ProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Soltweet2 program on devnet and testnet.
      return new PublicKey('7nSiiBMoaNSv4VVTWT63JFVDs94TncY9RLcVZ2kRxgJR')
    case 'mainnet-beta':
    default:
      return SOLTWEET2_PROGRAM_ID
  }
}
