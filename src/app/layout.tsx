import '../assets/globals.scss'
import Head from 'next/head';
import {ClusterProvider} from '@/components/cluster/cluster-data-access'
import {SolanaProvider} from '@/components/solana/solana-provider'
import {UiLayout} from '@/components/ui/ui-layout'
import {ReactQueryProvider} from './react-query-provider'

export const metadata = {
  title: 'Hypeszone Dapp',
  description: 'Hypes.zone Dapp',
}

const links: { label: string; path: string }[] = [
  { label: 'Hypeszone Dapp', path: '/HypeszoneDapp' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <title>Hypeszone Dapp</title>
        <meta name="description" content="Decentralized Messaging Connect. Collaborate. Engage — Wallet-to-Wallet, AI-Driven, and 100% Permissionless." />

        <meta itemProp="name" content="Hypeszone Dapp" />
        <meta itemProp="description" content="Decentralized Messaging Connect. Collaborate. Engage — Wallet-to-Wallet, AI-Driven, and 100% Permissionless." />
        <meta itemProp="image" content="https://app.hypes.zone/favicon.png" />

        <meta property="og:url" content="https://app.hypes.zone/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hypeszone Dapp" />
        <meta property="og:description" content="Decentralized Messaging Connect. Collaborate. Engage — Wallet-to-Wallet, AI-Driven, and 100% Permissionless." />
        <meta property="og:image" content="https://app.hypes.zone/favicon.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypeszone Dapp" />
        <meta name="twitter:description" content="Decentralized Messaging Connect. Collaborate. Engage — Wallet-to-Wallet, AI-Driven, and 100% Permissionless." />
        <meta name="twitter:image" content="https://app.hypes.zone/favicon.png" />

        <link rel="icon" href="/favicon.png" />
      </Head>
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <UiLayout links={links}>{children}</UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
