import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Hypeszonefe} from '../target/types/Hypeszonefe'

describe('Hypeszonefe', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Hypeszonefe as Program<Hypeszonefe>

  const HypeszonefeKeypair = Keypair.generate()

  it('Initialize Hypeszonefe', async () => {
    await program.methods
      .initialize()
      .accounts({
        Hypeszonefe: HypeszonefeKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([HypeszonefeKeypair])
      .rpc()

    const currentCount = await program.account.Hypeszonefe.fetch(HypeszonefeKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Hypeszonefe', async () => {
    await program.methods.increment().accounts({ Hypeszonefe: HypeszonefeKeypair.publicKey }).rpc()

    const currentCount = await program.account.Hypeszonefe.fetch(HypeszonefeKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Hypeszonefe Again', async () => {
    await program.methods.increment().accounts({ Hypeszonefe: HypeszonefeKeypair.publicKey }).rpc()

    const currentCount = await program.account.Hypeszonefe.fetch(HypeszonefeKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Hypeszonefe', async () => {
    await program.methods.decrement().accounts({ Hypeszonefe: HypeszonefeKeypair.publicKey }).rpc()

    const currentCount = await program.account.Hypeszonefe.fetch(HypeszonefeKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set Hypeszonefe value', async () => {
    await program.methods.set(42).accounts({ Hypeszonefe: HypeszonefeKeypair.publicKey }).rpc()

    const currentCount = await program.account.Hypeszonefe.fetch(HypeszonefeKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the Hypeszonefe account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        Hypeszonefe: HypeszonefeKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.Hypeszonefe.fetchNullable(HypeszonefeKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
