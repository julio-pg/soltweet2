import { useWallet } from '@solana/wallet-adapter-react'

import PostCard from './PostCard'
import { useSoltweet2ProgramAccount } from './soltweet2-data-access'

export default function SolTweetUI() {
  const { createProfile } = useSoltweet2ProgramAccount()

  const { publicKey } = useWallet()

  function handleCreateProfile() {
    createProfile.mutateAsync({
      username: 'test',
      bio: 'test',
      avatar_cid: 'test',
    })
  }

  if (!publicKey) {
    return <p>Connect your wallet</p>
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <button className="btn" onClick={handleCreateProfile}>
        Create Profile
      </button>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  )
}
