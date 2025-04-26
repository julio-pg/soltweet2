import { getSoltweet2Program, getSoltweet2ProgramId } from '@project/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Cluster, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'
import { web3 } from '@coral-xyz/anchor'

interface CreateProfileArgs {
  username: string
  bio: string
  avatar_cid: string
}

interface CreatePostArgs {
  content: string
}

export function useSoltweet2Program() {
  const { connection } = useConnection()
  const { cluster } = useCluster()

  const provider = useAnchorProvider()
  const programId = useMemo(() => getSoltweet2ProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getSoltweet2Program(provider, programId), [provider, programId])

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  return {
    program,
    programId,
    getProgramAccount,
  }
}

export function useSoltweet2ProgramAccount() {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program } = useSoltweet2Program()
  const { publicKey } = useWallet()

  const programId = useMemo(() => getSoltweet2ProgramId(cluster.network as Cluster), [cluster])
  const [profileAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from('profile', 'utf8'), publicKey!.toBuffer()],
    programId,
  )

  const [postAccount] = PublicKey.findProgramAddressSync([Buffer.from('post', 'utf8')], programId)

  const createProfile = useMutation<string, Error, CreateProfileArgs>({
    mutationKey: ['createProfile', { cluster }],
    mutationFn: ({ username, bio, avatar_cid }) =>
      program.methods
        .createProfile(username, bio, avatar_cid)
        .accounts({
          // @ts-ignore
          profile: profileAccount,
          user: publicKey!,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc(),

    onSuccess: (signature: string) => {
      transactionToast(signature)
    },
    onError: () => {
      toast.error('Failed to run program')
    },
  })

  const createPost = useMutation<string, Error, CreatePostArgs>({
    mutationKey: ['createPost', { cluster }],
    mutationFn: ({ content }) =>
      program.methods
        .createPost(content)
        .accounts({
          // @ts-ignore
          post: postAccount,
          user: publicKey!,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc(),
    onSuccess: (signature: string) => {
      transactionToast(signature)
    },
    onError: () => {
      toast.error('Failed to run program')
    },
  })

  return {
    createProfile,
    createPost,
  }
}
