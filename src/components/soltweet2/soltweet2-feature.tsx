import { useWallet } from '@solana/wallet-adapter-react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { useSoltweet2Program } from './soltweet2-data-access'
import { Soltweet2Create, Soltweet2List } from './soltweet2-ui'

export default function Soltweet2Feature() {
  const { publicKey } = useWallet()
  const { programId } = useSoltweet2Program()

  return publicKey ? (
    <div>
      <AppHero
        title="Soltweet2"
        subtitle={
          'Create a new account by clicking the "Create" button. The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (increment, decrement, set, and close).'
        }
      >
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <Soltweet2Create />
      </AppHero>
      <Soltweet2List />
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
