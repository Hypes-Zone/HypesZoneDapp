// SPDX-License-Identifier: GPL-3.0-or-later

'use client'

import { getHypeszonedappProgram, getHypeszonedappProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useHypeszonedappProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getHypeszonedappProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getHypeszonedappProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['hypeszonedapp', 'all', { cluster }],
    queryFn: () => program.account.hypeszonedapp.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['hypeszonedapp', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ hypeszonedapp: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useHypeszonedappProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useHypeszonedappProgram()

  const accountQuery = useQuery({
    queryKey: ['hypeszonedapp', 'fetch', { cluster, account }],
    queryFn: () => program.account.hypeszonedapp.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['hypeszonedapp', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ hypeszonedapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['hypeszonedapp', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ hypeszonedapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['hypeszonedapp', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ hypeszonedapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['hypeszonedapp', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ hypeszonedapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
