import '../assets/globals.scss'
import { ClusterProvider } from '@/components/cluster/cluster-data-access'
import { SolanaProvider } from '@/components/solana/solana-provider'
import { UiLayout } from '@/components/ui/ui-layout'
import { ReactQueryProvider } from './react-query-provider'

export const metadata = {
  title: "Hypeszone Dapp",
  description:
    "Decentralized Messaging Connect. Collaborate. Engage — Wallet-to-Wallet, AI-Driven, and 100% Permissionless.",
  openGraph: {
    url: "https://app.hypes.zone/",
    type: "website",
    title: "Hypeszone Dapp",
    description:
      "Decentralized Messaging Connect. Collaborate. Engage — Wallet-to-Wallet, AI-Driven, and 100% Permissionless.",
    images: [
      {
        url: "https://app.hypes.zone/favicon.png",
        width: 1200,
        height: 630,
        alt: "Hypeszone Dapp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hypeszone Dapp",
    description:
      "Decentralized Messaging Connect. Collaborate. Engage — Wallet-to-Wallet, AI-Driven, and 100% Permissionless.",
    images: ["https://app.hypes.zone/favicon.png"],
  },
  other: {
    "itemProp:name": "Hypeszone Dapp",
    "itemProp:description":
      "Decentralized Messaging Connect. Collaborate. Engage — Wallet-to-Wallet, AI-Driven, and 100% Permissionless.",
    "itemProp:image": "https://app.hypes.zone/favicon.png",
  },
  icons: {
    icon: "/favicon.png",
  },
}

const links: { label: string; path: string }[] = [
  {label: 'Hypeszone Dapp', path: '/HypeszoneDapp'},
]

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
