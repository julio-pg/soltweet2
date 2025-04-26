import { useWallet } from '@solana/wallet-adapter-react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { WalletButton } from '../solana/solana-provider'
import { ellipsify } from '../ui/ui-layout'
import { useSoltweet2Program } from './soltweet2-data-access'
import SolTweetUI from './soltweet2-ui'

export default function Soltweet2Feature() {
  const { publicKey } = useWallet()
  const { programId } = useSoltweet2Program()

  return publicKey ? (
    <div>
      <p className="mb-6">
        <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
      </p>
      <SolTweetUI />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
