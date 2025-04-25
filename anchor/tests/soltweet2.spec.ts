import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Soltweet2} from '../target/types/soltweet2'

describe('soltweet2', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Soltweet2 as Program<Soltweet2>

  const soltweet2Keypair = Keypair.generate()

  it('Initialize Soltweet2', async () => {
    await program.methods
      .initialize()
      .accounts({
        soltweet2: soltweet2Keypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([soltweet2Keypair])
      .rpc()

    const currentCount = await program.account.soltweet2.fetch(soltweet2Keypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Soltweet2', async () => {
    await program.methods.increment().accounts({ soltweet2: soltweet2Keypair.publicKey }).rpc()

    const currentCount = await program.account.soltweet2.fetch(soltweet2Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Soltweet2 Again', async () => {
    await program.methods.increment().accounts({ soltweet2: soltweet2Keypair.publicKey }).rpc()

    const currentCount = await program.account.soltweet2.fetch(soltweet2Keypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Soltweet2', async () => {
    await program.methods.decrement().accounts({ soltweet2: soltweet2Keypair.publicKey }).rpc()

    const currentCount = await program.account.soltweet2.fetch(soltweet2Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set soltweet2 value', async () => {
    await program.methods.set(42).accounts({ soltweet2: soltweet2Keypair.publicKey }).rpc()

    const currentCount = await program.account.soltweet2.fetch(soltweet2Keypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the soltweet2 account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        soltweet2: soltweet2Keypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.soltweet2.fetchNullable(soltweet2Keypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
